import { Component, ViewChild, Output, EventEmitter } from "@angular/core";
import { IncomeDetailsComponent } from "../shared/components/income-details/income-details.component";

declare var $:any;

@Component({
    selector: 'calculator',
    templateUrl: './calculator.component.html'

})
export class CalculatorComponent {   
    @ViewChild(IncomeDetailsComponent) _incomeDetailsComponent: IncomeDetailsComponent;
    calculateTax() {        
        this._incomeDetailsComponent.incomeTaxModel = this._incomeDetailsComponent.deductionsComponent.calculateTax();
        $('#deductionModel').modal('show');       
    }
    public validateIncomeDetailsComponentForm() {                
        //this.isIncomeDetailsComponentValid.emit(true);            
    }
}