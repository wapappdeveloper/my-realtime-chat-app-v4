import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireStorage } from 'angularfire2/storage';
import { CONFIG } from '../config';
import { Observable } from 'rxjs/Observable';
import { FirebaseFirestore } from '@firebase/firestore-types';

@Injectable()
export class StorageService {

  constructor(private firebaseStorage: AngularFireStorage) { }

  uploadFileByUID(uid: string, file: any): Observable<any> {
    let observable = new Observable((observer) => {
      var fileName: string = file.name;
      var fileExtn: string = (file.name).substr(fileName.length - 4, 4);
      fileName = 'profile-picture';
      console.log(fileName, fileExtn);
      var storageRef: any = this.firebaseStorage.storage.ref(uid + '/' + fileName + fileExtn);
      var uploadTask: any = storageRef.put(file);
      uploadTask.on('state_changed', (res) => {
        observer.next(res);
      }, (err) => {
        observer.error(err);
      });
    });
    return observable;
  }

}
