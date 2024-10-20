import { Observable } from "rxjs";

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