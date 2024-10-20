import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { BehaviorSubject, catchError, Observable, of} from 'rxjs';

import { apiEndpoint } from '@app/core/constants/constants';
import { ErrorResponse, IOwner, SuccessResponse } from '@app/core/models';
import { handleError, handleResponse } from '@app/core/filters/common-error.filter';

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
        const currentOwners = this._owners$.getValue();
        this._owners$.next([owner, ...currentOwners])
      }),
      catchError(handleError<ErrorResponse>('addOwnerService'))
    )
  }

  updateOwner(username: string, data: Partial<IOwner>): Observable<IOwner | ErrorResponse> {
    return this.http.patch<IOwner>(apiEndpoint.OwnerEndpoint.updateOwner(username), data).pipe(
      handleResponse(owner => {
        const currentOwners = this._owners$.getValue();
        const index = currentOwners.findIndex(x => x.username === username);
        if (index !== -1) {
          currentOwners[index] = owner;
          this._owners$.next([...currentOwners]);
        }
      }),
      catchError(handleError<ErrorResponse>('updateOwner'))
    );
  }

  deleteOwnerByUsernameService(username: string): Observable<ErrorResponse | unknown> {
    return this.http.delete<SuccessResponse>(apiEndpoint.OwnerEndpoint.deleteOwnerByUsername(username)).pipe(
      handleResponse(() => {
        const currentOwners = this._owners$.getValue();
        if(currentOwners) {
          const updateOwners = currentOwners.filter(x => x.username != username)
          this._owners$.next([...updateOwners])
        }
      }),
      catchError(handleError<ErrorResponse>('deleteOwnerByUsernameService'))
    )
  }


}
