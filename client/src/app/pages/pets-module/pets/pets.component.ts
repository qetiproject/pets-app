import { Component, ComponentFactoryResolver, inject, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';

import { IAddPet, IPet, ISearchPet } from '@app/core/models/pet.model';
import { ConfirmDeleteModalComponent, SearchItemComponent } from '@shared/components';
import { AddPetComponent } from '../components';
import { PetService } from '@app/pages/services';
import { ViewContainer } from '../viewContainer.directive';

@Component({
  selector: 'app-pets',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    AddPetComponent,
    SearchItemComponent,
    ConfirmDeleteModalComponent
  ],
  templateUrl: './pets.component.html',
  styleUrl: './pets.component.scss',
})
export class PetsComponent implements OnInit{
  petService = inject(PetService);

  vcr = inject(ViewContainerRef)
  showConfirmDeleteComponent: boolean = false;
  petToDelete!: IPet;

  @ViewChild('container') container!: ViewContainer;
  
  pets$: Observable<IPet[] | null>;
  title: string = "Pet";
  onConfirmationObs: any;

  constructor(
    private viewContainerRef: ViewContainerRef,
    private componentFactoryResolver: ComponentFactoryResolver
  ) {
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
      next: () => {this.getAllPets()},
      error: (error) => console.error('Error adding pet:', error)
    });
  }
  
  OnDeleteClicked(pet: IPet): void {
    this.petToDelete = pet;
    this.showConfirmDelete(this.petToDelete);

  }
  
  showConfirmDelete(pet: IPet): void {
    const containerViewRef = this.viewContainerRef.createComponent(ConfirmDeleteModalComponent);
    containerViewRef.instance.pettoDelete = pet;

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