import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, of} from 'rxjs';

import { apiEndpoint } from '@app/core/constants/constants';
import { ErrorResponse, IOwner, SuccessResponse } from '@app/core/models';
import { handleError, handleResponse } from '@app/core/filters';

@Injectable({
  providedIn: 'root'
})
export class OwnerService {
  private _owners$ = new BehaviorSubject<IOwner[]>([]);

  constructor(private http: HttpClient) {}

  get owners$(): Observable<IOwner[]> {
    return this._owners$.asObservable()
  }

  getAllOwnersService(): Observable<IOwner[]> {
    return this.http.get<IOwner[]>(apiEndpoint.OwnerEndpoint.getAllOwners).pipe(
     handleResponse(),
     catchError(handleError<IOwner[]>('getAllOwnersService', []))
    );
  }

  addOwnerService(data: IOwner): Observable<IOwner | ErrorResponse> {
    return this.http.post<IOwner>(apiEndpoint.OwnerEndpoint.ownerAdd, data).pipe(
      handleResponse(owner => {
        this._owners$.next([owner, ...this._owners$.getValue()])
      }),
      catchError(handleError<ErrorResponse>('addOwnerService'))
    )
  }

  updateOwnerService(username: string, data: Partial<IOwner>): Observable<IOwner | ErrorResponse> {
    return this.http.patch<IOwner>(apiEndpoint.OwnerEndpoint.updateOwner(username), data).pipe(
      handleResponse(owner => this.updateOwnerInList(username, owner)),
      catchError(handleError<ErrorResponse>('updateOwnerService'))
    );
  }

  deleteOwnerService(username: string): Observable<SuccessResponse | ErrorResponse> {
    return this.http.delete<SuccessResponse>(apiEndpoint.OwnerEndpoint.deleteOwnerByUsername(username)).pipe(
      handleResponse(() => this.deleteOwnerFromList(username)),
      catchError(error => {
        console.error('Error in deletePetService:', error);
        return handleError<ErrorResponse>('deleteOwnerService')(error)
      })
    )
  }

  private updateOwnerInList(username: string, owner: IOwner): void {
    const currentOwners = this._owners$.getValue()
      .map(existingOwner => 
        existingOwner.username === username ? owner : existingOwner
      );
    this._owners$.next(currentOwners);
  }

  private deleteOwnerFromList(username: string): void {
    const updatedOwnerList = this._owners$.getValue().filter(owner => owner.username !== username);
    this._owners$.next(updatedOwnerList);
  }

}
