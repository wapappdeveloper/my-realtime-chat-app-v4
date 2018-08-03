import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ChatService {
  chatLocalId:string = 'MINICHATAPP';
  refreshCount:number = 0;
  chatClientCount:number = 0;
  socket:any = null;
  chatServerLocal:string = 'http://localhost:3000';
  chatServerOnline:string = 'https://morning-castle-52037.herokuapp.com';
  host:string = window.location.href;
  timer:any = null;
  constructor() { }

  init(){
    if(this.host.indexOf('localhost')!==-1){
      this.socket = io.connect(this.chatServerLocal);
    }else if(this.host.indexOf('damp-dawn')!==-1){
      this.socket = io.connect(this.chatServerOnline);
    }else{
      console.info('New Host Found =>', this.host);
      this.socket = io.connect();
    }
    this.startHeartBeat();
  }

  close(){
    this.socket.disconnect('unauthorized');
    //this.socket.close();
  }

  checkUserStatus(){
    if(window && window.sessionStorage!==undefined){
      if(localStorage.getItem(this.chatLocalId)){
        console.log(localStorage.getItem(this.chatLocalId));
        this.refreshCount = Number(localStorage.getItem(this.chatLocalId));
        sessionStorage.setItem(this.chatLocalId, String(this.refreshCount));
        localStorage.removeItem(this.chatLocalId);
      }else{
        if(sessionStorage.getItem(this.chatLocalId)){
          this.refreshCount++;
          sessionStorage.setItem(this.chatLocalId, String(this.refreshCount));
        }else{
          sessionStorage.setItem(this.chatLocalId, String(this.refreshCount));
        }
      }
      //console.log(sessionStorage.getItem(this.chatLocalId));
      //alert(sessionStorage.getItem(this.chatLocalId));
    }else{
      console.error('webstorage is not support in this browser');
    }
    /*window.addEventListener('beforeunload', ()=>{
      //this.refreshCount++;
      //localStorage.setItem(this.chatLocalId, String(this.refreshCount));
    });
    window.addEventListener('unload', ()=>{
      //this.refreshCount++;
      //localStorage.setItem(this.chatLocalId, String(this.refreshCount));
    });*/
  }
  
  generateUniqueId() {
    function s4(){
      return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    }
    return s4() + '-' + s4() + '-' + s4() + '-' + s4();
  }

  sendNewUser(username:string, callback:Function){
    var userData:object = {
      name:username,
      uuid:this.generateUniqueId()
    }
    this.socket.emit('new user', userData, callback);
  }

  sendNewMessage(message:string, username:string){
    this.socket.emit('send message', message, username);
  }

  getAllUsers():Observable<any>{
    let observable = new Observable(observer=>{
      this.socket.on('get users',(res)=>{
        observer.next(res);
      })
    });
    return observable;
  }

  getMessage():Observable<any>{
    let observable = new Observable((observer)=>{
      this.socket.on('new message',(res)=>{
        observer.next(res);
      });
    });
    return observable;
  }

  getHeartBeat():Observable<any>{
    let observable = new Observable((observer)=>{
      this.socket.on('server heart beat', (res)=>{
        observer.next(res);
      });
    });
    return observable;
  }

  startHeartBeat(){
    var pulse = 0;
    this.timer = setInterval(()=>{
      pulse++;
      this.socket.emit('client heart beat', pulse);
    },5000);
  }

  stopHeartBeat(){
    clearInterval(this.timer);
  }
}
