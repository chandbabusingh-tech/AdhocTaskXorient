import { Avengers } from './avengers';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AVENGERS {
  public static avengersArr : Avengers[] =
  [
    {
      Id:    1,
      Name:  'Super Man',
      Gender:'Male',
      Salary: 50000.00,
      DOJ:    '2018-04-20'
    },
    {
      Id:    2,
      Name:  'Wondar Woman',
      Gender:'Female',
      Salary: 75000.00,
      DOJ:    '2016-04-24'
    },
    {
      Id:    3,
      Name:  'Spider Man',
      Gender:'Other',
      Salary: 25000.00,
      DOJ:    '2017-12-21'
    }
  ]
}


