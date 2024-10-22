import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, OnInit, Output, signal } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import { IAddPet, IAnimal, IBreed, IType, IUser } from '@app/core/models';
import { BreedService, USerService } from '@app/pages/services';
import { catchError, Observable, of } from 'rxjs';

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
  userService = inject(USerService)

  users = signal<IUser[]>([]);
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
      ownerUsername: new FormControl(''),
    });
  }

  ngOnInit(): void {
    this.getBreeds();
    this.getAllUsers();
  }

  getAnimals(): string[] {
    return Object.values(IAnimal);
  }

  getTypes(): string[] {
    return Object.values(IType)
  }

  get usernames(): string[] {
    return this.users().map((user) => user.username)
  }

  onSubmit(): void {
    if (this.petForm.valid) {
      this.addPetFormSubmitted.emit(this.petForm.value);
      this.petForm.reset();
    }
  }

  getBreeds(): void {
    this.breedService.getBreedsService().subscribe({
      next: () => {},
      error: (error) => { console.error(error)}
    })
  }
  

  private getAllUsers(): void {
    this.userService.getAllUserService().pipe(
      catchError(error => {
        console.error("Error fetching users:", error)
        return of([])
      })
    ).subscribe({
      next: (data) => {
        const filteredUsers = data.filter((x: IUser) => x.role === "user");
        this.users.set(filteredUsers)
      }
    })
  }
  
}
