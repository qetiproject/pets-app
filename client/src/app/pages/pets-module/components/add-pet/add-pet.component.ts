import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, OnInit, Output, signal } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { catchError, Observable, of } from 'rxjs';

import { IAddPet, IAnimal, IBreed, IOwner, IType } from '@app/core/models';
import { BreedService, OwnerService, PetService } from '@app/pages/services';

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
  ownerService = inject(OwnerService)
  petService = inject(PetService)

  owners = signal<IOwner[]>([]);
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
      breed: new FormControl('', [Validators.required]),
      owners: new FormGroup({
        username: new FormControl(''),
        firstName: new FormControl(''),
        lastName: new FormControl(''),
        age: new FormControl(null),
        balance: new FormControl(null)
      })
    });
  }

  ngOnInit(): void {
    this.getBreeds();
    this.getOwners();
  }

  getAnimals(): string[] {
    return Object.values(IAnimal);
  }

  getTypes(): string[] {
    return Object.values(IType)
  }

  get usernames(): string[] {
    return this.owners().map((user) => user.username)
  }

  onSubmit(): void {
  
    const username = this.petForm.value.owners.username;
    this.ownerService.getOwnerByUsernameService(username).subscribe({
      next: (data: any) => {
        this.petForm.patchValue({
          owners: {
            firstName: data.firstName,
            lastName: data.lastName,
            age: data.age,
            balance: data.balance
          }
        });
  
        if (this.petForm.valid) {
            this.addPetFormSubmitted.emit(this.petForm.value);
            this.petForm.reset();
        } else {
          console.warn('Form is invalid');
        }
      },
    });
  }

  getOwners(): void {
    this.ownerService.getAllOwnersService().pipe(
      catchError((error) => {
        console.error('Error fetching owners:', error);
        return of([])
      })
    ).subscribe({
      next: (data) => {this.owners.set(data)}
    })
  }

  getBreeds(): void {
    this.breedService.getBreedsService().subscribe({
      next: () => {},
      error: (error) => { console.error(error)}
    })
  }

  
}
