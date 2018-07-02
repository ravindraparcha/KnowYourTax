import { Component, ViewChild, Output, EventEmitter, OnInit } from "@angular/core";
import { IncomeDetailsComponent } from "../shared/components/income-details/income-details.component";
import { IncomeTaxModel, TaxComputationModel } from "../shared/models/deduction.model";
import { AdvanceTaxSelfAssessmentTaxModel } from "../eTaxXML/models/tax-deducted-collected.model";
import { SharedTaxService } from "../shared/services/sharedTaxService";
import { Subscription } from "rxjs";

declare var $:any;

@Component({
    selector: 'calculator',
    templateUrl: './calculator.component.html'

})
export class CalculatorComponent implements OnInit {   

    @ViewChild(IncomeDetailsComponent) _incomeDetailsComponent: IncomeDetailsComponent;
    public incomeTaxModel: any;
    public totalSelfAssessmentTaxPaid: number = 0;
    public totalAdvanceTaxPaid: number = 0;
    public totalTaxesPaid: number = 0;
    public amountPayable: number = 0;
    public refund: number = 0;

    private _subscription: Subscription;
    constructor( private _sharedTaxService: SharedTaxService) {}
    ngOnInit() {       
        this.incomeTaxModel = new IncomeTaxModel();
        this.incomeTaxModel.userTaxModel = [];
        this.incomeTaxModel.systemTaxModel = [];
        this.incomeTaxModel.taxComputationModel = new TaxComputationModel();
        
        this._subscription = this._sharedTaxService.getSelfAssessmentAmount().subscribe(item => this.totalSelfAssessmentTaxPaid = item);
        this._subscription = this._sharedTaxService.getAdvanceTaxAmount().subscribe(item => this.totalAdvanceTaxPaid = item);
        this._subscription = this._sharedTaxService.getTotalTDSTCS().subscribe(item => this.totalTaxesPaid = item);
        this._subscription = this._sharedTaxService.getAmountPayable().subscribe(item => this.amountPayable = item);
        this._subscription = this._sharedTaxService.getRefund().subscribe(item => this.refund = item);
    }
    public calculateTax() {        
        this.incomeTaxModel = this._incomeDetailsComponent.deductionsComponent.calculateTax();
        $('#deductionModel').modal('show');     
    }
    
}