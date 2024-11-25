import { Component, inject, OnInit, resource, signal, ViewContainerRef} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';

import { IAddPet, IPet, ISearchPet } from '@app/core/models/pet.model';
import { ConfirmDeleteModalComponent, SearchItemComponent } from '@shared/components';
import { AddPetComponent } from '../components';
import { PetService } from '@app/pages/services';
import { apiEndpoint } from '@app/core/constants/constants';

@Component({
  selector: 'app-pets',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  templateUrl: './pets.component.html',
  styleUrl: './pets.component.scss',
})
export class PetsComponent implements OnInit{

  name = signal('')
  pets = resource<IPet[], {name: string}>({
    request: () => ({name: this.name()}),
    loader: async ({request, abortSignal}) => {
      const users = await fetch(`${apiEndpoint.PetEndpoint.getAll}?name=${request.name}`, {
        signal: abortSignal
      });
      if (!users.ok) throw Error(`Could not fetch...`)
      return await users.json();
    }
  });

  constructor() {
  }
  ngOnInit(): void {
  }
  
  petService = inject(PetService);

  viewContainerRef = inject(ViewContainerRef)
  // showConfirmDeleteComponent: boolean = false;
  petToDelete!: IPet;
  
  // pets$: Observable<IPet[] | null>;

  // constructor(
  // ) {
  //   this.pets$ = this.petService.petList$; 
  // }

  // ngOnInit(): void {   
  //   this.getAllPets();
  // }

  // getAllPets(data?: ISearchPet): void {
  //   this.petService.getAllPetsService(data).subscribe({
  //     next: () => {},
  //     error: (e) => {console.log(e)}
  //   })
  // }

  // handleSearchFormSubmission(data: ISearchPet): void {
  //   this.getAllPets(data)
  // }

  // handleAddPetFormSubmission(data: IAddPet): void {
  //   this.petService.addPetService(data).subscribe({
  //     next: () => {this.getAllPets()},
  //     error: (error) => console.error('Error adding pet:', error)
  //   });
  // }
  
  OnDeleteClicked(pet: IPet): void {
    this.petToDelete = pet;
    this.showConfirmDelete(this.petToDelete);
  }
  
  showConfirmDelete(pet: IPet): void {
    const containerViewRef = this.viewContainerRef.createComponent(ConfirmDeleteModalComponent);
    containerViewRef.setInput("pettoDelete", pet);

    containerViewRef.instance.OnConfirmation.subscribe((confirmed) => {
      if (confirmed) {
        this.deletePet(pet.id);
      }
      this.viewContainerRef.clear();
    });
  }

  deletePet(id: string): void {
    this.petService.deletePetService(id).subscribe({
      next: () => {},
      error: (error) => {console.error(error)}
    })
  } 

}