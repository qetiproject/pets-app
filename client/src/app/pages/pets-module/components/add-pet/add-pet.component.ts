import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, inject, OnInit, Output, signal } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import { IAddPet, IAnimal, IBreed, IType } from '@app/core/models';
import { BreedService } from '@app/pages/services';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-add-pet',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './add-pet.component.html',
  styleUrl: './add-pet.component.scss',
})
export class AddPetComponent implements OnInit{
  @Output() addPetFormSubmitted = new EventEmitter<IAddPet>();
  breedService = inject(BreedService);

  petForm: FormGroup;
  animal = IAnimal;
  type = IType;
  isClubMember = signal<boolean>(false)
  hasGenealogicalList = signal<boolean>(false)
  breeds$: Observable<IBreed[] | []>
  
  constructor() {
    this.breeds$ = this.breedService.breeds$;
    this.petForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      age: new FormControl(null, [Validators.required, Validators.min(0)]),
      price: new FormControl(null,[Validators.required, Validators.min(1)]),
      animal: new FormControl('', [Validators.required]),
      type: new FormControl('', [Validators.required]),
      color: new FormControl('', [Validators.required]),
      hasGenealogicalList: new FormControl(this.hasGenealogicalList()),
      isClubMember: new FormControl(this.isClubMember()),
      breed: new FormControl('', [Validators.required])
    });
  }

  ngOnInit(): void {
    this.getBreeds();
  }

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
  

  getBreeds(): void {
    this.breedService.getBreedsService().subscribe({
      next: () => {},
      error: (error) => { console.error(error)}
    })
  }
  

}
