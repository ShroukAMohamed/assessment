import { Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { authGuard } from './guards/auth.guard';
import { LoginComponent } from './login/login.component';
import { signedGuard } from './guards/signed.guard';

export const routes: Routes = [
  {path:'',redirectTo:'home', pathMatch:'full'},
  {path:'home',canActivate:[authGuard],component:LandingPageComponent},
  {path:'login',canActivate:[signedGuard],component:LoginComponent},
  {path : '**' , redirectTo : 'home'},
];
