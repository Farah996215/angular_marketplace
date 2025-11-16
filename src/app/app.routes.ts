import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { SigninComponent } from './features/auth/signin/signin.component';
import { SignupComponent } from './features/auth/signup/signup.component';
import { ForgotPasswordComponent } from './features/auth/forgot-password/forgot-password.component';
import { AuthGuard } from './core/guards/auth.guard';
import { RoleGuard } from './core/guards/role.guard';

export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'home', component: HomeComponent},
    {path: 'signup', component: SignupComponent },
    {path: 'signin', component: SigninComponent },
    {path: 'forgot-password', component: ForgotPasswordComponent },
    {path: '**', redirectTo: ''}
];
