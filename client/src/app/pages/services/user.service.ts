import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, tap, throwError } from "rxjs";

import { apiEndpoint } from "@app/core/constants/constants";
import { IUser } from "@app/core/models";

@Injectable({
    providedIn: 'root'
})

export class USerService {
    
  constructor(private http: HttpClient) {}

  getAllUsers(): Observable<IUser[]> {
    return this.http.get<IUser[]>(apiEndpoint.UserEndpoint.getAllUsers)
  }

  getUserByUsername(username: string): Observable<IUser> {
    return this.http.get<IUser>(apiEndpoint.UserEndpoint.getUserByUsername(username)).pipe((
      tap(() => {}),
      catchError((error) => {
        return throwError(() => new Error(error))
      })
    ))
  }
  
}