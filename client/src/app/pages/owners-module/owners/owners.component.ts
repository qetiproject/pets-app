import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { catchError, Observable, of } from 'rxjs';

import { IOwner } from '@app/core/models';
import { OwnerService } from '@app/pages/services/owner.service';
import { AddOwnerComponent } from '@app/pages/owners-module/components/add-owner/add-owner.component';
import { ConfirmDeleteModalComponent } from '@shared/components';

@Component({
  selector: 'app-owners',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    AddOwnerComponent,
    ConfirmDeleteModalComponent
  ],
  templateUrl: './owners.component.html',
  styleUrl: './owners.component.scss'
})
export class OwnersComponent implements OnInit{
  ownerService = inject(OwnerService)
  
  owners$!: Observable<IOwner[]>
  errorMessage = signal<string>("")
  selectedUsername: string = ""
  title: string = "Owner"

  constructor() {
    this.owners$ = this.ownerService.owners$
  }

  ngOnInit(): void {
    this.getOwners();
  }
  
  getOwners(): void {
    this.ownerService.getAllOwnersService().pipe(
      catchError((error) => {
        console.error('Error fetching owners:', error);
        return of([])
      })
    ).subscribe({
      next: () => {}
    })
  }

  handleAddownerFormSubmission(data: IOwner): void {
    this.ownerService.addOwnerService(data).pipe(
      catchError(error => {
        console.error('Error adding owner:', error);
        return of(null)
      })
    ).subscribe({
      next: () => {}
    })
  }

  confirmDelete(username: string): void {
    this.selectedUsername = username;
  }

  deleteOwner(): void {
    this.ownerService.deleteOwnerService(this.selectedUsername).pipe(
      catchError(error => {
        console.error('Error deleting owner:', error);
        return of(null)
      })
    ).subscribe({
      next: () => {}
    })
  }

  

}
