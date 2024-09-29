import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { IPet } from '@app/core/models/pet.model';
import { PetService } from '@app/services/pet.service';

@Component({
  selector: 'app-pets',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule],
  templateUrl: './pets.component.html',
  styleUrl: './pets.component.scss'
})
export class PetsComponent implements OnInit{
  displayedColumns: string[] = ['name', 'age'];
  dataSource = new MatTableDataSource<IPet>([]); // Initialize with an empty array


  items: IPet[] = [];
  constructor(private petService: PetService) {}

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.getPetAll()
  }

  getPetAll() {
    this.petService.getPetAll().subscribe(items => {
      this.items = items;
      this.dataSource.data = this.items;
    });
  }
}
