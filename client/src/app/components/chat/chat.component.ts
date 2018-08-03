import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { InteractService } from '../../services/interact.service';
import { Router } from '@angular/router';
import { DatabaseService } from '../../services/database.service';
import { AuthnService } from '../../services/authn.service';
import { CommonService } from '../../services/common.service';


@Component({
    selector: 'app-chat',
    templateUrl: './chat.component.html',
    styleUrls: ['chat.component.css']
})
export class ChatComponent implements OnInit {
    @ViewChild('chatHolder') private chatHolder: ElementRef;

    data: any = {};

    chatArray: Array<object> = [];
    message: string = '';

    moveScroll: boolean = false;
    options: boolean = false;

    constructor(private commonService:CommonService, private authnService:AuthnService,private chatService: ChatService, private interactService: InteractService, private router: Router, private databaseService: DatabaseService) { }

    ngOnInit() {
        this.data = this.interactService.getData();
        if (!this.data.validUser) {
            this.router.navigateByUrl('signin');
            return;
        }
        this.chatArray = this.data.chatArray;
        this.interactService.currentData.subscribe((res) => {
            if (res !== null && res.id === 'newmessage' && res.data === true) {
                this.databaseService.setMesssagesByUID(this.data.userUID, this.chatArray).subscribe(res => {
                    console.info('new message updated successfully');
                });
                this.moveScroll = true;
            } else {
                console.warn('currentData is =>', res);
            }
        });
    }

    showOptions() {
        this.options = !this.options;
    }

    signOut() {
        this.options = !this.options;
        this.authnService.signout();
        this.commonService.navigateTo('signoff');
        this.chatService.close();
    }
    ngAfterViewInit(){
        if (this.chatHolder !== undefined) {
            this.chatHolder.nativeElement.scrollTop = this.chatHolder.nativeElement.scrollHeight;
        }
    }
    ngAfterViewChecked() {
        if (this.chatHolder !== undefined && this.moveScroll) {
            this.chatHolder.nativeElement.scrollTop = this.chatHolder.nativeElement.scrollHeight;
        }
        this.moveScroll = false;
    }

    submitMessage(message: string) {
        if (message.trim() === '') {
            alert('message field is empty');
            return;
        }
        this.chatService.sendNewMessage(message, this.data.username);
        this.message = '';
    }

    navigateTo(page: string) {
        if (page === 'profile') {
            this.interactService.setData({ profile_page_3: true });
        }
        this.router.navigateByUrl(page);
    }

    ngDestroy() {
        this.chatService.stopHeartBeat();
    }
}
