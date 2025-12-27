import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { CompanyListComponent } from './company-list/company-list.component';
import { CompanyFormComponent } from './company-form/company-form';
import { ConfirmationComponent } from './confirmation/confirmation.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  {
    path: 'form',
    component: CompanyFormComponent,
    canActivate: [authGuard]
  },
  {
    path: 'confirmation',
    component: ConfirmationComponent,
    canActivate: [authGuard]
  },
  {
    path: 'companies',
    component: CompanyListComponent,
    canActivate: [authGuard]
  }
];
