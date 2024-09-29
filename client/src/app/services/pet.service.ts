import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { apiEndpoint } from '@app/core/constants/constants';
import { IPet } from '@app/core/models/pet.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PetService {

  constructor(private http: HttpClient) { }

  getPetAll(): Observable<IPet[]> {
    return this.http.get<IPet[]>(`${apiEndpoint.PetEndpoint.getAll}`);
  }

}
