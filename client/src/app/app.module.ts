import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ROUTING } from './app.routing';

import { AppComponent } from './app.component';
import { ChatComponent } from './components/chat/chat.component';
import { SigninComponent } from "./components/signin/signin.component";
import { ProfileComponent } from './components/profile/profile.component';
import { InfoComponent } from './components/info/info.component';
import { SignupComponent } from "./components/signup/signup.component";
import { SignOffComponent } from './components/signoff/signoff.component';

import { ChatService } from './services/chat.service';
import { AuthnService } from './services/authn.service';
import { InteractService } from './services/interact.service';
import { CommonService } from './services/common.service';
import { DatabaseService } from './services/database.service';
import { DataPersistenceService } from './services/data-persistence.service';
import { StorageService } from './services/storage.service';
import { PageAuthorizationGuard } from './page-authorization.guard';

import { CONFIG } from './config';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { HttpClientModule } from '@angular/common/http';
import { AngularFireStorageModule } from 'angularfire2/storage';

@NgModule({
  declarations: [
    AppComponent,
    ChatComponent,
    SigninComponent,
    ProfileComponent,
    InfoComponent,
    SignupComponent,
    SignOffComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ROUTING,
    HttpClientModule,
    AngularFireModule.initializeApp(CONFIG.firebase),
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    AngularFireAuthModule
  ],
  providers: [ChatService, AuthnService, InteractService, CommonService, DatabaseService, DataPersistenceService, PageAuthorizationGuard, StorageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
