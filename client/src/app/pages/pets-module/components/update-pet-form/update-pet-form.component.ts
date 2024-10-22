import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

import { ErrorResponse, IAnimal, IOwner, IPet, IType } from '@app/core/models';
import { PetService } from '@app/pages/services';

@Component({
  selector: 'app-update-pet-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ],
  templateUrl: './update-pet-form.component.html',
  styleUrl: './update-pet-form.component.scss'
})
export class UpdatePetFormComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  petService = inject(PetService);
  router = inject(Router)

  updatePetForm!: FormGroup;
  id: string;
  animal = IAnimal;
  type = IType;
  isClubMember = signal<boolean>(false);
  hasGenealogicalList = signal<boolean>(false)
  pet!: any;

  constructor() {
    this.id  = this.route.snapshot.params['id']
    this.updatePetForm = new FormGroup({
      name: new FormControl(''),
      age: new FormControl(''),
      price: new FormControl(''),
      animal: new FormControl(''),
      type: new FormControl(''),
      color: new FormControl(''),
      hasGenealogicalList: new FormControl(this.hasGenealogicalList()),
      isClubMember: new FormControl(this.isClubMember()),
      username: new FormControl({value: '', disabled: true}),
      breed: new FormControl({value: '', disabled: true}),
    });
  }

  ngOnInit(): void {
    this.loadPetData(this.id)
  }

  private loadPetData(id: string): void {
    this.petService.getPetByIdService(id).subscribe({
      next: (response) => {
        this.pet = response;
        if('id' in response) {
          this.initializeForm(response);
        }
      },
      error: (error) => console.error('Error fetching pet data:', error)
    });
  }

  private initializeForm(pet: IPet): void {
    this.hasGenealogicalList.set(pet.hasGenealogicalList);
    this.isClubMember.set(pet.isClubMember);
    // this.updatePetForm.patchValue({ ...pet });

    this.updatePetForm.patchValue({
      id: pet.id,
      name: pet.name,
      age: pet.age,
      price: pet.price,
      color: pet.color,
      type: pet.type,
      animal: pet.animal,
      username: pet.owner?.username,
      petShop: pet.petShop,
      breed: pet.breed
    });
  }
  
  getAnimals(): string[]{
    return Object.values(IAnimal)
  }

  getTypes(): string[] {
    return Object.values(IType)
  }

  isClubMemberEvent(event: Event): void {
    this.isClubMember.set((event.target as HTMLInputElement).checked); 
  }

  hasGenealogicalListEvent(event: Event): void {
    this.hasGenealogicalList.set((event.target as HTMLInputElement).checked); 
  }

  onSubmit(): void {
    this.updatePetForm.patchValue({
      hasGenealogicalList: this.hasGenealogicalList() || false,
      isClubMember: this.isClubMember() || false,
    })

    if (this.updatePetForm.valid) {
      this.petService.updatePetService(this.id, this.updatePetForm.value).subscribe({
        next: () => this.router.navigate(['/pets']),
        error: (error) => console.error("Error updating pet:", error)
      });
    } else {
      console.warn('Form is invalid');
    }
  }

}
