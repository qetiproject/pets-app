import { Component, inject, OnInit, signal} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';

import { IAddPet, IPet, ISearchPet } from '@app/core/models/pet.model';
import { SearchItemComponent } from '@shared/components';
import { AddPetComponent } from '../components';
import { PetService } from '@app/pages/services';

@Component({
  selector: 'app-pets',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    AddPetComponent,
    SearchItemComponent
  ],
  templateUrl: './pets.component.html',
  styleUrl: './pets.component.scss',
})
export class PetsComponent implements OnInit{
  petService = inject(PetService);

  pets$: Observable<IPet[] | null>;

  constructor() {
    this.pets$ = this.petService.petList$; 
  }

  ngOnInit(): void {   
    this.getAllPets();
  }

  getAllPets(data?: ISearchPet): void {
    this.petService.getAllPetsService(data).subscribe({
      next: () => {},
      error: (e) => {console.log(e)}
    })
  }

  handleSearchFormSubmission(data: ISearchPet): void {
    this.getAllPets(data)
  }

  handleAddPetFormSubmission(data: IAddPet): void {
    this.petService.addPetService(data).subscribe({
      next: () => {},
      error: (error) => console.error('Error adding pet:', error)
    });
  }
  
  deletePet(id: string): void {
    this.petService.deletePetService(id).subscribe({
      next: () => {},
      error: (error) => {console.error(error)}
    })
  } 

}