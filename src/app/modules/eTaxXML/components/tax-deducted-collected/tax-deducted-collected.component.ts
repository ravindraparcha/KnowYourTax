import { Component, OnInit, Input, ChangeDetectorRef, ViewChild, Output, EventEmitter } from "@angular/core";

import { TaxCollectedDeductedModel, TaxDeductedSalaryModel, TaxDeductedOtherThanSalaryModel, TaxDeductedUnder26QCModel, AdvanceTaxSelfAssessmentTaxModel, TaxCollectedModel } from '../../models/tax-deducted-collected.model';
 
import { SharedTaxService } from  '../../../shared/services/sharedTaxService';
import { ToastrService } from 'ngx-toastr';
import {Subscription} from 'rxjs';
import { ConfigurationService } from "../../../shared/services/ConfigurationService";

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
     
    public taxCollectedModels = [];
    private newTaxCollectedModel;

    private usrPanNo:string;
    private spousePanNo:string;
    private _subscription : Subscription;

    @Output() isTaxDeductedCollectedComponentValid: EventEmitter<boolean> = new EventEmitter<boolean>();
    @ViewChild('taxDeductedCollectedFrm') taxDeductedCollectedFrm;
    constructor(private cd: ChangeDetectorRef, private _sharedTaxService: SharedTaxService,private _toastr:ToastrService, private _configuration : ConfigurationService) { 
        this._subscription = this._sharedTaxService.getUserPANNumber().subscribe(item => this.usrPanNo = item);
        this._subscription = this._sharedTaxService.getSpousePANNumber().subscribe(item => this.spousePanNo = item);
    }

    @Input()
    set taxDeducted(taxDeductedModels: TaxDeductedSalaryModel[]) {
        this.taxDeductedSalaryModels=[];
        if (taxDeductedModels != undefined) {
            for (let i = 0; i < taxDeductedModels.length; i++)
                this.taxDeductedSalaryModels.push(taxDeductedModels[i]);
            this.taxCollectedDeductedModel.taxDeductedSalaryModels =this.taxDeductedSalaryModels;
        }
        
    }
     
    public getAdvanceTaxSelfAssessmentTaxModelOutput(output: AdvanceTaxSelfAssessmentTaxModel[]) {
        this.taxCollectedDeductedModel.advanceTaxSelfAssessmentTaxModels  = output;
    }

    ngAfterViewInit() {
        this.cd.detectChanges();
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
        for (let taxDeductedOtherThanSalaryModel of this.taxCollectedDeductedModel.taxDeductedOtherThanSalaryModels) {
            if(taxDeductedOtherThanSalaryModel.selectedOtherThanSalaryYear==null)
                continue;
            tdsSum += taxDeductedOtherThanSalaryModel.amountClaimedThisYear;
        }
        for (let taxDeductedUnder26QCModel of this.taxCollectedDeductedModel.taxDeductedUnder26QCModels) {
            if(taxDeductedUnder26QCModel.selectedTenantDeductionYear==null)
                continue;
            tdsSum += taxDeductedUnder26QCModel.amountClaimedThisYear;
        }
        this._sharedTaxService.changeTDSAmount(tdsSum);
    }
    onSubmit() {
        console.log(this.taxDeductedSalaryModels);
        console.log(this.taxDeductedOtherThanSalaryModels);
        console.log(this.taxDeductedUnder26QCModels);
        console.log(this.taxCollectedDeductedModel.advanceTaxSelfAssessmentTaxModels );
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
        this.updatePANList();
    }
    deleteTaxDeductedUnder26QCItem(index: number) {
        this.deleteItemFromArray(this.taxDeductedUnder26QCModels, index);
        this.calculateTaxDeductedAmount();
        this.updatePANList();
    }

    private updatePANList() {
        let panNumberList:string[]=[]; 
        for(let i=0;i<this.taxDeductedUnder26QCModels.length;i++) {
            panNumberList.push(this.taxDeductedUnder26QCModels[i].PAN);
        }
        this._sharedTaxService.changeTenantPANNumberList(panNumberList);
    }
      
    addNewTaxCollection() {
        this.newTaxCollectedModel = new TaxCollectedModel("", "", 0, 0);
        this.taxCollectedModels.push(this.newTaxCollectedModel);
        this.taxCollectedDeductedModel.taxCollectedModels = this.taxCollectedModels;
    }

    deleteTaxCollectionItem(index: number) {
        this.deleteItemFromArray(this.taxCollectedModels, index);
        this.calculateTaxCollection();
    }

    private calculateTaxCollection() {
        let sum = 0;
        for (let taxCollectedModel of this.taxCollectedDeductedModel.taxCollectedModels) {
            if(taxCollectedModel.selectedTaxCollectionYear==0)
                continue;
            sum += taxCollectedModel.amountClaimedThisYear;
        }
        this._sharedTaxService.changeTCSAmount(sum);
    }
    deleteItemFromArray(itemArray: any[], index: number) {
        itemArray.splice(index, 1);
    }
    
    public validateTaxDeductedCollectedComponentForm() {                
        for(let i=0;i < this.taxDeductedUnder26QCModels.length;i++) {
            if(this.usrPanNo==this.taxDeductedUnder26QCModels[i].PAN || this.spousePanNo==this.taxDeductedUnder26QCModels[i].PAN) {
                this._toastr.error('<b>Tax Details Tab-</b>Tenant PAN number could not be same as yours or your spouse PAN number', 'Error', this._configuration.CustomToastOptions);                
                this.isTaxDeductedCollectedComponentValid.emit(undefined);
                return false; 
            }
        }         
        if (this.taxDeductedCollectedFrm.valid)  
            this.isTaxDeductedCollectedComponentValid.emit(true);
        else 
            this.isTaxDeductedCollectedComponentValid.emit(false);         
    }
}