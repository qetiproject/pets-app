import { Routes } from '@angular/router';
import { authGuard, guestGuard } from './core/guards';
import { DefaultComponent, MasterComponent } from '@shared/layouts';
import { HomeComponent, LoginComponent, OwnersComponent, PetsComponent, RegisterComponent, UpdatePetFormComponent } from './pages';


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
          { path: 'update-pet/:id', component: UpdatePetFormComponent},
          { path: "owners", component: OwnersComponent}
        ],
      },
];
