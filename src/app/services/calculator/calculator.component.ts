import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { CalculatorModel,CalculatorInputs,Section, SectionValue  } from "../../models/calculatorModel";
import  {AssessmentYearsModel} from '../../models/assessmentYearsModel';
import {CalculatorDataService} from '../../dataServices/calculator.dataservice';

 @Component({
    selector:'calculator',
    templateUrl:'./calculator.component.html'    
    
})
export class CalculatorComponent implements OnInit {    
    public calcModel : CalculatorModel;
    public values: any;
    public assessmentYearsModels : AssessmentYearsModel[];
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
        this._calcService.getAssessmentYears<any[]>()
            .subscribe((data: any[] )=> this.calcModel.AssessmentYearsModels= data,
            error => () => {
                //this._toasterService.pop('error', 'Damn', 'Something went wrong...');
                alert('érror');
            },
            () => {
                //this._toasterService.pop('success', 'Complete', 'Getting all values complete');
                //this._slimLoadingBarService.complete();
                // debugger;
                // var a = this.calcModel.AssessmentYearsModels;
                 
            });

     } 
    calculateGrossSalary() : void{
        this.calcModel.GrossTaxableSalary =(isNaN(this.calcModel.SalaryIncome) ? 0 : this.calcModel.SalaryIncome) + (isNaN(this.calcModel.OtherSourceIncome) ? 0 : this.calcModel.OtherSourceIncome);
    }

    calculateTax(model: any,isValid:boolean) : void{    
        debugger;     
        let calculatorInputs=new CalculatorInputs();
        calculatorInputs.assessmentYearId = model.assessmentYearId;
        calculatorInputs.Category =  model.Category;
        calculatorInputs.OtherSourceIncome = model.OtherSourceIncome;
        calculatorInputs.SalaryIncome = model.SalaryIncome;

        calculatorInputs.SectionValues=[];
        calculatorInputs.SectionValues.push( new SectionValue("80C",model.Section80C));
        calculatorInputs.SectionValues.push( new SectionValue("80D",model.Section80D));
        calculatorInputs.SectionValues.push( new SectionValue("24",model.Section24));
        calculatorInputs.SectionValues.push( new SectionValue("TTA",model.SectionTTA));
        calculatorInputs.SectionValues.push( new SectionValue("80G",model.Section80G));
        calculatorInputs.SectionValues.push( new SectionValue("80E",model.Section80E));

        console.log(model);
    }
    
    onCategoryChange(categoryId:string,assessmentYearId:number){
        let category =parseInt(categoryId.substr(categoryId.indexOf( ":")+1).trim());         
        this._calcService
        .getSections<Section[]>(assessmentYearId,category)
        .subscribe((data: Section[]) => this.calcModel.Sections = data,
        error => () => {
            //this._toasterService.pop('error', 'Damn', 'Something went wrong...');
            alert('érror');
        },
        () => {
       
            //this._toasterService.pop('success', 'Complete', 'Getting all values complete');
            //this._slimLoadingBarService.complete();            
            console.log(JSON.stringify( this.calcModel.Sections[0]));
            
        });

    }
         
}