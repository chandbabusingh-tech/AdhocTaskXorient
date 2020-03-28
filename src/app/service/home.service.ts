import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from "rxjs/operators";
import { AVENGERS } from '../model/mockdata.model';
import { Avengers } from '../model/avengers';

@Injectable({
  providedIn: 'root',
})
export class AvengersService {
  constructor() { }

  getAvengers(): Observable<Avengers[]> {
    return of(AVENGERS.avengersArr);
  }

  // private handleError<T> (operation = 'operation', result?: T) {
  //   return (error: any): Observable<T> => {

  //     // TODO: send the error to remote logging infrastructure
  //     console.error(error); // log to console instead

  //     // TODO: better job of transforming error for user consumption
  //     console.log(`${operation} failed: ${error.message}`);

  //     // Let the app keep running by returning an empty result.
  //     return of(result as T);
  //   };
}
