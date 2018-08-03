import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { CONFIG } from '../config';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class DatabaseService {

  constructor(private firebaseDB:AngularFireDatabase) {
    this.init();
  }

  init(){
    var usersDBObj:any =  this.firebaseDB.database.ref('users/');
    usersDBObj.on('value', snap=>{
      console.log(snap.val());
    });
    //console.log(this.firebaseDB);
    //console.log(this.firebaseDB.list('/list'));
    //console.log(this.firebaseDB.database.ref().child('object'));
    
    /*console.log(this.firebaseDB.app.database);
    console.log(this.firebaseDB.;
    var dbRefObject:any = this.firebaseDB.database.ref().child('object');
    console.log(dbRefObject);
    dbRefObject.on('value',(snap)=>{
      console.log(snap);
    });*/

    /*var userId = 'user4';
    var database = this.firebaseDB.database.ref('users/'+userId).set({
      name:"apple"
    });
    var userId = 'user4';
    var database = this.firebaseDB.database.ref('users/user4/name').set("apple1");

    
    usersDBObj.once('value').then(snap=>{
      console.log(snap.val());
    })*/
  }
  getDataByUID(uid:string):Observable<any>{
    let observable = new Observable((observer)=>{
      var database:any = this.firebaseDB.database.ref('users/'+uid);
      database.once('value').then(snap=>{
        var value:any = snap.val();
        //console.log(value);
        if(value===null || value===undefined){
          database.set({
            userDetail:{
              name:'',
              birthday:'',
              gender:'',
              imagePath:'',
              email:'',
              phone:''
            },
            contacts:'',
            messages:''
          },(res)=>{
            console.info('data saved successfully!...');
            observer.next(value);
          });
        }else{
          //console.log(value);
          observer.next(value);
        }
      }).catch((error)=>{
        observer.error(error);
      });
    });
    return observable;
  }
  setUserDetailsByUID(uid:string, userDetail:any):Observable<any>{
    let observable = new Observable((observer)=>{
      var database:any = this.firebaseDB.database.ref('users/'+uid+'/userDetail');
      database.set(userDetail, ()=>{
        observer.next(true);
      });
    });
    return observable;
  }
  setMesssagesByUID(uid:string, messages:any):Observable<any>{
    let observable = new Observable((observer)=>{
      /*var database:any = this.firebaseDB.database.ref('users/'+uid+'/messages');
      database.set(messages, ()=>{
        observer.next(true);
      });*/
      //var nextPathKey:any = this.firebaseDB.database.ref('users/'+uid+'/messages').push().key;
      var database:any = this.firebaseDB.database.ref('users/'+uid+'/messages/'+(messages.length-1));
      database.set(messages[messages.length-1], ()=>{
        observer.next(true);
      });
    });
    return observable;
  }
  getMesssagesByUID(uid:string):Observable<any>{
    let observable = new Observable((observer)=>{
      var database:any = this.firebaseDB.database.ref('users/'+uid+'/messages');
      database.once('value').then(res=>{
        observer.next(res);
      }).catch(error=>{
        observer.error(error);
      });
    });
    return observable;
  }

}
