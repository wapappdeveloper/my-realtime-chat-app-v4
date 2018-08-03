import { Component, OnInit } from '@angular/core';
import { InteractService } from '../../services/interact.service';
import { CommonService } from '../../services/common.service';

@Component({
  selector: 'app-signoff',
  templateUrl: './signoff.component.html',
  styleUrls: ['./signoff.component.css']
})
export class SignOffComponent implements OnInit {
  data:any = {};
  constructor(private interactService:InteractService, private commonService:CommonService) { }

  ngOnInit() {
    this.data = this.interactService.getData();
    /*if(!this.data.validUser){
      this.commonService.navigateTo('signin');
      return;
    }*/
  }

  openInNewTab() {
    window.open("http://jpleoleo.webs.com/", "_blank");
  }

  navigateTo(page?: string) {
    if(page===null || page===undefined){
      this.data = this.interactService.getData();
      this.commonService.navigateTo(this.data.previousPage);
    }else{
      this.commonService.navigateTo(page);
    }
  }
}
