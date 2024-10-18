import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { BehaviorSubject, catchError, Observable, of, Subject, tap, throwError } from 'rxjs';
import { apiEndpoint } from '@app/core/constants/constants';
import { DeleteSuccessResponse, ErrorResponse, IOwner, SuccessResponse } from '@app/core/models';

@Injectable({
  providedIn: 'root'
})
export class OwnerService {
  private _addOwner$ = new Subject<IOwner>();
  private _owners$ = new BehaviorSubject<IOwner[]>([]);
  private _updateOwner$ = new Subject<IOwner>();
  private _deleteOwner$ = new Subject<DeleteSuccessResponse| ErrorResponse>();

  constructor(private http: HttpClient) {}

  get owners$(): Observable<IOwner[]> {
    return this._owners$.asObservable()
  }

  getAllOwners(): Observable<IOwner[]> {
    return this.http.get<IOwner[]>(apiEndpoint.OwnerEndpoint.getAllOwners).pipe(
      tap((response: IOwner[]) => {
        this._owners$.next(response);
      }),
      catchError((error) => {
        console.error('Error fetching owners:', error);
        return of([]); 
      })
    );
  }

  get addOwner$(): Observable<IOwner> {
    return this._addOwner$.asObservable();
  }

  addOwner(data: IOwner): Observable<IOwner> {
    return this.http.post<IOwner>(apiEndpoint.OwnerEndpoint.ownerAdd, data).pipe(
      tap((owner: IOwner) => {
        const currentOwners = this._owners$.getValue();
        this._owners$.next(currentOwners ? [owner, ...currentOwners] : [owner]);
      }),
      catchError((error) => {
        return throwError(() => new Error(error));
      })
    );
  }

  get updateOwner$(): Observable<IOwner>{
    return this._updateOwner$.asObservable();
  }

  updateOwner(username: string, data: Partial<IOwner>): Observable<IOwner> {
    return this.http.patch<IOwner>(apiEndpoint.OwnerEndpoint.updateOwner(username), data).pipe(
      tap((owner) => {
        this._updateOwner$.next(owner);
        const currentOwners = this._owners$.getValue();
        if(username) {
          const index = currentOwners.findIndex((x) => x.username === username)
          if(index) {
            currentOwners[index] = owner
            this._owners$.next([owner, ...currentOwners])
          }
        }
      }),
      catchError((error) => {
        console.error('Error updating owner:', error);
        return throwError(() => new Error('Failed to update owner'));
      })
    );
  }

  deleteOwnerByUsername(username: string): Observable<any> {
    return this.http.delete<SuccessResponse>(apiEndpoint.OwnerEndpoint.deleteOwnerByUsername(username)).pipe(
      tap(() => {
        this._deleteOwner$.next({success: true, username});
        const currentOwners = this._owners$.getValue();
        if(currentOwners) {
          const updateOwners = currentOwners.filter((x) => x.username != username)
          this._owners$.next([...updateOwners])
        }
      }),
      catchError((error) => {
        return of({ success: false, message: error.message } as unknown as ErrorResponse);
      })
    )
  }


}
