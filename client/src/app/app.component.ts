import { Component, ViewChild, ElementRef } from '@angular/core';
import { ChatService } from './services/chat.service';
import { InteractService } from './services/interact.service';
import { Router } from '@angular/router';
import { CommonService } from './services/common.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: []
})
export class AppComponent {
  @ViewChild('messageToneVideo') private messageToneVideo:ElementRef;
  @ViewChild('chatIntroToneVideo') private chatIntroToneVideo:ElementRef;
  title = 'app';
  data:any = {};
  constructor(private commonService:CommonService,private chatService:ChatService, private interactService:InteractService, private router:Router){}

  ngOnInit(){
    this.commonService.preloadAssets('assets/data/assets.json');
    this.data = this.interactService.data;
    this.interactService.currentData.subscribe((res)=>{
      if(res!==null && res!==undefined){
        (res.id==='login' && res.data===true)?this.emitter({res:res.data}):'';
      }else{
        console.warn('currentData is =>', res);
      }
    });
    /*this.chatService.init();
    this.chatService.getAllUsers().subscribe((res) => {
      this.interactService.setData({onlineUsers:res});
    });
    this.chatService.getMessage().subscribe(res => {
        var chatArray:any = this.interactService.getData().chatArray;
        chatArray.push(res);
        this.interactService.setData({chatArray:chatArray});
        this.interactService.changeData({id:'newmessage', data:true});
        this.messageToneVideo.nativeElement.play();
    });
    this.chatService.getHeartBeat().subscribe(res => {
        //console.clear();
        //console.log(res);
    });
    this.router.navigateByUrl('signin');
    this.chatIntroToneVideo.nativeElement.play();*/
  }

  emitter(obj:any){
    if(obj.res){
      if(this.data.quickChat){
        this.interactService.setData({profile_page_4:true});
      }
      this.router.navigateByUrl('profile');
    }else{
      console.error('invalid result =', obj);
    }
  }
}
