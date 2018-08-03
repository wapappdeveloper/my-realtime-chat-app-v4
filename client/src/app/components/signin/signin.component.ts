import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthnService } from '../../services/authn.service';
import { Router } from '@angular/router';
import { InteractService } from '../../services/interact.service';
import { ChatService } from '../../services/chat.service';
import { CommonService } from '../../services/common.service';
import { DataPersistenceService } from '../../services/data-persistence.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  data:any = {};
  loading:boolean = false;
  private password:string = '';
  constructor(private dataPersistenceService:DataPersistenceService, private commonService:CommonService, private chatService: ChatService, private authnService: AuthnService, private router: Router, private interactService: InteractService) { }

  ngOnInit() {
    this.data = this.interactService.data;
    console.log(this.data);
    /*if(this.data.validUser){
      this.router.navigateByUrl('chat');
      return;
    }else{
      var data:any = this.dataPersistenceService.retriveDataInLocalStorage(this.interactService.data.loginStorageID);
      var password:string = '';
      console.log(data);
      if(data!==null){
        data = JSON.parse(data);
        for(var x in data){
          if(String(x)==='password'){
            password = data[x];
          }else{
            this.data[x] = data[x];
          }
        }
        this.signIn(this.data.email, password, false);
      }else{
        console.info('signin');
      }
    }*/
  }

  submit() {
    if ((this.data.email).trim() == '' || (this.password).trim() == '') {
      alert('some fields are empty');
      return;
    }else if(!this.commonService.emailValidate(this.data.email)){
      alert('enter valid email');
      return;
    }
    this.signIn(this.data.email, this.password, true);
  }

  signIn(email:string, password:string, allowAlert?:boolean){
    this.loading = true;
    this.authnService.signin({email:email, pass:password}).subscribe((res) => {
      this.loading = false;
      if (res) {
        this.interactService.setData({validUser:res, email:email, username:this.data.username});
        this.dataPersistenceService.storeDataInLocalStorage(this.interactService.data.loginStorageID, {username:this.data.username, email:email, password:password});
        this.interactService.changeData({id:'login', data:true});
      } else {
        this.password = '';
        this.data.email = '';
        this.interactService.setData({email:this.data.email, username:''});
        (allowAlert)?console.error('account already exist, please sign up with new email'):'';
        (allowAlert)?alert('account already exist, please sign up with new email'):'';
      }
    },(err)=>{
      this.loading = false;
      console.error(err, err.code);
      if(err.code === 'auth/user-not-found'){
        console.error(err.message);
        alert(err.message);
      }else if(err.code === 'auth/wrong-password'){
        console.error(err.message);
        alert(err.message);
        this.password = '';
      }else{
        console.error(err);
      }
    });
  }

  navigateTo(page: string) {
    this.commonService.navigateTo(page);
  }
}
