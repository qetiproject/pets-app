import { Observable, of } from "rxjs";
import { ErrorResponse } from "../models";

export function handleResponse<T>(callback?: (data: T) => void) {
    return (source: Observable<T>) => {
      return new Observable<T>(observer => {
        return source.subscribe({
          next(value) {
            if (callback) callback(value);
            observer.next(value);
          },
          error(err) {
            observer.error(err);
          },
          complete() {
            observer.complete();
          },
        });
      });
    };
  }

  export function handleError<T>(operation = 'operation', result?: T) {
    return (error: ErrorResponse): Observable<T> => {
        console.error(`${operation} failed: ${error.message}`);
        return of(result as T)
    }
  }