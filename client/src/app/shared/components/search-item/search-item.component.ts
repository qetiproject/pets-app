import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IAnimal, IType } from '@app/core/models';

@Component({
  selector: 'app-search-item',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './search-item.component.html',
  styleUrl: './search-item.component.scss'
})
export class SearchItemComponent {
  @Output() searchFormSubmission = new EventEmitter<any>();

  searchForm!: FormGroup;

  animal!: IAnimal;
  type!: IType;

  constructor() {
    this.searchForm = new FormGroup({
      name: new FormControl(''),
      age: new FormControl(''),
      animal: new FormControl(''),
      type: new FormControl('')
    })
  }

  getAnimals(): string[] {
    return Object.values(IAnimal);
  }

  getTypes(): string[] {
    return Object.values(IType)
  }

  searchHandler(): void {
    this.searchFormSubmission.emit(this.searchForm.value);
  }

}
