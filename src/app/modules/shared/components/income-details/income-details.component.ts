import { Component, OnInit, Input, ViewChild, Output, EventEmitter, OnDestroy } from '@angular/core';
import { IncomeDetailsModel } from '../../models/income-details.model';
import { ConfigurationService } from '../../services/configurationService';
import { DeductionsComponent } from '../deduction/deductions.components';
import { IncomeTaxModel, TaxComputationModel } from '../../models/deduction.model';
import { NgForm } from "@angular/forms";
import { ToastrService } from 'ngx-toastr';
import { SharedTaxService } from '../../services/sharedTaxService';
import { Subscription } from 'rxjs/Subscription';
declare var $: any;

@Component({
    selector: 'income-details',
    templateUrl: './income-details.component.html'
})

export class IncomeDetailsComponent implements OnInit, OnDestroy {

    @Input() isCalculator: string;

    public incomeDetailsModel: IncomeDetailsModel;
    incomeTaxModel: any;
    public advanceTaxAlreadyPaid;
    @ViewChild(DeductionsComponent) deductionsComponent: DeductionsComponent;
    //@Output() outputCalculateTax : EventEmitter<any> = new EventEmitter<any>();
    @Input()
    set advanceTaxPaid(advanceTaxModel: any[]) {
        this.advanceTaxAlreadyPaid = advanceTaxModel;
    }
    @Input() showAssessmentAdvanceTax: boolean;

    @Output() isIncomeDetailsComponentValid: EventEmitter<boolean> = new EventEmitter<boolean>();
    @ViewChild('incomeDetailsForm') form: NgForm;
    private _subscription: Subscription;
    private isTenantAdded: boolean;
    constructor(public _configuration: ConfigurationService, private _toastr: ToastrService, private _sharedTaxService: SharedTaxService) {
        this._subscription = this._sharedTaxService.getIsTenantAdded().subscribe(item => this.isTenantAdded = item);
    }

    // canDeactivate() {

    //     return true;
    //   }

    //private initialValue: any;

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
    ngOnDestroy() {
        this._subscription.unsubscribe();
    }


    public calculateSalaryPensionSum() {

        this.incomeDetailsModel.salaryPensionSum =
            (isNaN(parseInt(this.incomeDetailsModel.allowance)) ? 0 : parseInt(this.incomeDetailsModel.allowance)) -
            (isNaN(parseInt(this.incomeDetailsModel.deductionUS16)) ? 0 : parseInt(this.incomeDetailsModel.deductionUS16)) +
            (isNaN(parseInt(this.incomeDetailsModel.perquisites)) ? 0 : parseInt(this.incomeDetailsModel.perquisites)) +
            (isNaN(parseInt(this.incomeDetailsModel.profitLieuOfSalary)) ? 0 : parseInt(this.incomeDetailsModel.profitLieuOfSalary)) +
            (isNaN(parseInt(this.incomeDetailsModel.salary)) ? 0 : parseInt(this.incomeDetailsModel.salary));
        this.incomeDetailsModel.salaryPensionSum = Math.ceil(this.incomeDetailsModel.salaryPensionSum);
        this.calculateGrossTotal();
    }

    public calculateAnnualValue() {
        this.incomeDetailsModel.annualValue =
            isNaN(parseInt(this.incomeDetailsModel.rent)) ? 0 : parseInt(this.incomeDetailsModel.rent) -
                (isNaN(parseInt(this.incomeDetailsModel.taxPaidToLocalAuthority)) ? 0 : parseInt(this.incomeDetailsModel.taxPaidToLocalAuthority));
        this.incomeDetailsModel.annualValuePercentageAmount = (this.incomeDetailsModel.annualValue * this._configuration.annualValuePercentage) / 100;
        this.incomeDetailsModel.annualValuePercentageAmount = Math.ceil(this.incomeDetailsModel.annualValuePercentageAmount);
    }

    public calculateIncomeChargeableUnderHouseProperty() {
        this.incomeDetailsModel.housePropertySum =
            (isNaN(this.incomeDetailsModel.annualValue) ? 0 : this.incomeDetailsModel.annualValue) -
            (isNaN(this.incomeDetailsModel.annualValuePercentageAmount) ? 0 : this.incomeDetailsModel.annualValuePercentageAmount) -
            (isNaN(parseInt(this.incomeDetailsModel.interestOnBorrowedCapital)) ? 0 : parseInt(this.incomeDetailsModel.interestOnBorrowedCapital));
        this.incomeDetailsModel.housePropertySum = Math.ceil(this.incomeDetailsModel.housePropertySum);
        this.calculateGrossTotal();
    }
    public onChangeGrossTotalIncome() {
        this.calculateGrossTotal();
    }
    public calculateGrossTotal() {
        this.incomeDetailsModel.grossTotalIncome = this.incomeDetailsModel.salaryPensionSum + this.incomeDetailsModel.housePropertySum + (isNaN(parseInt(this.incomeDetailsModel.incomeFromOtherSources)) ? 0 : parseInt(this.incomeDetailsModel.incomeFromOtherSources));
        this.incomeDetailsModel.grossTotalIncome = Math.ceil(this.incomeDetailsModel.grossTotalIncome);
    }

    public disableEnableHouseProperty() {

        if (this.incomeDetailsModel.selectedHousePropertyType == 'S') {
            this.incomeDetailsModel.rent = '0';
            this.incomeDetailsModel.taxPaidToLocalAuthority = '0';
        }
        else if (this.incomeDetailsModel.selectedHousePropertyType == 'L' && this.isCalculator == 'false') {
            this._toastr.info('Make sure to fill 26QC details under tax details', 'Information', this._configuration.CustomToastOptions);
        }
        else if (this.incomeDetailsModel.selectedHousePropertyType == null) {
            this.incomeDetailsModel.rent = '0';
            this.incomeDetailsModel.taxPaidToLocalAuthority = '0';
            this.incomeDetailsModel.annualValue = 0;
            this.incomeDetailsModel.annualValuePercentageAmount = 0;
            this.incomeDetailsModel.interestOnBorrowedCapital = '0';
            this.incomeDetailsModel.housePropertySum = 0;
        }
        this.calculateAnnualValue();
    }
    public updateTotalDeductions(sum: number) {
        this.incomeDetailsModel.totalDeductionSum = sum;
    }

    public validateIncomeDetailsComponentForm() {
        let errorFound: boolean = false;
        if (this.incomeDetailsModel.selectedHousePropertyType == 'L' && this.isCalculator == 'false') {
            if (!this.isTenantAdded || this.isTenantAdded == undefined) {
                this.isIncomeDetailsComponentValid.emit(undefined);
                this._toastr.error('<b>Tax details Tab-</b>You have selected House Property type="Given on rent" in Income details tab. Make sure to add details under 26QC', 'Error', this._configuration.CustomToastOptions);
                errorFound = true;
            }
        }
        if (errorFound)
            return;

        if (this.form.valid)
            this.isIncomeDetailsComponentValid.emit(true);
        else
            this.isIncomeDetailsComponentValid.emit(false);
    }
}
