import { AfterViewInit, ChangeDetectionStrategy, Component, OnInit, ViewChild} from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { IPet } from '@app/core/models/pet.model';
import { PetService } from '@app/services/pet.service';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-pets',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, MatSlideToggleModule, MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule],
  templateUrl: './pets.component.html',
  styleUrl: './pets.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PetsComponent implements AfterViewInit, OnInit{
  displayedColumns: string[] = [  "name","age", "animal", "breed", "type","isClubMember","hasGenealogicalList","owner","color", "price",];
  pets: IPet[] = []

  dataSource = new MatTableDataSource<IPet>(this.pets);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private petService: PetService) {}
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.getAllPets()
  }

  getAllPets() {
    this.petService.getAllPets().subscribe({
      next: (response) => {
        this.pets = response;
        this.dataSource.data = response
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

}