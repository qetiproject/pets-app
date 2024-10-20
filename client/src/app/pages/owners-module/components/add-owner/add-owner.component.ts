import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, OnInit, Output, signal } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import { IOwner } from '@app/core/models';
import { USerService } from '@app/pages/services/user.service';
import { IUser} from '@app/core/models/auth.model';
import { throwError } from 'rxjs';

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

  userService = inject(USerService)

  users: IUser[] = [];
  username = signal<string>("");
  email = signal<string>("");
  role = signal<string>("");

  ownerForm: FormGroup

  constructor(){    
    this.ownerForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      firstName: new FormControl("", [Validators.required]),
      lastName: new FormControl("",[Validators.required]),
      age: new FormControl(null, [Validators.required]),
      balance: new FormControl(null, [Validators.required]),
      email: new FormControl(),
      role: new FormControl()
    });
  }

  ngOnInit(): void {
    this.getAllUsers();
  }

  get usernames(): string[] {
    return this.users.map((user) => user.username)
  }

  getAllUsers(): void {
    this.userService.getAllUsers().subscribe({
      next: (response) => {
        this.users = response.filter((x: any) => x.role === "user");
      },
      error: (error) => console.error(error)
    })
  }

  saveOwnerButton(){
    if(this.ownerForm.valid) {
      this.addownerFormSubmitted.emit(this.ownerForm.value);
      this.ownerForm.reset();
    }
  }

}
