import { Component } from '@angular/core';
import { PetsComponent } from '..';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    PetsComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
