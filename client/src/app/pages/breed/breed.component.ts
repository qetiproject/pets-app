import { Component, inject, OnInit } from '@angular/core';
import { BreedService } from '../services';
import { Observable } from 'rxjs';
import { IBreed } from '@app/core/models';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-breed',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './breed.component.html',
  styleUrl: './breed.component.scss'
})
export class BreedComponent implements OnInit{
  breedService = inject(BreedService);

  breeds$: Observable<IBreed[] | null>

  constructor() {
    this.breeds$ = this.breedService.breeds$;
  }
  ngOnInit(): void {
    this.getAllBreeds();
  }

  getAllBreeds(): void {
    this.breedService.getBreedsService().subscribe({
      next: () => {},
      error: (error) => {console.error(error)}
    })
  }
}
