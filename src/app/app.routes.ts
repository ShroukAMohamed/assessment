import { Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { authGuard } from './guards/auth.guard';


export const routes: Routes = [
  {path:'',redirectTo:'home', pathMatch:'full'},
  {path:'home',canActivate:[authGuard],component:LandingPageComponent},
  {path : '**' , redirectTo : 'home'},
];
