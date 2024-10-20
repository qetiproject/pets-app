import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, OnInit, Output, signal } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { catchError, debounceTime, Observable, of, switchMap } from 'rxjs';

import { IOwner, IUser } from '@app/core/models';
import { OwnerService, USerService } from '@app/pages/services';

@Component({
  selector: 'app-add-owner',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './add-owner.component.html',
  styleUrl: './add-owner.component.scss'
})
export class AddOwnerComponent implements OnInit{
  @Output() addOwnerFormSubmitted = new EventEmitter<IOwner>();
  @Input() owners!: Observable<IOwner[]>;

  userService = inject(USerService)
  ownerService = inject(OwnerService)

  users = signal<IUser[]>([]);
  existingOwners: IOwner[] = []; 
  ownerForm: FormGroup

  constructor(){    
    this.ownerForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      firstName: new FormControl("", [Validators.required]),
      lastName: new FormControl("",[Validators.required]),
      age: new FormControl(null, [Validators.required]),
      balance: new FormControl(null, [Validators.required]),
    });

    this.ownerForm.get('username')?.valueChanges.pipe(
      debounceTime(300),
      switchMap(username => this.checkUsernameExists(username))
    ).subscribe(exists => {
      if(exists) {
        this.ownerForm.get("username")?.setErrors({usernameExists: true})
      }
    })
  }

  ngOnInit(): void {
    this.getAllUsers();
    this.getOwners();
  }

  getOwners(): void {
    this.owners.subscribe(data => {
      this.existingOwners = data
    })
  }

  get usernames(): string[] {
    return this.users().map((user) => user.username)
  }

  getAllUsers(): void {
    this.userService.getAllUsers().pipe(
      catchError(error => {
        console.error("Error fetching users:", error)
        return of([])
      })
    ).subscribe({
      next: (data) => {
        const response = data.filter((x: IUser) => x.role === "user");
        this.users.set(response)
      }
    })
  }

  saveOwner(){
    if (this.ownerForm.valid) {
      this.addOwnerFormSubmitted.emit(this.ownerForm.value);
      this.ownerForm.reset();
    }
  }

  checkUsernameExists(username: string): Observable<boolean> {
    return new Observable<boolean>(observer => {
      const exists = this.existingOwners.some(owner => owner.username === username);
      observer.next(exists)
      observer.complete();
    })
  }

}
