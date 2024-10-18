import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

import { IAnimal, IPet, IType } from '@app/core/models';
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
  isClubMember: boolean = false;
  hasGenealogicalList: boolean = false;

  constructor() {
    this.id  = this.route.snapshot.params['id']
    this.updatePetForm = new FormGroup({
      name: new FormControl(''),
      age: new FormControl(''),
      price: new FormControl(''),
      animal: new FormControl(''),
      type: new FormControl(''),
      color: new FormControl(''),
      hasGenealogicalList: new FormControl(null),
      isClubMember: new FormControl(null),
    });
  }

  ngOnInit(): void {
    this.getPetById(this.id)
  }

  initialUpdatePetForm(pet: IPet): void {
    this.hasGenealogicalList = pet.hasGenealogicalList;
    this.isClubMember = pet.isClubMember;

    this.updatePetForm.patchValue({
      name: pet.name,
      age: pet.age,
      price: pet.price,
      animal: pet.animal,
      type: pet.type,
      color: pet.color,
      hasGenealogicalList: pet.hasGenealogicalList,
      isClubMember: pet.isClubMember,
    });
  }
  
  getAnimals(): string[]{
    return Object.values(IAnimal)
  }

  getTypes(): string[] {
    return Object.values(IType)
  }

  getPetById(id: string): void {
    this.petService.getPetByIdService(id).subscribe({
      next: (data) => {
        this.initialUpdatePetForm(data);
      },
      error: (e) => { console.log(e)}
    })
  }

  isClubMemberEvent(event: Event): void {
    const isChecked = (event.target as HTMLInputElement).checked;
    this.isClubMember = isChecked; 
  }

  hasGenealogicalListEvent(event: Event): void {
    const isChecked = (event.target as HTMLInputElement).checked;
    this.hasGenealogicalList = isChecked; 
  }

  updatePetFormButton(): void {
    this.updatePetForm.patchValue({
      hasGenealogicalList: this.hasGenealogicalList || false,
      isClubMember: this.isClubMember || false,
    })

    if (this.updatePetForm.valid) {
      this.petService.updatePetService(this.id, this.updatePetForm.value).subscribe({
        next: () => {
          this.router.navigate(['/pets'])
        },
        error: (e) => {
          console.error(e);
        }
      });
    } else {
      console.warn('Form is invalid');
    }
  }

}
