import { Component, inject, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IBreed } from '@app/core/models';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import { BreedService } from '../services';
import { ConfirmDeleteModalComponent } from '@shared/components';

@Component({
  selector: 'app-breed',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ConfirmDeleteModalComponent
],
  templateUrl: './breed.component.html',
  styleUrl: './breed.component.scss'
})
export class BreedComponent implements OnInit{
  breedService = inject(BreedService);

  breeds$: Observable<IBreed[] | null>
  breedForm: FormGroup;
  title = "Breed"
  selectedId: string = ""

  constructor() {
    this.breeds$ = this.breedService.breeds$;
    this.breedForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required])
    })
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

  onSubmit(): void {
    if(this.breedForm.valid) {
      this.breedService.addBreedService(this.breedForm.value).subscribe({
        next: () => {
          this.breedForm.reset()
        },
        error: (error) => { console.error(error)}
      })
    }
  }

  confirmDelete(id: string): void {
    this.selectedId = id;
  }
  
  deleteBreed(): void {
    if (this.selectedId) {
      this.breedService.deleteBreedService(this.selectedId).subscribe({
        next: () => {},
        error: (error) => { console.error(error) }
      });
    }
  }

}
