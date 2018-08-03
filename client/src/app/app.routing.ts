import { Routes, RouterModule } from "@angular/router";
import { SigninComponent } from "./components/signin/signin.component";
import { ChatComponent } from "./components/chat/chat.component";
import { ProfileComponent } from "./components/profile/profile.component";
import { InfoComponent } from "./components/info/info.component";
import { SignupComponent } from "./components/signup/signup.component";
import { SignOffComponent } from "./components/signoff/signoff.component";
import { PageAuthorizationGuard } from "./page-authorization.guard";

const APP_ROUTES:Routes = [
    {path:"", redirectTo:"/signin", pathMatch:'full'},
    {path:"signin", component:SigninComponent},
    {path:"signup", component:SignupComponent},
    {path:"signoff", component:SignOffComponent},
    {path:"profile", component:ProfileComponent, canActivate:[PageAuthorizationGuard]},
    {path:"chat", component:ChatComponent, canActivate:[PageAuthorizationGuard]},
    {path:"info", component:InfoComponent, canActivate:[PageAuthorizationGuard]}
];

export const ROUTING = RouterModule.forRoot(APP_ROUTES);
