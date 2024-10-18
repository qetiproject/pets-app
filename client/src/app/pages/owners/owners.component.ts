import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IOwner } from '@app/core/models';
import { OwnerService } from '@app/services/owner.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-owners',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ],
  templateUrl: './owners.component.html',
  styleUrl: './owners.component.scss'
})
export class OwnersComponent implements OnInit{
  ownerServive = inject(OwnerService)
  owners: IOwner[] = [];
  
  constructor() {
  }

  ngOnInit(): void {
    this.getOwners();
    this.updateOwner();
    this.addOwner()
  }
  
  getOwners() {
    this.ownerServive.getAllOwners().subscribe({
      next: (data) => {
        this.owners = data
      }
    })
  }

  addOwner() {
    const data: IOwner = {
      username: "test23",
      firstName: "ketitews",
      lastName: "khetsuriani",
      age: 28,
      balance: 2
    }

    this.ownerServive.addOwner(data).subscribe({
      next: () => {},
      error: (e) => {}
    })
  }

  updateOwner() {
    const data: IOwner = {
      username: "testdev",
      firstName: "ketisd",
      lastName: "khetsuriani",
      age: 28,
      balance: 0
    }
    this.ownerServive.updateOwner("testdev", data).subscribe({
      next: () => {},
      error: (e) => {e}
    })
  }
  deleteOwner(id: number) {}


}
