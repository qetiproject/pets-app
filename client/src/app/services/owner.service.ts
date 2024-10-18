import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { catchError, Observable, of, tap, throwError } from 'rxjs';
import { apiEndpoint } from '@app/core/constants/constants';
import { IOwner } from '@app/core/models';

@Injectable({
  providedIn: 'root'
})
export class OwnerService {
  private owners = signal<IOwner[]>([]);

  constructor(private http: HttpClient) {}

  getAllOwners(): Observable<IOwner[]> {
    return this.http.get<IOwner[]>(apiEndpoint.OwnerEndpoint.getAllOwners).pipe(
      tap((response: IOwner[]) => {
        this.owners.set(response); // Update the owners signal
      }),
      catchError((error) => {
        console.error('Error fetching owners:', error);
        return of([]); // Return an empty array on error
      })
    );
  }

  addOwner(data: IOwner): Observable<IOwner> {
    return this.http.post<IOwner>(apiEndpoint.OwnerEndpoint.ownerAdd, data).pipe(
      tap((response: IOwner) => {
        this.owners.update((currentOwners) => [...currentOwners, response]);
      }),
      catchError((error) => {
        return throwError(() => new Error(error)); // Return the error as an observable
      })
    );
  }

  updateOwner(username: string, data: Partial<IOwner>): Observable<IOwner> {
    return this.http.patch<IOwner>(apiEndpoint.OwnerEndpoint.updateOwner(username), data).pipe(
      tap((response) => {
        this.owners.update((currentOwners) => {
          const index = currentOwners.findIndex((owner) => owner.username === username);
          if (index !== -1) {
            currentOwners[index] = { ...currentOwners[index], ...response };
          }
          return [...currentOwners]; // Return the updated array
        });
      }),
      catchError((error) => {
        console.error('Error updating owner:', error);
        return throwError(() => new Error('Failed to update owner')); // Handle error
      })
    );
  }
}
