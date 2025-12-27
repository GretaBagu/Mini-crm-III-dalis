import { Routes } from '@angular/router';
import { CompanyFormComponent } from './company-form/company-form';
import { ConfirmationComponent } from './confirmation/confirmation.component';
import { CompanyListComponent } from './company-list/company-list.component';

export const routes: Routes = [
  { path: '', component: CompanyFormComponent },
  { path: 'confirmation', component: ConfirmationComponent },
  { path: 'companies', component: CompanyListComponent },
];
