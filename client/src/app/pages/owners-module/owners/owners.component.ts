import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { IOwner } from '@app/core/models';
import { OwnerService } from '@app/pages/services/owner.service';
import { AddOwnerComponent } from '@app/pages/owners-module/components/add-owner/add-owner.component';
import { catchError, Observable, of } from 'rxjs';

@Component({
  selector: 'app-owners',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    AddOwnerComponent
  ],
  templateUrl: './owners.component.html',
  styleUrl: './owners.component.scss'
})
export class OwnersComponent implements OnInit{
  ownerService = inject(OwnerService)
  
  owners$!: Observable<IOwner[]>
  errorMessage = signal<string>("")

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

  deleteOwner(username: string): void {
    this.ownerService.deleteOwnerService(username).pipe(
      catchError(error => {
        console.error('Error deleting owner:', error);
        return of(null)
      })
    ).subscribe({
      next: () => {}
    })
  }


}
