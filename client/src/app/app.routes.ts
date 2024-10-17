import { Routes } from '@angular/router';
import { LoginComponent, HomeComponent } from './pages';
import { PetsComponent } from './pages/pets/pets.component';
import { RegisterComponent } from './pages/register/register.component';
import { DefaultComponent, MasterComponent } from './shared/layouts';
import { authGuard, guestGuard } from './core/guards';
import { UpdatePetFormComponent } from './pages/update-pet-form/update-pet-form.component';

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
          { path: 'pets', component: PetsComponent },
          { path: 'update-pet/:id', component: UpdatePetFormComponent}
        ],
      },
];
