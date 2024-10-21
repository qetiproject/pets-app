import { Routes } from '@angular/router';

import { DefaultComponent, MasterComponent } from '@shared/layouts';
import { LoginComponent, RegisterComponent } from './pages/auth-module';
import { PetsComponent } from './pages/pets-module';
import { UpdatePetFormComponent } from './pages/pets-module/components';
import { OwnersComponent } from './pages/owners-module';
import { HomeComponent } from './pages/home/home.component';
import { AuthGuard, GuestGuard } from './core/guards';


export const routes: Routes = [
    {
        path: '',
        component: DefaultComponent,
        canActivate: [GuestGuard],
        children: [
          { path: '', component: LoginComponent },
          { path: 'register', component: RegisterComponent }
        ],
      },
      {
        path: '',
        component: MasterComponent,
        canActivate: [AuthGuard],
        children: [
          { path: 'home', component: HomeComponent },
          { path: 'pets', component: PetsComponent },
          { path: 'update-pet/:id', component: UpdatePetFormComponent},
          { path: "owners", component: OwnersComponent}
        ],
      },
      {
        path: '**',
        redirectTo: ''
      }
];
