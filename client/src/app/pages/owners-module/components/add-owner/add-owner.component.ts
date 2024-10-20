import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, OnInit, Output, signal } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import { IOwner } from '@app/core/models';
import { USerService } from '@app/pages/services/user.service';
import { IUser} from '@app/core/models/auth.model';
import { Observable } from 'rxjs';
import { OwnerService } from '@app/pages/services';

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
  @Output() addownerFormSubmitted = new EventEmitter<IOwner>();
  @Input() owners!: Observable<IOwner[]>;

  userService = inject(USerService)
  ownerService = inject(OwnerService)

  users = signal<IUser[]>([]);
  username = signal<string>("");
  existingOwners = signal<IOwner[]>([]); 

  ownerForm: FormGroup

  constructor(){    
    this.ownerForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      firstName: new FormControl("", [Validators.required]),
      lastName: new FormControl("",[Validators.required]),
      age: new FormControl(null, [Validators.required]),
      balance: new FormControl(null, [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.getAllUsers()
  }

  get usernames(): string[] {
    return this.users().map((user) => user.username)
  }

  getAllUsers(): void {
    this.userService.getAllUsers().subscribe({
      next: (data) => {
        const response = data.filter((x: any) => x.role === "user");
        this.users.set(response)
      },
      error: (error) => console.error(error)
    })
  }

  saveOwnerButton(){
    if (this.ownerForm.valid) {
      const username = this.ownerForm.value.username;

      if (this.usernameExists(username)) {
        this.ownerForm.get('username')?.setErrors({ usernameExists: true });
        return;
      }
      this.addownerFormSubmitted.emit(this.ownerForm.value);
      this.ownerForm.reset();
    }
   
  }

  usernameExists(username: string): boolean {
    this.owners.subscribe(data => {
      this.existingOwners.set(data)
    })
    return this.existingOwners().some(owner => owner.username === username);
  }

}
