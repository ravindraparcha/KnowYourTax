import { Component, ViewChild, Output, EventEmitter, OnInit } from "@angular/core";
import { IncomeDetailsComponent } from "../shared/components/income-details/income-details.component";
import { IncomeTaxModel, TaxComputationModel } from "../shared/models/deduction.model";
import { AdvanceTaxSelfAssessmentTaxModel } from "../eTaxXML/models/tax-deducted-collected.model";

declare var $:any;

@Component({
    selector: 'calculator',
    templateUrl: './calculator.component.html'

})
export class CalculatorComponent implements OnInit {   
    @ViewChild(IncomeDetailsComponent) _incomeDetailsComponent: IncomeDetailsComponent;

    public incomeTaxModel: any;

    ngOnInit() {       
        this.incomeTaxModel = new IncomeTaxModel();
        this.incomeTaxModel.userTaxModel = [];
        this.incomeTaxModel.systemTaxModel = [];
        this.incomeTaxModel.taxComputationModel = new TaxComputationModel();
    }
    public calculateTax() {        
        this.incomeTaxModel = this._incomeDetailsComponent.deductionsComponent.calculateTax();
        $('#deductionModel').modal('show');     
    }
    public getAdvanceTaxSelfAssessmentTaxModelOutput(output: AdvanceTaxSelfAssessmentTaxModel[]) {
       // this.taxCollectedDeductedModel.advanceTaxSelfAssessmentTaxModels  = output;
    }
}