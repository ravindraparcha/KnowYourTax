import { Component, OnInit, Input } from "@angular/core";

import { TaxCollectedDeductedModel, TaxDeductedSalaryModel, TaxDeductedOtherThanSalaryModel, TaxDeductedUnder26QCModel, AdvanceTaxSelfAssessmentTaxModel, TaxCollectedModel } from '../../models/tax-deducted-collected.model';

import { INgxMyDpOptions, IMyDateModel } from "ngx-mydatepicker";
import { Configuration } from '../../../../shared/constants';
import { SharedXMLService } from '../../shared/sharedXMLService';
import { SharedTaxService } from '../../shared/sharedTaxService';

declare var $: any;

@Component({
    selector: 'tax-deducted-collected',
    templateUrl: './tax-deducted-collected.component.html'
})

export class TaxDeductedCollectedComponent implements OnInit {
    public taxCollectedDeductedModel: TaxCollectedDeductedModel;
    public taxDeductedSalaryModels = [];
    private newTaxDeductedSalaryModel;

    public taxDeductedOtherThanSalaryModels = [];
    private newTaxDeductedOtherThanSalaryModel;

    public taxDeductedUnder26QCModels = [];
    private newTaxDeductedUnder26QCModel;

    public taxCollectionDeductionYearList = [];
    public taxDeductionTenantYearList = [];

    public advanceTaxSelfAssessmentTaxModels = [];
    private newAdvanceTaxSelfAssessmentTaxModel;

    public taxCollectedModels = [];
    private newTaxCollectedModel;

    public taxTypeList = [];

    constructor(private _configuration: Configuration, private _sharedXMLService: SharedXMLService, private _sharedTaxService: SharedTaxService) { }

    myOptions: INgxMyDpOptions = {
        dateFormat: this._configuration.dateTimeFormat
    };

    @Input()
    set taxDeducted(taxDeductedModels: TaxDeductedSalaryModel[]) {
        if (taxDeductedModels != undefined) {
            for (let i = 0; i < taxDeductedModels.length; i++)
                this.taxDeductedSalaryModels.push(taxDeductedModels[i]);
        }
    }
    ngOnInit() {
        $('.panel-collapse').on('show.bs.collapse', function () {
            $(this).siblings('.panel-heading-custom').addClass('active');
        });

        $('.panel-collapse').on('hide.bs.collapse', function () {
            $(this).siblings('.panel-heading-custom').removeClass('active');
        });
        this.taxCollectionDeductionYearList = this.getTaxCollectionDeductionYearList();
        let previousYear = new Date(new Date().getFullYear() - 1, 0, 1).getFullYear();
        this.taxDeductionTenantYearList = [{ "key": previousYear, "value": previousYear }];

        this.taxCollectedDeductedModel = new TaxCollectedDeductedModel();
        this.taxCollectedDeductedModel.taxCollectedModels = [];
        this.taxCollectedDeductedModel.taxDeductedSalaryModels = [];
        this.taxCollectedDeductedModel.taxDeductedOtherThanSalaryModels = [];
        this.taxCollectedDeductedModel.taxDeductedUnder26QCModels = [];
        this.taxCollectedDeductedModel.advanceTaxSelfAssessmentTaxModels = [];

        this.taxTypeList=[{'value':'SelfAssessmentTax', 'text':'Self Assessment Tax'},{'value':'AdvanceTax','text':'Advance Tax'}];        
    }
    private getTaxCollectionDeductionYearList() {
        let previousYear = new Date(new Date().getFullYear() - 1, 0, 1).getFullYear();
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
        this.taxCollectedDeductedModel.taxDeductedSalaryModels = this.taxDeductedSalaryModels;
        this.calculateTaxDeductedAmount();
    }
    deleteTaxDeductedSalaryItem(index: number) {
        
        this.deleteItemFromArray(this.taxDeductedSalaryModels, index);
        this.calculateTaxDeductedAmount();
    }
    private calculateTaxDeductedAmount() {
        let tdsSum = 0;
        for (let taxDeductedSalaryModel of this.taxCollectedDeductedModel.taxDeductedSalaryModels)
            tdsSum += taxDeductedSalaryModel.taxDeducted;
        for (let taxDeductedOtherThanSalaryModel of this.taxCollectedDeductedModel.taxDeductedOtherThanSalaryModels)
            tdsSum += taxDeductedOtherThanSalaryModel.taxDeducted;
        for (let taxDeductedUnder26QCModel of this.taxCollectedDeductedModel.taxDeductedUnder26QCModels)
            tdsSum += taxDeductedUnder26QCModel.taxDeducted;

        this._sharedTaxService.changeTDSAmount(tdsSum);
    }
    onSubmit() {
        console.log(this.taxDeductedSalaryModels);
        console.log(this.taxDeductedOtherThanSalaryModels);
        console.log(this.taxDeductedUnder26QCModels);
        console.log(this.advanceTaxSelfAssessmentTaxModels);
        console.log(this.taxCollectedModels);
    }

