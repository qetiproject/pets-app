import { Routes } from '@angular/router';

import { authGuard, guestGuard } from './core/guards';
import { HomeComponent, LoginComponent } from '@pages/index';
import { DefaultComponent, MasterComponent } from '@shared/layouts';

export const routes: Routes = [
  {
    path: '',
    component: DefaultComponent,
    canActivate: [guestGuard],
    children: [{ path: '', component: LoginComponent }],
  },
  {
    path: '',
    component: MasterComponent,
    canActivate: [authGuard],
    children: [{ path: 'home', component: HomeComponent }],
  },
];
