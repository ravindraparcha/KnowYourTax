import { Component, OnInit } from "@angular/core";

import {TaxDeductedSalaryModel} from '../../models/tax-deducted-salary.Model';
import {TaxDeductedOtherThanSalaryModel } from '../../models/tax-deducted-other-than-salary.model';
import { Configuration } from '../../../../shared/constants';
declare var $: any;

@Component({
    selector : 'tax-deducted',
    templateUrl:'./tax-deducted.component.html'
})

export class TaxDeductedComponent implements OnInit {
    public taxDeductedSalaryModels = [];
    public newTaxDeductedSalaryModel;

    public taxDeductedOtherThanSalaryModels =[];
    public newTaxDeductedOtherThanSalaryModel;   
    public yearList=[]; 

    constructor(private _configuration : Configuration){}

    ngOnInit(){
        $('.panel-collapse').on('show.bs.collapse', function () {
            $(this).siblings('.panel-heading-custom').addClass('active');
          });
        
          $('.panel-collapse').on('hide.bs.collapse', function () {
            $(this).siblings('.panel-heading-custom').removeClass('active');
          });        
          this.yearList=this._configuration.taxDeductionYearList();
    }

    addNewTaxDeductedSalary(){
        this.newTaxDeductedSalaryModel= new  TaxDeductedSalaryModel("","","",0,0,0);
        this.taxDeductedSalaryModels.push(this.newTaxDeductedSalaryModel);      
    }
    deleteTaxDeductedSalary(index) {
        this.taxDeductedSalaryModels.splice(index,1);
    } 
    onSubmit(){
        console.log(this.taxDeductedSalaryModels);
    }

    addNewTaxDeductedOtherThanSalary(){         
        this.newTaxDeductedOtherThanSalaryModel = new TaxDeductedOtherThanSalaryModel("","",0,0,0)
        this.taxDeductedOtherThanSalaryModels.push(this.newTaxDeductedOtherThanSalaryModel);
    }
    deleteTaxDeductedOtherThanSalary(index){
        this.taxDeductedOtherThanSalaryModels.splice(index,1);
    }
}