    addNewTaxDeductedOtherThanSalary() {
        this.newTaxDeductedOtherThanSalaryModel = new TaxDeductedOtherThanSalaryModel("", "", 0, 0, 0)
        this.taxDeductedOtherThanSalaryModels.push(this.newTaxDeductedOtherThanSalaryModel);
        this.taxCollectedDeductedModel.taxDeductedOtherThanSalaryModels = this.taxDeductedOtherThanSalaryModels;        
    }
    deleteTaxDeductedOtherThanSalaryItem(index: number) {
        this.deleteItemFromArray(this.taxDeductedOtherThanSalaryModels, index);
        this.calculateTaxDeductedAmount();
    }
     
    addNewTaxDeductedUnder26QC() {
        this.newTaxDeductedUnder26QCModel = new TaxDeductedUnder26QCModel("", "", 0, 0, 0);
        this.taxDeductedUnder26QCModels.push(this.newTaxDeductedUnder26QCModel);
        this.taxCollectedDeductedModel.taxDeductedUnder26QCModels = this.taxDeductedUnder26QCModels;         
    }
    deleteTaxDeductedUnder26QCItem(index: number) {
        this.deleteItemFromArray(this.taxDeductedUnder26QCModels, index);
        this.calculateTaxDeductedAmount();
    }
     
    addNewAdvanceTaxSelfAssessmentTax() {
        this.newAdvanceTaxSelfAssessmentTaxModel = new AdvanceTaxSelfAssessmentTaxModel("", "", 0, "");
        this.advanceTaxSelfAssessmentTaxModels.push(this.newAdvanceTaxSelfAssessmentTaxModel);
        this.taxCollectedDeductedModel.advanceTaxSelfAssessmentTaxModels = this.advanceTaxSelfAssessmentTaxModels;
    }
    deleteAdvanceTaxSelfAssessmentTaxItem(index: number) {
        this.deleteItemFromArray(this.advanceTaxSelfAssessmentTaxModels, index);
        this.calculateAdvanceTaxSelfAssessmentTax();        
    }
    public calculateAdvanceTaxSelfAssessmentTax() {
        let advanceTaxSum = 0;
        let selfAssessmentSum=0;
        for (let advanceTaxSelfAssessmentTaxModel of this.taxCollectedDeductedModel.advanceTaxSelfAssessmentTaxModels) {
            if(advanceTaxSelfAssessmentTaxModel.selectedTaxType=="SelfAssessmentTax")
                selfAssessmentSum += advanceTaxSelfAssessmentTaxModel.taxPaid;
            else if(advanceTaxSelfAssessmentTaxModel.selectedTaxType=="AdvanceTax")
                advanceTaxSum+= advanceTaxSelfAssessmentTaxModel.taxPaid;
        }
        this._sharedTaxService.changeAdvanceTaxAmount(advanceTaxSum);
        this._sharedTaxService.changeSelfAssessmentAmount(selfAssessmentSum);
        this._sharedTaxService.changeSelfAssessmentAdvanceTax(this.taxCollectedDeductedModel.advanceTaxSelfAssessmentTaxModels);
    }

    addNewTaxCollection() {
        this.newTaxCollectedModel = new TaxCollectedModel("", "", 0, 0);
        this.taxCollectedModels.push(this.newTaxCollectedModel);
        this.taxCollectedDeductedModel.taxCollectedModels = this.taxCollectedModels;
    }

    deleteTaxCollectionItem(index: number) {
        this.deleteItemFromArray(this.taxCollectedModels, index);
    }

    private calculateTaxCollection() {
        let sum = 0;
        for (let taxCollectedModel of this.taxCollectedDeductedModel.taxCollectedModels)
            sum += taxCollectedModel.taxCollected;
        this._sharedTaxService.changeTCSAmount(sum);
    }
    deleteItemFromArray(itemArray: any[], index: number) {
        itemArray.splice(index, 1);
    }
    onDepositDateChanged(event: IMyDateModel) {
        if (event.date.day != 0) {
            this.newAdvanceTaxSelfAssessmentTaxModel.depositDate = event.date.day + "/" + event.date.month + "/" + event.date.year;
            this.newAdvanceTaxSelfAssessmentTaxModel.depositDateXml = this._sharedXMLService.formatDate(event.date.day, event.date.month, event.date.year, "yyyy-mm-dd", "-");
        }
        else {
            this.newAdvanceTaxSelfAssessmentTaxModel.depositDate = "";
            this.newAdvanceTaxSelfAssessmentTaxModel.depositDateXml = "";
        }
    }
}