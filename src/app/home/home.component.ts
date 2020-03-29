import { Component, OnInit } from '@angular/core';
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
  public isValidFormsControlName: boolean = true;
  public isValidFormsControlSalary: boolean = true;
  constructor(
    private avengersService: AvengersService
  ) {
    this.insertVal = new Avengers(0, '', 'Other', 0, '');
  }

  ngOnInit(): void {
    this.avengerData = this.avengersService.getAvengers();
    this.insertVal.DOJ = new Date();
  }
  validate(): boolean {
    if(this.insertVal.Name){
      this.isValidFormsControlName = true;
    }else{this.isValidFormsControlName=false;}
    if(this.insertVal.Salary){
      try{parseFloat(this.insertVal.Salary);this.isValidFormsControlSalary = true;}
      catch(error){console.error(error); this.isValidFormsControlSalary = false;}
    }else{
      this.isValidFormsControlSalary=false;
    }
    if(this.isValidFormsControlName && this.isValidFormsControlSalary){
      return true;
    }else{
      return false;
    }
  }
  addRecord(): void {
    if(this.validate()){
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
      this.clearRec();
    }
  }
  updateRec(avg: any): void {
    this.logValues(avg);
    if(this.validate()){
      if (this.insertVal.Id > 0) {
        AVENGERS.avengersArr.forEach(data => {
          if ((data.Id == avg.Id)) {
            data.Id = avg.Id;
            data.Name = avg.Name;
            data.Gender = avg.Gender;
            data.Salary = avg.Salary;
            data.DOJ = avg.DOJ;
          }
        });
      }
      this.clearRec();
    }
  }
  deleteRec(avg: any): void {
    this.logValues(avg);
    for (let i = 0; i < AVENGERS.avengersArr.length; i++) {
      console.log(i);
      if (AVENGERS.avengersArr[i].Id == avg.Id) {
        AVENGERS.avengersArr.splice(i, 1);
      }
    }
    this.clearRec();
  }
  clearRec(): void {
    this.insertVal.Id = 0;
    this.insertVal.Name = '';
    this.insertVal.Gender = 'Other';
    this.insertVal.Salary = 0;
    this.insertVal.DOJ = '';
    this.isValidFormsControlName = true;
    this.isValidFormsControlSalary = true;
  }
  private logValues(avg: any) {
    console.log(avg.Id);
    console.log(avg.Name);
    console.log(avg.Gender);
    console.log(avg.Salary);
    console.log(avg.DOJ);
  }
}
