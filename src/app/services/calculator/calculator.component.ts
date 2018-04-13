import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { CalculatorModel  } from "../../models/calculatorModel";
import {CalculatorDataService} from '../../dataServices/calculator.dataservice';
@Component({
    selector:'calculator',
    templateUrl:'./calculator.component.html'    
    
})
export class CalculatorComponent implements OnInit {    
    public calcModel : CalculatorModel;
    public values: any;
    constructor(private _calcService: CalculatorDataService){}     
    
    CategoryList = [
        {"CategoryId" :1, "CategoryName" : "Male", selected:true},
        {"CategoryId" :2,  "CategoryName": "Female"},
        {"CategoryId" :3,  "CategoryName" : "Senior Citizen or > 60 years"},
        {"CategoryId" :4,  "CategoryName" : "Super Senior Citizen or > 80 years"}
    ];   
    AssessmentYrList = [
        {"YearId":1,"Year":"2018-2019"}
    ];
    ngOnInit(){
        this.calcModel = new CalculatorModel();            

        this._calcService
            .getAll<any[]>()
            .subscribe((data: any[]) => this.values = data,
            error => () => {
                //this._toasterService.pop('error', 'Damn', 'Something went wrong...');
                alert('érror');
            },
            () => {
                //this._toasterService.pop('success', 'Complete', 'Getting all values complete');
                //this._slimLoadingBarService.complete();
                 
            });
    }   

    calculateGrossSalary() : void{
        this.calcModel.GrossTaxableSalary =(isNaN(this.calcModel.SalaryIncome) ? 0 : this.calcModel.SalaryIncome) + (isNaN(this.calcModel.OtherSourceIncome) ? 0 : this.calcModel.OtherSourceIncome);
    }

    calculateTax(model: CalculatorModel,isValid:boolean) : void{         
        
        console.log(model);
    }
    
    onCategoryChange(categoryId:string,assessmentYearId:number){
        var category =parseInt(categoryId.substr(categoryId.indexOf( ":")+1).trim());
         debugger;
        this._calcService
        .getAssessmentYearData<any[]>(assessmentYearId,category)
        .subscribe((data: any[]) => this.values = data,
        error => () => {
            //this._toasterService.pop('error', 'Damn', 'Something went wrong...');
            alert('érror');
        },
        () => {
            //this._toasterService.pop('success', 'Complete', 'Getting all values complete');
            //this._slimLoadingBarService.complete();
            debugger;
            var a= this.values;
        });

    }
        
}