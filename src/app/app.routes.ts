import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { BookFormComponent } from './book-form/book-form.component';
import { ConfirmationComponent } from './confirmation/confirmation.component';
import { BookListComponent } from './book-list/book-list.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'form',
    component: BookFormComponent,
    canActivate: [authGuard],
  },
  {
    path: 'confirmation',
    component: ConfirmationComponent,
    canActivate: [authGuard],
  },
  {
    path: 'books',
    component: BookListComponent,
    canActivate: [authGuard],
  }
];
