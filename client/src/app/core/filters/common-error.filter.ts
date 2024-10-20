import { Observable, of } from "rxjs";
import { ErrorResponse } from "../models";

export function handleError<T>(operation = 'operation', result?: T) {
  return (error: ErrorResponse): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T)
  }
}