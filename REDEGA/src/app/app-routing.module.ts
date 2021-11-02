import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { AdminComponent } from './pages/admin/admin.component';
/* Rutas Protegidas por Firebase */
import { AngularFireAuthGuard,redirectLoggedInTo,redirectUnauthorizedTo } from '@angular/fire/compat/auth-guard';
//import { AngularFireAuthGuard, hasCustomClaim,redirectLoggedInTo } from '@angular/fire/compat/auth-guard';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);
const redirectLoggedInToHome = () => redirectLoggedInTo(['home']);

export const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'login', component: LoginComponent, canActivate: [AngularFireAuthGuard],data: { authGuardPipe: redirectLoggedInToHome }},
  {path: 'Not-Found', component: NotFoundComponent},
  {path: 'home', component: HomeComponent, canActivate: [AngularFireAuthGuard],data: { authGuardPipe: redirectUnauthorizedToLogin }},
  {path: 'admin', component: AdminComponent, canActivate: [AngularFireAuthGuard],data: { authGuardPipe: redirectUnauthorizedToLogin }},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
