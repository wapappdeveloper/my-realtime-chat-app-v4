import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class InteractService {
  data: any = {
    email:"",
    pass:"",
    userDetail:{
      profileName:'',
      birthday:'',
      gender:'',
      profilePictureUrl:'',
      phone:''
    },
    chatArray: [],
    loginSuccess: false,
    validUser: false,
    onlineUsers: [],
    chatSampleArray: this.getSampleData(),
    previousPage:'',
    currentPage:'',
    navPages:[],
    userUID:'',
    localStorageID:'chatAppLoginCredential'
  }
  

  constructor() { }

  getData() {
    return this.data;
  }

  resetData(){
    this.data.username = "",
    this.data.validUser = false;
  }

  setData(data: any) {
    console.log(data);
    for (var x in data) {
      this.data[x] = data[x];
    }
  }
  /**Communicate between componens */
  private dataSource = new BehaviorSubject<any>(null);
  currentData = this.dataSource.asObservable();
  changeData(data:any) {
    this.dataSource.next(data);
  }
  /**Communicate between componens */

  getSampleData() {
    var chatSampleArray: Array<object> = [
      {
        sender: "A",
        msg: "Hi",
        time: "00:00:00"
      },
      {
        sender: "A",
        msg: "dsfh;a fjahdsuifhaisdf ahsdofiusadf auhdsfipausdfhasdf aidsbfoiuyagsdfsdf",
        time: "00:00:00"
      },
      {
        sender: "A",
        msg: "lahlsdf ashdfipuhasdf jhaupisdf",
        time: "00:00:00"
      },
      {
        sender: "A",
        msg: "Hi",
        time: "00:00:00"
      },
      {
        sender: "A",
        msg: "dsfh;a fjahdsuifhaisdf ahsdofiusadf auhdsfipausdfhasdf aidsbfoiuyagsdfsdf",
        time: "00:00:00"
      },
      {
        sender: "A",
        msg: "lahlsdf ashdfipuhasdf jhaupisdf",
        time: "00:00:00"
      },
      {
        sender: "A",
        msg: "Hi",
        time: "00:00:00"
      },
      {
        sender: "A",
        msg: "dsfh;a fjahdsuifhaisdf ahsdofiusadf auhdsfipausdfhasdf aidsbfoiuyagsdfsdf",
        time: "00:00:00"
      },
      {
        sender: "A",
        msg: "lahlsdf ashdfipuhasdf jhaupisdf",
        time: "00:00:00"
      },
      {
        sender: "A",
        msg: "Hi",
        time: "00:00:00"
      },
      {
        sender: "A",
        msg: "dsfh;a fjahdsuifhaisdf ahsdofiusadf auhdsfipausdfhasdf aidsbfoiuyagsdfsdf",
        time: "00:00:00"
      },
      {
        sender: "A",
        msg: "lahlsdf ashdfipuhasdf jhaupisdf",
        time: "00:00:00"
      },
      {
        sender: "A",
        msg: "Hi",
        time: "00:00:00"
      },
      {
        sender: "A",
        msg: "dsfh;a fjahdsuifhaisdf ahsdofiusadf auhdsfipausdfhasdf aidsbfoiuyagsdfsdf",
        time: "00:00:00"
      },
      {
        sender: "A",
        msg: "lahlsdf ashdfipuhasdf jhaupisdf",
        time: "00:00:00"
      }
    ];
    return chatSampleArray;
  }
}
