import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, catchError, Observable, of, Subject, tap } from 'rxjs';
import { Injectable } from '@angular/core';

import { apiEndpoint } from '@app/core/constants/constants';
import { IAddPet, IPet, ISearchPet } from '@app/core/models/pet.model';
import { DeleteSuccessResponse, ErrorResponse, SuccessResponse } from '@app/core/models/response.model';

@Injectable({
  providedIn: 'root'
})
export class PetService {
  private _addPet$ = new Subject<IAddPet>();
  private _petList$ = new BehaviorSubject<IPet[]>([])
  private _petById$ = new Subject<IPet>();
  private _updatePet$ = new BehaviorSubject<IPet | null>(null);
  private _deletePet$ = new Subject<DeleteSuccessResponse| ErrorResponse>();

  constructor(
    private http: HttpClient
  ) { }

  get petList$(): Observable<IPet[]> {
    return this._petList$.asObservable();
  }
  getAllPets(data?: ISearchPet): Observable<IPet[]> {
    const params: Partial<ISearchPet> = {};

    if (data) {
      if (data.name) params.name = data.name;
      if (data.type) params.type = data.type;
      if (data.animal) params.animal = data.animal
      if (data.age) params.age = data.age
    }
  
    return this.http.get<IPet[]>(apiEndpoint.PetEndpoint.getAll, { params }).pipe(
      tap((pets: IPet[]) => {
        this._petList$.next(pets);
      })
    );
  }

  get addPet$(): Observable<IAddPet> {
    return this._addPet$.asObservable();
  }

  addPetService(data: IAddPet): Observable<IPet> {
    return this.http.post<IPet>(`${apiEndpoint.PetEndpoint.petAdd}`, data).pipe(
      tap((pet) => {
        const currentPets = this._petList$.getValue();
        this._petList$.next(currentPets ? [pet, ...currentPets] : [pet]);
      })
  )}

  get petById$(): Observable<IPet> {
    return this._petById$.asObservable();
  }

  getPetByIdService(id: string): Observable<IPet> {
    return this.http.get<IPet>(apiEndpoint.PetEndpoint.getPetById(id)).pipe(
      tap((pet: IPet) => {
        this._petById$.next(pet);
      }),
      
    );
  }

  get updatePet$(): Observable<IPet | null> {
    return this._updatePet$.asObservable();
  }

  updatePetService(id: string, data: IPet): Observable<IPet> {
    return this.http.put<IPet>(apiEndpoint.PetEndpoint.updatePetById(id), data).pipe(
      tap((updatedPet) => {
          this._updatePet$.next(updatedPet);
          const currentPets = this._petList$.getValue();
          if (currentPets) {
              const index = currentPets.findIndex(pet => pet.id === id);
              if (index !== -1) {
                  currentPets[index] = updatedPet; 
                  this._petList$.next([...currentPets]);
              }
          }
      }),
  );
  }

  deletePetById(id: string): Observable<any> {
    return this.http.delete<SuccessResponse>(apiEndpoint.PetEndpoint.deletePetById(id)).pipe(
      tap(() => {
        this._deletePet$.next({success: true, id});
        const currentPets = this._petList$.getValue();
        if (currentPets) {
          const updatedPets = currentPets.filter(pet => pet.id !== id);
          this._petList$.next(updatedPets); 
        }
      }),
      catchError((error) => {
        return of({ success: false, message: error.message } as unknown as ErrorResponse);
      })
    );
  }
  

}
