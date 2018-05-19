import { Component, OnInit } from "@angular/core";

import { TaxDeductedSalaryModel } from '../../models/tax-deducted-salary.Model';
import { TaxDeductedOtherThanSalaryModel } from '../../models/tax-deducted-other-than-salary.model';
import { TaxDeductedUnder26QCModel } from '../../models/tax-deducted-under-26QC.model';
import { AdvanceTaxSelfAssessmentTaxModel } from '../../models/advanceTax-selfAssessmentTax.model';
import { INgxMyDpOptions, IMyDateModel } from "ngx-mydatepicker";
import { Configuration } from '../../../../shared/constants';

declare var $: any;

@Component({
    selector: 'tax-deducted',
    templateUrl: './tax-deducted.component.html'
})

export class TaxDeductedComponent implements OnInit {
    public taxDeductedSalaryModels = [];
    public newTaxDeductedSalaryModel;

    public taxDeductedOtherThanSalaryModels = [];
    public newTaxDeductedOtherThanSalaryModel;

    public taxDeductedUnder26QCModels = [];
    public newTaxDeductedUnder26QCModel;

    public otherThanSalaryYearList = [];
    public taxDeductionTenantYearList = [];

    public advanceTaxSelfAssessmentTaxModels = [];
    public newAdvanceTaxSelfAssessmentTaxModel;

    constructor(private _configuration: Configuration){}

    myOptions: INgxMyDpOptions = {
        dateFormat: this._configuration.dateTimeFormat    
    };

    ngOnInit() {
        $('.panel-collapse').on('show.bs.collapse', function () {
            $(this).siblings('.panel-heading-custom').addClass('active');
        });

        $('.panel-collapse').on('hide.bs.collapse', function () {
            $(this).siblings('.panel-heading-custom').removeClass('active');
        });
        this.otherThanSalaryYearList = this.getTaxDeductionYearList();
        let previousYear = new Date(new Date().getFullYear() - 1, 0, 1).getFullYear();
        this.taxDeductionTenantYearList = [{ "key": previousYear, "value": previousYear }];
    }    
    private getTaxDeductionYearList() {        
        let previousYear = new Date( new Date().getFullYear()-1,0,1).getFullYear();
        let startYear = 2001;
        let startDate = new Date(startYear, 0, 1);
        let keyValuePair = [];
        let intermediateDate;

        let index = 0;
        while (true) {
            intermediateDate = new Date(startDate.getFullYear() + index, 0, 1);
            keyValuePair.push({ "key": intermediateDate.getFullYear(), "value": intermediateDate.getFullYear() });
            if (previousYear == intermediateDate.getFullYear())
                break;
            index += 1;
        }
        return keyValuePair.reverse();
    }

    addNewTaxDeductedSalary() {
        this.newTaxDeductedSalaryModel = new TaxDeductedSalaryModel("", "", "", 0, 0);
        this.taxDeductedSalaryModels.push(this.newTaxDeductedSalaryModel);
    }
    deleteTaxDeductedSalaryItem(index: number) {
        this.deleteItemFromArray(this.taxDeductedSalaryModels, index)
    }
    onSubmit() {
        console.log(this.taxDeductedSalaryModels);
        console.log(this.taxDeductedOtherThanSalaryModels);
        console.log(this.taxDeductedUnder26QCModels);
        console.log(this.advanceTaxSelfAssessmentTaxModels);
    }

    addNewTaxDeductedOtherThanSalary() {
        this.newTaxDeductedOtherThanSalaryModel = new TaxDeductedOtherThanSalaryModel("", "", 0, 0, 0)
        this.taxDeductedOtherThanSalaryModels.push(this.newTaxDeductedOtherThanSalaryModel);
    }
    deleteTaxDeductedOtherThanSalaryItem(index: number) {
        this.deleteItemFromArray(this.taxDeductedOtherThanSalaryModels, index);
    }

    addNewTaxDeductedUnder26QC() {
        this.newTaxDeductedUnder26QCModel = new TaxDeductedUnder26QCModel("", "", 0, 0, 0);
        this.taxDeductedUnder26QCModels.push(this.newTaxDeductedUnder26QCModel);
    }
    deleteTaxDeductedUnder26QCItem(index: number) {
        this.deleteItemFromArray(this.taxDeductedUnder26QCModels, index);
    }

    addNewAdvanceTaxSelfAssessmentTax() {
        this.newAdvanceTaxSelfAssessmentTaxModel = new AdvanceTaxSelfAssessmentTaxModel("", "", 0,"");
        this.advanceTaxSelfAssessmentTaxModels.push(this.newAdvanceTaxSelfAssessmentTaxModel);
    }
    deleteAdvanceTaxSelfAssessmentTaxItem(index: number) {
        this.deleteItemFromArray(this.advanceTaxSelfAssessmentTaxModels, index);
    }

    deleteItemFromArray(itemArray: any[], index: number) {
        itemArray.splice(index, 1);
    }
    onDepositDateChanged(event: IMyDateModel){  
        debugger;     
        if (event.date.day != 0)
        this.newAdvanceTaxSelfAssessmentTaxModel.depositDate = event.date.day + "/" + event.date.month + "/" + event.date.year;
    else
        this.newAdvanceTaxSelfAssessmentTaxModel.depositDate = "";
    }
}