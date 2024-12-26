import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component'; // Import DashboardComponent
import { AuthGuard } from './auth.guard';
import { RegisterUserComponent } from './register-user/register-user.component';
import { NewItemDialogComponent } from './new-item-dialog/new-item-dialog.component';
import { TestComponent } from './test/test.component';
import { UsersComponent } from './users/users.component';


export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'test', component: TestComponent },
  { path: 'register', component: RegisterUserComponent },
  { path: 'dashboard', component: DashboardComponent , canActivate: [AuthGuard]},
  { path: 'users', component: UsersComponent , canActivate: [AuthGuard]},
];
  