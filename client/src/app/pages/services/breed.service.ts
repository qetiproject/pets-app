import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { apiEndpoint } from '@app/core/constants/constants';
import { handleError, handleResponse } from '@app/core/filters';
import { ErrorResponse, IAddBreed, IBreed, SuccessResponse } from '@app/core/models';
import { BehaviorSubject, catchError, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BreedService {
  private _breeds$ = new BehaviorSubject<IBreed[]>([])
  
  constructor(private http: HttpClient) { }

  get breeds$(): Observable<IBreed[]> {
    return this._breeds$.asObservable();
  }

  getBreedsService(): Observable<IBreed[]> {
    return this.http.get<IBreed[]>(apiEndpoint.BreedEndpoint.getAllBreeds).pipe(
      handleResponse(),
      tap(breeds => this._breeds$.next(breeds)),
      catchError(handleError<IBreed[]>('getBreedsService', []))
    )
  }

  addBreedService(data: IAddBreed): Observable<IBreed | ErrorResponse> {
    return this.http.post<IBreed>(apiEndpoint.BreedEndpoint.addBreed, data).pipe(
      handleResponse(breed => {
        this._breeds$.next([breed, ...this._breeds$.getValue()])
      }),
      catchError(handleError<IBreed>('addBreedService'))
    )
  }

  getBreedByIdService(id: string): Observable<IBreed | ErrorResponse> {
    return this.http.get<IBreed>(apiEndpoint.BreedEndpoint.getBreedById(id)).pipe(
      handleResponse(breed => this.updateBreedInList(id, breed)),
      catchError(handleError<ErrorResponse>('getBreedByIdService'))
    )
  }

  deleteBreedService(id: string): Observable<SuccessResponse |ErrorResponse> {
    return this.http.delete<any>(apiEndpoint.BreedEndpoint.deleteBreedById(id)).pipe(
      handleResponse(() => this.deleteBreedFromList(id)),
      catchError(handleError<any>('deleteBreedService'))
    )
  }

  private updateBreedInList(id: string, breed: IBreed): void {
    const currentBreeds = this._breeds$.getValue();
    const index = currentBreeds.findIndex(x => x.id === id);
    if(index != -1) {
      currentBreeds[index] = breed;
      this._breeds$.next(currentBreeds);
    }
  }

  private deleteBreedFromList(id: string): void {
    const updatedBreedList = this._breeds$.getValue().filter(breed => breed.id !== id);
    this._breeds$.next(updatedBreedList);
  }
}
