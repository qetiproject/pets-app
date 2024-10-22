import { Routes } from '@angular/router';

import { DefaultComponent, MasterComponent } from '@shared/layouts';
import { LoginComponent, RegisterComponent } from './pages/auth-module';
import { PetsComponent } from './pages/pets-module';
import { AuthGuard, GuestGuard } from './core/guards';
import { UpdatePetFormComponent } from './pages/pets-module/components';
import { OwnersComponent } from './pages/owners-module';
import { BreedComponent } from './pages/breed/breed.component';



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
          { path: 'pets', component: PetsComponent },
          { path: 'update-pet/:id', component: UpdatePetFormComponent},
          { path: "owners", component: OwnersComponent},
          { path: "breeds", component: BreedComponent}
        ],
      },
      {
        path: '**',
        redirectTo: ''
      }
];
