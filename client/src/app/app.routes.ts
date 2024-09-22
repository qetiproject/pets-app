import { Routes } from '@angular/router';

import { authGuard, guestGuard } from './core/guards';
import { HomeComponent, LoginComponent } from '@pages/index';
import { DefaultComponent, MasterComponent } from '@shared/layouts';
import { RegisterComponent } from './pages/register/register.component';
import { PetsComponent } from './pages/pets/pets.component';

export const routes: Routes = [
  {
    path: '',
    component: DefaultComponent,
    canActivate: [guestGuard],
    children: [
      { path: '', component: LoginComponent },
      { path: 'register', component: RegisterComponent }
    ],
  },
  {
    path: '',
    component: MasterComponent,
    canActivate: [authGuard],
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'pets', component: PetsComponent }
    ],
  },
];
