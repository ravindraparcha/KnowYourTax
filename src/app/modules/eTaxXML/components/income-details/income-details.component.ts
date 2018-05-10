import {Component, OnInit} from '@angular/core';
import {IncomeDetailsModel} from '../../models/income-details.model';
import { Configuration } from '../../../../shared/constants';

@Component({
    selector: 'income-details',
    templateUrl: './income-details.component.html'
})

export class IncomeDetailsComponent  implements OnInit {

    public incomeDetailsModel : IncomeDetailsModel;
    constructor(private _configuration: Configuration) { }

    ngOnInit(){
        this.incomeDetailsModel = new IncomeDetailsModel();
        this.incomeDetailsModel.salaryPensionSum;
        this.incomeDetailsModel.selectedHousePropertyType;
        
    }

    calculateSalaryPensionSum() {        
        this.incomeDetailsModel.salaryPensionSum =  
        (isNaN(this.incomeDetailsModel.allowance) ? 0 :this.incomeDetailsModel.allowance)+ 
        (isNaN(this.incomeDetailsModel.deductionUS16) ? 0 :this.incomeDetailsModel.deductionUS16)+
        (isNaN(this.incomeDetailsModel.perquisites) ? 0 :this.incomeDetailsModel.perquisites)+ 
        (isNaN (this.incomeDetailsModel.profitLieuOfSalary) ? 0 :this.incomeDetailsModel.profitLieuOfSalary) + 
        (isNaN (this.incomeDetailsModel.salary)? 0 :this.incomeDetailsModel.salary);
        this.calculateGrossTotal();
    }

    calculateAnnualValue(){
        this.incomeDetailsModel.annualValue = 
        isNaN(this.incomeDetailsModel.rent)  ? 0 : this.incomeDetailsModel.rent-
        (isNaN(this.incomeDetailsModel.taxPaidToLocalAuthority) ? 0 :this.incomeDetailsModel.taxPaidToLocalAuthority);
        this.incomeDetailsModel.annualValuePercentageAmount= (this.incomeDetailsModel.annualValue * this._configuration.annualValuePercentage)/100; 
        
    }

    calculateIncomeChargeableUnderHouseProperty(){
        this.incomeDetailsModel.housePropertySum = 
        (isNaN(this.incomeDetailsModel.annualValue) ? 0 :this.incomeDetailsModel.annualValue) - 
        (isNaN(this.incomeDetailsModel.annualValuePercentageAmount) ? 0 :this.incomeDetailsModel.annualValuePercentageAmount)-
        (isNaN(this.incomeDetailsModel.interestOnBorrowedCapital) ? 0 : this.incomeDetailsModel.interestOnBorrowedCapital);
        this.calculateGrossTotal();
    }

    calculateGrossTotal() {         
        this.incomeDetailsModel.grossTotalIncome = this.incomeDetailsModel.salaryPensionSum + this.incomeDetailsModel.housePropertySum + (isNaN(this.incomeDetailsModel.incomeFromOtherSources) ? 0 : this.incomeDetailsModel.incomeFromOtherSources);
    }

    disableEnableHouseProperty(){
        if(this.incomeDetailsModel.selectedHousePropertyType=='S') {
            this.incomeDetailsModel.rent=0;
            this.incomeDetailsModel.taxPaidToLocalAuthority=0;
        }
        this.calculateAnnualValue();
    }
    onDeductionChange(event){
        debugger;
        const val = event.target.options[event.target.selectedIndex].getAttribute('data-dataType');

    }

     
}
