import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output, signal } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import { IAddPet, IAnimal, IType } from '@app/core/models';

@Component({
  selector: 'app-add-pet',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './add-pet.component.html',
  styleUrl: './add-pet.component.scss'
})
export class AddPetComponent implements OnInit{
  @Output() addPetFormSubmitted = new EventEmitter<IAddPet>();
  
  petForm: FormGroup;
  animal = IAnimal;
  type = IType;
  isClubMember = signal<boolean>(false)
  hasGenealogicalList = signal<boolean>(false)

  constructor() {
    this.petForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      age: new FormControl(null, [Validators.required, Validators.min(0)]),
      price: new FormControl(null,[Validators.required, Validators.min(1)]),
      animal: new FormControl('', [Validators.required]),
      type: new FormControl('', [Validators.required]),
      color: new FormControl('', [Validators.required]),
      hasGenealogicalList: new FormControl(this.hasGenealogicalList()),
      isClubMember: new FormControl(this.isClubMember()),
    });
  }

  ngOnInit(): void {}

  getAnimals(): string[] {
    return Object.values(IAnimal);
  }

  getTypes(): string[] {
    return Object.values(IType)
  }

  onSubmit(): void {
    this.petForm.patchValue({
      hasGenealogicalList: this.hasGenealogicalList() || false,
      isClubMember: this.isClubMember() || false,
    })
    if (this.petForm.valid) {
      this.addPetFormSubmitted.emit(this.petForm.value);
      this.petForm.reset();
      this.resetSignals()
    }
  }

  isClubMemberEvent(event: Event): void {
    this.isClubMember.set((event.target as HTMLInputElement).checked)
  }

  hasGenealogicalListEvent(event: Event): void {
    this.hasGenealogicalList.set((event.target as HTMLInputElement).checked)
  }

  resetSignals(): void {
    this.isClubMember.set(false);
    this.hasGenealogicalList.set(false);
  }

}
