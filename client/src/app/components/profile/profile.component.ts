import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InteractService } from '../../services/interact.service';
import { DatabaseService } from '../../services/database.service';
import { CommonService } from '../../services/common.service';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  page_1:boolean = false;
  page_2:boolean = false;
  page_3:boolean = false;
  page_4:boolean = false;

  data:any = {};
  password:string = '';
  confirmPassword:string = '';
  selectedFile:any = null;
  constructor(private storageService:StorageService,private commonService:CommonService,private dataBaseService:DatabaseService,private router:Router, private interactService:InteractService) { }

  ngOnInit() {
    this.data = this.interactService.getData();
    console.log(this.data.username);
    if(!this.data.validUser){
      this.router.navigateByUrl('signin');
      return;
    }
    /*if(this.data.quickChat){
      if(this.data.profile_page_3){
        this.data.profile_page_3 = false;
        this.page_1 = this.page_2 = this.page_4 = false;
        this.page_3 = true;
      }else if(this.data.profile_page_4){
        this.data.profile_page_4 = false;
        this.page_1 = this.page_2 = this.page_3 = false;
        this.page_4 = true;
      }else{
        this.page_1 = this.page_2 = this.page_4 = false;
        this.page_3 = true;
      }
      this.interactService.setData({profile_page_3:false, profile_page_4:false});
    }else{
      console.info('High level Chat is in progress');
    }*/
    if(this.data.profile_page_3){
      this.data.profile_page_3 = false;
      this.page_1 = this.page_2 = this.page_4 = false;
      this.page_3 = true;
    }else if(this.data.profile_page_4){
      this.data.profile_page_4 = false;
      this.page_1 = this.page_2 = this.page_3 = false;
      this.page_4 = true;
    }else{
      this.page_1 = this.page_2 = this.page_4 = false;
      this.page_3 = true;
    }
    this.interactService.setData({profile_page_3:false, profile_page_4:false});
  }

  onChange(event:any){
    //console.log(event);
    this.selectedFile = event.target.files[0];
    //console.log(this.selectedFile);
    this.storageService.uploadFileByUID(this.data.userUID, this.selectedFile).subscribe((res)=>{
      //console.log(res);
      this.data.userDetail['imagePath'] = res.downloadURL;
      console.log(this.data.userUID, this.data.userDetail);
      this.dataBaseService.setUserDetailsByUID(this.data.userUID, this.data.userDetail).subscribe((res)=>{
        //console.log(res);
        //this.commonService.navigateTo('chat');
      },(err)=>{
        console.log(err);
      });
    },(err)=>{
      console.error(err);
    });
  }
  saveStep1(){
    this.dataBaseService.setUserDetailsByUID(this.data.userUID, this.data.userDetail).subscribe((res)=>{
      this.page_1 = this.page_2 = this.page_4 = false;
      this.page_3 = true;
    },(err)=>{
      console.log(err);
    });
  }

  saveUserDetail(){
    console.log(this.data.userDetail);
    this.dataBaseService.setUserDetailsByUID(this.data.userUID, this.data.userDetail).subscribe((res)=>{
      console.log(res);
      this.commonService.navigateTo('chat');
    },(err)=>{
      console.log(err);
    });
  }
  
  movePage(pageNo:number){
    console.log(pageNo);
    switch(pageNo){
      case 1:this.page_2 = this.page_3 = false; this.page_1 = true; break;
      case 2:this.page_1 = this.page_3 = false; this.page_2 = true; break;
      case 3:this.page_1 = this.page_2 = false; this.page_3 = true; break;
      default : this.page_1 = true; break;
    }
  }

  navigateTo(page:string){
    this.router.navigateByUrl(page);
  }
}

