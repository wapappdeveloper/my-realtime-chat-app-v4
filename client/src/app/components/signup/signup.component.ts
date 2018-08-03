import { Component, OnInit } from '@angular/core';
import { InteractService } from '../../services/interact.service';
import { CommonService } from '../../services/common.service';
import { Router } from '@angular/router';
import { AuthnService } from '../../services/authn.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  data:any;
  password:string;
  confirmPassword:string;
  constructor(private interactService:InteractService, private commonService:CommonService, private authnService:AuthnService) { }

  ngOnInit() {
    this.data = this.interactService.getData();
  }

  submit(){
    if ((this.data.email).trim() == '' || (this.password).trim() == '' || (this.confirmPassword).trim() == '') {
      alert('some fields are empty');
      return;
    }else if(!this.commonService.emailValidate(this.data.email)){
      alert('enter valid email');
      return;
    }else if(this.password.length<6){
      alert('Password should be at least 6 characters"');
      this.password = this.confirmPassword = '';
      return;
    }else if(this.password!==this.confirmPassword){
      alert('password does not match');
      this.password = this.confirmPassword = '';
      return;
    }
    console.log(this.data.email, this.password, this.confirmPassword);
    this.authnService.signup({email:this.data.email, pass:this.password}).subscribe((res)=>{
      this.interactService.setData({validUser:res, email:this.data.email, username:this.data.username});
      this.interactService.changeData({id:'login', data:true});
    }, (err)=>{
      console.log(err);
      if(err.code === 'auth/email-already-in-use'){
        alert(err.message);
        this.data.email = '';
        this.password = this.confirmPassword = '';
      }else{
        console.error('unknown error =', err);
      }
    });
  }

  navigateTo(page: string) {
    this.commonService.navigateTo(page);
  }
}
