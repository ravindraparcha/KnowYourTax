import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { IncomeDetailsModel } from '../../models/income-details.model';
import { ConfigurationService } from '../../services/ConfigurationService';
import { DeductionsComponent } from '../deduction/deductions.components';
import { IncomeTaxModel, TaxComputationModel } from '../../models/deduction.model';
import {NgForm} from "@angular/forms";

declare var $: any;

@Component({
    selector: 'income-details',
    templateUrl: './income-details.component.html'
})

export class IncomeDetailsComponent implements OnInit {

    public incomeDetailsModel: IncomeDetailsModel;
    incomeTaxModel: any;
    constructor(public _configuration: ConfigurationService) { }
    public advanceTaxAlreadyPaid;
    @ViewChild(DeductionsComponent) deductionsComponent: DeductionsComponent;
    //@Output() outputCalculateTax : EventEmitter<any> = new EventEmitter<any>();
    @Input()
    set advanceTaxPaid(advanceTaxModel: any[]) {
        this.advanceTaxAlreadyPaid = advanceTaxModel;
    }
    @Input() showAssessmentAdvanceTax: boolean;

    @Output() isIncomeDetailsComponentValid: EventEmitter<boolean> = new EventEmitter<boolean>();
    @ViewChild('incomeDetailsForm') form : NgForm;

    // canDeactivate() {
         
    //     return true;
    //   }

    private initialValue:any;
    ngOnInit() {
        this.incomeDetailsModel = new IncomeDetailsModel();
        $('.panel-collapse').on('show.bs.collapse', function () {
            $(this).siblings('.panel-heading-custom').addClass('active');
        });

        $('.panel-collapse').on('hide.bs.collapse', function () {
            $(this).siblings('.panel-heading-custom').removeClass('active');
        });
        this.incomeTaxModel = new IncomeTaxModel();
        this.incomeTaxModel.userTaxModel = [];
        this.incomeTaxModel.systemTaxModel = [];
        this.incomeTaxModel.taxComputationModel = new TaxComputationModel();

        //this.initialValue = this.form;        
        // this.form.valueChanges.subscribe((value: any) => {
        //     if (this.initialValue!==this.form) {
        //         console.log('template form dirty - yes: ', value);
        //     } else {
        //         console.log('template form dirty - no: ');
        //     }

        //     // if (this.form.dirty && !this.form.pristine) {
        //     //     console.log('template form dirty - yes: ', value);
        //     // } else {
        //     //     console.log('template form dirty - no: ');
        //     // }
        // });
    }
     
    calculateSalaryPensionSum() {
        this.incomeDetailsModel.salaryPensionSum =
            (isNaN(this.incomeDetailsModel.allowance) ? 0 : this.incomeDetailsModel.allowance) -
            (isNaN(this.incomeDetailsModel.deductionUS16) ? 0 : this.incomeDetailsModel.deductionUS16) +
            (isNaN(this.incomeDetailsModel.perquisites) ? 0 : this.incomeDetailsModel.perquisites) +
            (isNaN(this.incomeDetailsModel.profitLieuOfSalary) ? 0 : this.incomeDetailsModel.profitLieuOfSalary) +
            (isNaN(this.incomeDetailsModel.salary) ? 0 : this.incomeDetailsModel.salary);
        this.calculateGrossTotal();
    }

    calculateAnnualValue() {
        this.incomeDetailsModel.annualValue =
            isNaN(this.incomeDetailsModel.rent) ? 0 : this.incomeDetailsModel.rent -
                (isNaN(this.incomeDetailsModel.taxPaidToLocalAuthority) ? 0 : this.incomeDetailsModel.taxPaidToLocalAuthority);
        this.incomeDetailsModel.annualValuePercentageAmount = (this.incomeDetailsModel.annualValue * this._configuration.annualValuePercentage) / 100;       
    }

    calculateIncomeChargeableUnderHouseProperty() {
        this.incomeDetailsModel.housePropertySum =
            (isNaN(this.incomeDetailsModel.annualValue) ? 0 : this.incomeDetailsModel.annualValue) -
            (isNaN(this.incomeDetailsModel.annualValuePercentageAmount) ? 0 : this.incomeDetailsModel.annualValuePercentageAmount) -
            (isNaN(this.incomeDetailsModel.interestOnBorrowedCapital) ? 0 : this.incomeDetailsModel.interestOnBorrowedCapital);
        this.calculateGrossTotal();
    }
    onChangeGrossTotalIncome() {
        this.calculateGrossTotal();
    }
    calculateGrossTotal() {
        this.incomeDetailsModel.grossTotalIncome = this.incomeDetailsModel.salaryPensionSum + this.incomeDetailsModel.housePropertySum + (isNaN(this.incomeDetailsModel.incomeFromOtherSources) ? 0 : this.incomeDetailsModel.incomeFromOtherSources);        
    }

    disableEnableHouseProperty() {
         
        if (this.incomeDetailsModel.selectedHousePropertyType == 'S') {
            this.incomeDetailsModel.rent = 0;
            this.incomeDetailsModel.taxPaidToLocalAuthority = 0;
        }
        else if(this.incomeDetailsModel.selectedHousePropertyType==null) {
            this.incomeDetailsModel.rent=0;
            this.incomeDetailsModel.taxPaidToLocalAuthority=0;
            this.incomeDetailsModel.annualValue=0;
            this.incomeDetailsModel.annualValuePercentageAmount=0;
            this.incomeDetailsModel.interestOnBorrowedCapital=0;    
            this.incomeDetailsModel.housePropertySum=0;
        }
           
        this.calculateAnnualValue();
    }
    updateTotalDeductions(sum: number) {
        this.incomeDetailsModel.totalDeductionSum = sum;
    }
 
    public validateIncomeDetailsComponentForm() {       
        if (this.form.valid)  
            this.isIncomeDetailsComponentValid.emit(true);
        else 
            this.isIncomeDetailsComponentValid.emit(false);         
    }    
}
