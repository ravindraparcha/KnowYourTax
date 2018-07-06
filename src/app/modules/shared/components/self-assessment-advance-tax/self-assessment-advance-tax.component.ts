import { Component, Output, EventEmitter } from '@angular/core';
import {NgForm} from "@angular/forms";
import { AdvanceTaxSelfAssessmentTaxModel } from '../../../eTaxXML/models/tax-deducted-collected.model';
import { SharedTaxService } from '../../services/sharedTaxService';
import { IMyDateModel, INgxMyDpOptions } from 'ngx-mydatepicker';
import { FormatDateService } from '../../../eTaxXML/services/formatDateService';
import { ConfigurationService } from '../../services/ConfigurationService';
 

@Component({
    selector: 'self-assessment-advance-tax',
    templateUrl: './self-assessment-advance-tax.component.html'
})

export class SelfAssessmentAdvanceTaxComponent  {

    public advanceTaxSelfAssessmentTaxModels ;
    private _newAdvanceTaxSelfAssessmentTaxModel;

    public taxTypeList = [];
    @Output() advanceTaxSelfAssessmentTaxModelOutput: EventEmitter<AdvanceTaxSelfAssessmentTaxModel[]> = new EventEmitter<AdvanceTaxSelfAssessmentTaxModel[]>();

    
    constructor(private _configuration: ConfigurationService,private _sharedTaxService: SharedTaxService,private _sharedXMLService: FormatDateService) {
        this.taxTypeList=[{'value':'SelfAssessmentTax', 'text':'Self Assessment Tax'},{'value':'AdvanceTax','text':'Advance Tax'}];        
        this.advanceTaxSelfAssessmentTaxModels = [];
    }

    public myOptions: INgxMyDpOptions = {
        dateFormat: this._configuration.dateTimeFormat
    };
    addNewAdvanceTaxSelfAssessmentTax() {
        this._newAdvanceTaxSelfAssessmentTaxModel = new AdvanceTaxSelfAssessmentTaxModel("", "", "0", "");
        this.advanceTaxSelfAssessmentTaxModels.push(this._newAdvanceTaxSelfAssessmentTaxModel);
        //this.taxCollectedDeductedModel.advanceTaxSelfAssessmentTaxModels = this.advanceTaxSelfAssessmentTaxModels;
        this.advanceTaxSelfAssessmentTaxModelOutput.emit(this.advanceTaxSelfAssessmentTaxModels);
    }
    deleteAdvanceTaxSelfAssessmentTaxItem(index: number) {
        this.deleteItemFromArray(this.advanceTaxSelfAssessmentTaxModels, index);
        this.calculateAdvanceTaxSelfAssessmentTax();        
        this.advanceTaxSelfAssessmentTaxModelOutput.emit(this.advanceTaxSelfAssessmentTaxModels);
    }
    public calculateAdvanceTaxSelfAssessmentTax() {
        let advanceTaxSum : number = 0;
        let selfAssessmentSum : number =0;
        for (let advanceTaxSelfAssessmentTaxModel of this.advanceTaxSelfAssessmentTaxModels) {
            if(advanceTaxSelfAssessmentTaxModel.depositDate==null || advanceTaxSelfAssessmentTaxModel.depositDate=='')
                continue;
            if(advanceTaxSelfAssessmentTaxModel.selectedTaxType=="SelfAssessmentTax")
                selfAssessmentSum += parseInt(advanceTaxSelfAssessmentTaxModel.taxPaid);
            else if(advanceTaxSelfAssessmentTaxModel.selectedTaxType=="AdvanceTax")
                advanceTaxSum+= parseInt(advanceTaxSelfAssessmentTaxModel.taxPaid);
        }
        this._sharedTaxService.changeAdvanceTaxAmount(advanceTaxSum);
        this._sharedTaxService.changeSelfAssessmentAmount(selfAssessmentSum);
        this._sharedTaxService.changeSelfAssessmentAdvanceTax(this.advanceTaxSelfAssessmentTaxModels);
    }
    onDepositDateChanged(event: IMyDateModel) {
        if (event.date.day != 0) {
            this._newAdvanceTaxSelfAssessmentTaxModel.depositDate = event.date.day + "/" + event.date.month + "/" + event.date.year;
            this._newAdvanceTaxSelfAssessmentTaxModel.depositDateXml = this._sharedXMLService.formatDate(event.date.day, event.date.month, event.date.year, "yyyy-mm-dd", "-");
        }
        else {
            this._newAdvanceTaxSelfAssessmentTaxModel.depositDate = "";
            this._newAdvanceTaxSelfAssessmentTaxModel.depositDateXml = "";
        }
    }

    deleteItemFromArray(itemArray: any[], index: number) {
        itemArray.splice(index, 1);
    }
}