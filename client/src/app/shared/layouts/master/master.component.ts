import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { HeaderComponent } from '..';

@Component({
  selector: 'app-master',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule, 
    HeaderComponent
  ],
  templateUrl: './master.component.html',
  styleUrl: './master.component.scss',
})
export class MasterComponent {}
