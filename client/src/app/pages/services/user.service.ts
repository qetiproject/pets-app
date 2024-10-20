import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable } from "rxjs";

import { apiEndpoint } from "@app/core/constants/constants";
import { ErrorResponse, IUser } from "@app/core/models";
import { handleError, handleResponse } from "@app/core/filters";

@Injectable({
    providedIn: 'root'
})

export class USerService {
    
  constructor(private http: HttpClient) {}

  getAllUserService(): Observable<IUser[]> {
    return this.http.get<IUser[]>(apiEndpoint.UserEndpoint.getAllUsers).pipe(
      handleResponse(),
      catchError(handleError<IUser[]>('getAllUserService'))
    )
  }

  getUserByUsernameService(username: string): Observable<IUser | ErrorResponse> {
    return this.http.get<IUser>(apiEndpoint.UserEndpoint.getUserByUsername(username)).pipe(
      handleResponse(),
      catchError(handleError<ErrorResponse>('getUserByUsernameService'))
    )
  }
  
}