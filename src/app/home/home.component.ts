import { Component, OnInit } from '@angular/core';
import { DatePipe, CurrencyPipe } from '@angular/common';
import {
  NgbDateStruct,
  NgbCalendar,
  NgbDropdown
} from '@ng-bootstrap/ng-bootstrap';
import {
  FormArray,
  FormGroupName,
  FormGroup,
  FormBuilder,
  FormControl
} from '@angular/forms';
import { AvengersService } from '../service/home.service';
import { Avengers } from '../model/avengers';
import { Observable } from 'rxjs';
import { AVENGERS } from '../model/mockdata.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {
  public avengerData: Observable<Avengers[]>;
  public insertVal: any;
  public genderList = [
    { id: 'Other', name: 'Other' },
    { id: 'Male', name: 'Male' },
    { id: 'Female', name: 'Female' }
  ];
  constructor(
    private avengersService: AvengersService
  ) {
    this.insertVal = new Avengers(0, '', 'Other', 0.0, '');
  }

  ngOnInit(): void {
    this.avengerData = this.avengersService.getAvengers();
    this.insertVal.DOJ = new Date();
  }
  Validate():void{
    this.insertVal.Name;
  }
  addRecord(): void {

    if (this.insertVal.Id > 0) {
      //update
      AVENGERS.avengersArr.forEach(data => {
        if ((data.Id == this.insertVal.Id)) {
          data.Id = this.insertVal.Id;
          data.Name = this.insertVal.Name;
          data.Gender = this.insertVal.Gender;
          data.Salary = this.insertVal.Salary;
          data.DOJ = this.insertVal.DOJ;
        }
      });
    } else {
      //insert
      if (this.insertVal.Id == 0) {
        this.insertVal.Id = AVENGERS.avengersArr.length + 1;
        AVENGERS.avengersArr.push(
          {
            Id:    this.insertVal.Id,
            Name:  this.insertVal.Name,
            Gender:this.insertVal.Gender,
            Salary: this.insertVal.Salary,
            DOJ:    this.insertVal.DOJ
          });
      }
    }
    this.clearRec();
  }

  updateRec(avg: any): void {
    this.logValues(avg);
    this.insertVal.Id = avg.Id;
    this.insertVal.Name = avg.Name;
    this.insertVal.Gender = avg.Gender;
    this.insertVal.Salary = avg.Salary;
    this.insertVal.DOJ = avg.DOJ;
  }
  deleteRec(avg: any): void {
    this.logValues(avg);
    for (let i = 0; i < AVENGERS.avengersArr.length; i++) {
      console.log(i);
      if (AVENGERS.avengersArr[i].Id == avg.Id) {
        AVENGERS.avengersArr.splice(i, 1);
      }
    }
  }
  clearRec(): void {
    this.insertVal.Id = 0;
    this.insertVal.Name = '';
    this.insertVal.Gender = 'Other';
    this.insertVal.Salary = 0.0;
    this.insertVal.DOJ = '';
  }
  onChange($event){
    console.log(this.insertVal.Gender);
  }
  private logValues(avg: any) {
    console.log(avg.Id);
    console.log(avg.Name);
    console.log(avg.Gender);
    console.log(avg.Salary);
    console.log(avg.DOJ);
  }
}
