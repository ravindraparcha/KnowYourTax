import {Component, OnInit} from '@angular/core';
import {IncomeDetailsModel} from '../models/incomeDetails.model';
import { Configuration } from '../../../shared/constants';

@Component({
    selector: 'income-details',
    templateUrl: './incomeDetails.component.html'
})

export class IncomeDetailsComponent  implements OnInit {

    public incomeDetailsModel : IncomeDetailsModel;
    constructor(private _configuration: Configuration) { }

    ngOnInit(){
        this.incomeDetailsModel = new IncomeDetailsModel();
        this.incomeDetailsModel.salaryPensionSum;
        this.incomeDetailsModel.selectedHousePropertyType="0";
        
    }

    updateSalaryPensionSum() {
        
        this.incomeDetailsModel.salaryPensionSum =  
         (this.incomeDetailsModel.allowance ==undefined ? 0 :this.incomeDetailsModel.allowance)+ 
         (this.incomeDetailsModel.deductionUS16 ==undefined ? 0 :this.incomeDetailsModel.deductionUS16)+
        (this.incomeDetailsModel.perquisites ==undefined ? 0 :this.incomeDetailsModel.perquisites)+ 
         (this.incomeDetailsModel.profitLieuOfSalary ==undefined ? 0 :this.incomeDetailsModel.profitLieuOfSalary) + 
         (this.incomeDetailsModel.salary ==undefined ? 0 :this.incomeDetailsModel.salary);
    }
}
