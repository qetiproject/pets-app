import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import { IOwner } from '@app/core/models';

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
export class AddOwnerComponent {
  @Output() addownerFormSubmitted = new EventEmitter<IOwner>();

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

  saveOwnerButton(){
    if(this.ownerForm.valid) {
      this.addownerFormSubmitted.emit(this.ownerForm.value)
    }
  }

}
