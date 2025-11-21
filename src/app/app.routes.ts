import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { SigninComponent } from './features/auth/signin/signin.component';
import { SignupComponent } from './features/auth/signup/signup.component';
import { ForgotPasswordComponent } from './features/auth/forgot-password/forgot-password.component';
import { DashboardComponent } from './features/customer/dashboard/dashboard.component';
import { ProfileComponent } from './features/customer/profile/profile.component';
import { FavoritesComponent } from './features/customer/favorites/favorites.component';
import { PurchasesComponent } from './features/customer/purchases/purchases.component';
import { SettingsComponent } from './features/customer/settings/settings.component';
import { AuthGuard } from './core/guards/auth.guard';
import { CarListComponent } from './features/cars/car-list/car-list.component';
import { AdminDashboardComponent } from './features/admin/admin-dashboard/admin-dashboard.component';
import { UserManagementComponent } from './features/admin/user-management/user-management.component';
import { CarManagementComponent } from './features/admin/car-management/car-management.component';
import { AnalyticsComponent } from './features/admin/analytics/analytics.component';


export const routes: Routes = [
    {path: '',component: HomeComponent},
    {path: 'home',component: HomeComponent},
    {path: 'signup',component: SignupComponent},
    {path: 'signin',component: SigninComponent},
    {path: 'forgot-password',component: ForgotPasswordComponent },
    {path: 'customer/dashboard',component: DashboardComponent,canActivate: [AuthGuard]},
    {path: 'customer/profile',component: ProfileComponent,canActivate: [AuthGuard]},
    {path: 'customer/favorites',component: FavoritesComponent,canActivate: [AuthGuard]},
    {path: 'customer/purchases',component: PurchasesComponent,canActivate: [AuthGuard]},
    {path: 'customer/settings',component: SettingsComponent,canActivate: [AuthGuard]},
    {path: 'cars',component: CarListComponent},
    {path: 'admin',component: AdminDashboardComponent,canActivate: [AuthGuard]},
    {path: 'admin/users',component: UserManagementComponent,canActivate: [AuthGuard]},
    {path: 'admin/cars',component: CarManagementComponent,canActivate: [AuthGuard]},
    {path: 'admin/analytics',component: AnalyticsComponent,canActivate: [AuthGuard]},
    {path: 'admin/settings',component: SettingsComponent,canActivate: [AuthGuard]},
    {path: '**', redirectTo: ''}
];
