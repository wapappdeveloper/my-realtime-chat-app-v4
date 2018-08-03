import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ChatService } from './chat.service';
import { InteractService } from './interact.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { CONFIG } from '../config';
import { DatabaseService } from './database.service';
import { DataPersistenceService } from './data-persistence.service';

@Injectable()

export class AuthnService {
  constructor(private dataPersistenceService:DataPersistenceService,private chatService:ChatService, private interactService:InteractService, private firebaseAuth:AngularFireAuth, private databaseService:DatabaseService) { }

  signin(obj:any):Observable<any>{
    this.chatService.init();
    let observable = new Observable(observer=>{
      /*if(obj.quickChat){
        this.chatService.sendNewUser(obj.username, (res)=>{
          observer.next(res);
        });
      }else{
        console.log(obj);
        console.info('High Level Chat is under progress, please use quick chat');
      }*/
      //console.log(obj.email, obj.pass, this.firebaseAuth);
      const promise = this.firebaseAuth.auth.signInWithEmailAndPassword(obj.email, obj.pass);
      promise.then((res)=>{
        var globalAppId:string = res.G || null;
        var userUniqueId:string = res.uid || null;
        var localGlobalAppId:string = CONFIG.firebase.apiKey;
        if(globalAppId === localGlobalAppId){
          this.databaseService.getDataByUID(userUniqueId).subscribe(res=>{
            //console.log(res);
            var nameOrId:string = '';
            var messages:any = [];
            if(res && res.name && res!==''){
              nameOrId = res.name;
            }else{
              nameOrId = this.splitNameFromMail(obj.email);
            }
            if(res && res.messages){
              messages = res.messages;
            }else{
              messages = [];
            }
            if(res && res.userDetail){
              this.interactService.data.userDetail = res.userDetail;
            }else{
              console.warn('user detail not updated');
            }
            this.chatService.sendNewUser(nameOrId, (res)=>{
              this.interactService.setData({username:nameOrId, chatArray:messages, userUID:userUniqueId});
              observer.next(res);
            });
          },error=>{
            console.error(error);
          });
        }else{
          console.error('APP ID is mismatch');
          observer.next(false);
        }
      });
      promise.catch((error)=>{
        console.error(error);
        observer.error(error);
      });

    });
    return observable;
  }

  signup(obj:any):Observable<any>{
    let observable = new Observable(observer=>{
      const promise = this.firebaseAuth.auth.createUserWithEmailAndPassword(obj.email, obj.pass);
      promise.then((res)=>{
        if(CONFIG.firebase.apiKey === res.G){
          var nameOrId:string = this.splitNameFromMail(obj.email);
          this.chatService.sendNewUser(nameOrId, (res)=>{
            this.interactService.setData({username:nameOrId});
            observer.next(res);
          });
        }else{
          console.error('APP ID is mismatch');
          observer.next(false);
        }
      });
      promise.catch((err)=>{
        //console.log(err);
        observer.error(err);
      });
    });
    return observable;
  }

  signout(){
    this.dataPersistenceService.destroyDataInLocalStorage(this.interactService.data.loginStorageID);
    this.interactService.resetData();
    this.chatService.close();
  }

  forgetPassword(email:string):Observable<any>{
    let observable = new Observable(observer=>{
      const promise = this.firebaseAuth.auth.sendPasswordResetEmail(email);
      promise.then((res)=>{

        console.log(res);
      });
      promise.catch((err)=>{
        //console.log(err);
        observer.error(err);
      });
    });
    return observable;
  }

  updateEmail(email:string):Observable<any>{
    let observable = new Observable(observer=>{
      const promise = this.firebaseAuth.auth.currentUser.updateEmail(email);
      promise.then((res)=>{

        console.log(res);
      });
      promise.catch((err)=>{
        //console.log(err);
        observer.error(err);
      });
    });
    return observable;
  }

  updatePassword(pass:string):Observable<any>{
    let observable = new Observable(observer=>{
      const promise = this.firebaseAuth.auth.currentUser.updatePassword(pass);
      promise.then((res)=>{

        console.log(res);
      });
      promise.catch((err)=>{
        //console.log(err);
        observer.error(err);
      });
    });
    return observable;
  }

  deleteAccount():Observable<any>{
    let observable = new Observable(observer=>{
      const promise = this.firebaseAuth.auth.currentUser.delete();
      promise.then((res)=>{

        console.log(res);
      });
      promise.catch((err)=>{
        //console.log(err);
        observer.error(err);
      });
    });
    return observable;
  }

  splitNameFromMail(mail:string){
    if(mail.indexOf('@')!==-1){
      var name:any = mail.split('@');
      if(name.length>0){
        return name[0];
      }else{
        console.error('error in split email');
        return null;
      }
    }else{
      return null;
    }
  }
}
