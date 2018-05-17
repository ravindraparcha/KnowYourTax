import { Component } from "@angular/core";

@Component({
    selector : 'tax-deducted',
    templateUrl:'./tax-deducted.component.html'
})

export class TaxDeductedComponent{
    private fieldArray: Array<any> = [];
    private newAttribute: any = {};

    addFieldValue() {
        debugger;
        this.fieldArray.push(this.newAttribute)
        this.newAttribute = {};
    }

    deleteFieldValue(index) {
        this.fieldArray.splice(index, 1);
    }
    onSubmit(){
        console.log(this.fieldArray);
    }
}