import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, catchError, Observable, tap } from 'rxjs';
import { Injectable } from '@angular/core';

import { apiEndpoint } from '@app/core/constants/constants';
import { IAddPet, IPet, ISearchPet } from '@app/core/models/pet.model';
import { ErrorResponse, SuccessResponse } from '@app/core/models/response.model';
import { handleError, handleResponse } from '@app/core/filters';

@Injectable({
  providedIn: 'root'
})
export class PetService {
  private _petList$ = new BehaviorSubject<IPet[]>([])

  constructor(
    private http: HttpClient
  ) { }

  get petList$(): Observable<IPet[]> {
    return this._petList$.asObservable();
  }

  getAllPetsService(data?: ISearchPet): Observable<IPet[]> {
    const params: Partial<ISearchPet> = this.buildSearchParams(data);

    return this.http.get<IPet[]>(apiEndpoint.PetEndpoint.getAll, { params }).pipe(
      handleResponse(),
      tap(pets => this._petList$.next(pets)),
      catchError(handleError<IPet[]>('getAllPetsService', []))
    );
  }

  addPetService(data: IAddPet): Observable<IPet | ErrorResponse> {
    return this.http.post<IPet>(apiEndpoint.PetEndpoint.petAdd, data).pipe(
      handleResponse(pet => {
        this._petList$.next([pet, ...this._petList$.getValue()])
      }),
      catchError(handleError<ErrorResponse>('addPetService'))
  )}

  getPetByIdService(id: string): Observable<IPet | ErrorResponse> {
    return this.http.get<IPet>(apiEndpoint.PetEndpoint.getPetById(id)).pipe(
      handleResponse(pet => this.updatePetInList(id, pet)),
      catchError(handleError<ErrorResponse>('getPetByIdService'))
    );
  }

  updatePetService(id: string, data: IPet): Observable<IPet | ErrorResponse> {
    return this.http.put<IPet>(apiEndpoint.PetEndpoint.updatePetById(id), data).pipe(
      handleResponse(pet => this.updatePetInList(id, pet)),
      catchError(handleError<ErrorResponse>('updatePetService'))
    );
  }

  deletePetService(id: string): Observable<any> {
    return this.http.delete<SuccessResponse>(apiEndpoint.PetEndpoint.deletePetById(id)).pipe(
      handleResponse(() => {
         const updateCurrentPets = this._petList$.getValue().filter(x => x.id != id)
         this._petList$.next(updateCurrentPets)
      }),
      catchError(error => {
        console.error('Error in deletePetService:', error);
        return handleError<ErrorResponse>('deletePetService')(error);
      })
    );
  }

  private buildSearchParams(data?: ISearchPet): Partial<ISearchPet> {
    if(!data) return {};
    const {name, type, animal, age} = data;
    return {name, type, animal, age};
  }

  private updatePetInList(id: string, pet: IPet): void {
    const currentPets = this._petList$.getValue();
    const index = currentPets.findIndex(x => x.id === id);
    if(index != -1) {
      currentPets[index] = pet;
      this._petList$.next(currentPets);
    }
  }

}
