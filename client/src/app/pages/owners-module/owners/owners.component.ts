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
  ownerServive = inject(OwnerService)
  
  owners$!: Observable<IOwner[]>
  errorMessage = signal<string>("")

  constructor() {
    this.owners$ = this.ownerServive.owners$
  }

  ngOnInit(): void {
    this.getOwners();
  }
  
  getOwners(): void {
    this.ownerServive.getAllOwners().subscribe({
      next: () => {},
      error: (e) => console.error(e)
    })
  }

  handleAddownerFormSubmission(data: IOwner): void {
    this.ownerServive.addOwner(data).subscribe({
      next: () => {},
      error: (errorResponse) => {}
    });
  }

  deleteOwner(username: string): void {
    this.ownerServive.deleteOwnerByUsername(username).subscribe({
      next: () => {},
      error: (e) => console.error(e)
    })
  }


}
