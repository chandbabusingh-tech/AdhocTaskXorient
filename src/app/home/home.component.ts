import { Component, OnInit } from '@angular/core';
import { NgbAlert } from '@ng-bootstrap/ng-bootstrap';
import { AvengersService } from '../service/home.service';
import { Avengers } from '../model/avengers';
import { Observable, Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
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
  public isValidFormsControlDOJ: boolean = true;  
  private success = new Subject<string>();
  public successMessage:string = '';
  private mode:string ='';
  constructor(
    private avengersService: AvengersService
  ) {
    this.insertVal = new Avengers(0, '', 'Other', 0.0, '');
  }

  ngOnInit(): void {
    this.success.subscribe(message => this.successMessage = message);
    this.success.pipe(
      debounceTime(5000)
    ).subscribe(() => this.successMessage = '');

    this.avengerData = this.avengersService.getAvengers();
    this.showMessage('Get Data Successfully');
    this.insertVal.DOJ = new Date();
  }
  
  public addRecord(): void {
    this.mode = 'Insert';
    if(this.validateAdd()){
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
      this.showMessage('Insert Data Successfully');
      this.clearRec();
    }
  }
  public updateRec(avg: any): void {
    this.mode = 'Update';
    if(this.validateUpdate(avg)){
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
      this.showMessage('Update Data Successfully');
      this.clearRec();
    }
  }
  public deleteRec(avg: any): void {
    for (let i = 0; i < AVENGERS.avengersArr.length; i++) {
      console.log(i);
      if (AVENGERS.avengersArr[i].Id == avg.Id) {
        AVENGERS.avengersArr.splice(i, 1);
      }
    }
    this.showMessage('Delete Data Successfully');
    this.clearRec();
  }
  private validateAdd(): boolean {
    const dateRegEx = new RegExp(/^\d{4}-\d{2}-\d{2}$/);
    let validationMsgName: string;
    let validationMsgSalary: string;
    let validationMsgDOJ: string;
      if(this.insertVal.Name){
        this.isValidFormsControlName = true;
      }else{this.isValidFormsControlName=false;validationMsgName='*Enter the Name. ';}
      if(this.insertVal.Salary){
        try{ parseInt(this.insertVal); this.isValidFormsControlSalary = true; }
        catch(error){console.error(error); this.isValidFormsControlSalary = false;validationMsgSalary='*Enter the valid Salary. ';}
      }else{
        this.isValidFormsControlSalary=false;validationMsgSalary='*Enter the Salary. ';
      }
      if(this.insertVal.DOJ){
        if(dateRegEx.test(this.insertVal.DOJ)) {          
          this.isValidFormsControlDOJ = true;
        }else{
          validationMsgDOJ = '*Enter the valid DOJ. ';
          this.isValidFormsControlDOJ = false;
        }
      }else{
        validationMsgDOJ = '*Enter the DOJ. ';
        this.isValidFormsControlDOJ = false;
      }
      if(this.isValidFormsControlName && this.isValidFormsControlSalary && this.isValidFormsControlDOJ){
        return true;
      }else{
        this.showMessage(`${validationMsgName ?? ''} - ${validationMsgSalary ?? ''} - ${validationMsgDOJ ?? ''}`);
        return false;
      }
  }
  private validateUpdate(avg :any): boolean{
    const dateRegEx = new RegExp(/^\d{4}-\d{2}-\d{2}$/);
    let validationMsgName: string;
    let validationMsgSalary: string;
    let validationMsgDOJ: string;
    let isValidFormsControlNameUpdate: boolean;
    let isValidFormsControlSalaryUpdate: boolean;
    let isValidFormsControlDOJUpdate: boolean;
      if(avg.Name){ isValidFormsControlNameUpdate=true; } else { isValidFormsControlNameUpdate=false; validationMsgName='*Enter the Name. '; }
      if(avg.Salary){
        try{ parseInt(avg.Salary); isValidFormsControlSalaryUpdate = true;}
        catch(error){console.error(error); isValidFormsControlSalaryUpdate =false; validationMsgSalary='*Enter the valid Salary. ';}
      }else{
        isValidFormsControlSalaryUpdate =false;
        validationMsgSalary='*Enter the Salary. ';
      }
      if(avg.DOJ){
        if(dateRegEx.test(avg.DOJ)) { 
          isValidFormsControlDOJUpdate=true; } 
        else {
          isValidFormsControlDOJUpdate=false;
          validationMsgDOJ = '*Enter the valid DOJ. ';
        }
      }else{
        isValidFormsControlDOJUpdate = false;
        validationMsgDOJ = '*Enter the DOJ. ';
      }
      if(isValidFormsControlNameUpdate && isValidFormsControlSalaryUpdate && isValidFormsControlDOJUpdate){
        return true;
      }else{
        this.showMessage(`${validationMsgName ?? ''} - ${validationMsgSalary ?? ''} - ${validationMsgDOJ ?? ''}`);
        return false;
      }
    
  }
  public clearRec(): void {
    this.insertVal.Id = 0;
    this.insertVal.Name = '';
    this.insertVal.Gender = 'Other';
    this.insertVal.Salary = 0.0;
    this.insertVal.DOJ = '';
    this.isValidFormsControlName = true;
    this.isValidFormsControlSalary = true;
    this.isValidFormsControlDOJ = true;
  }
  private showMessage(msg: string) {
    this.success.next(`${this.getDate(new Date(), 'dd - mm - yyyy hh : ii : ss')} - ${ msg }.`);
  }
  private getDate(date: Date, format: string) {
      let monthName = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
      let yyyy = date.getFullYear().toString();
      format = format.replace(/yyyy/g, yyyy)
      let mm = (date.getMonth()+1).toString(); 
      //format = format.replace(/mm/g, (mm[1]?mm:"0"+mm[0]));
      format = format.replace(/mm/g, (monthName[parseInt(mm) - 1]));
      let dd  = date.getDate().toString();
      format = format.replace(/dd/g, (dd[1]?dd:"0"+dd[0]));
      let hh = date.getHours().toString();
      format = format.replace(/hh/g, (hh[1]?hh:"0"+hh[0]));
      let ii = date.getMinutes().toString();
      format = format.replace(/ii/g, (ii[1]?ii:"0"+ii[0]));
      let ss  = date.getSeconds().toString();
      format = format.replace(/ss/g, (ss[1]?ss:"0"+ss[0]));
      return format;
  }
}
