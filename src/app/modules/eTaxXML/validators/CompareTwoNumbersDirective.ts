import { Directive, Input, forwardRef, Attribute } from "@angular/core";
import { NG_VALIDATORS, Validator, AbstractControl } from "@angular/forms";


@Directive({
    selector: '[CompareTwoNumbersValidator][ngModel]',
    providers: [{
        provide: NG_VALIDATORS,
        useExisting: forwardRef(() => CompareTwoNumbersValidatorDirective),
        multi: true
    }
    ]
})

export class CompareTwoNumbersValidatorDirective implements Validator {
    @Input() indexValue: number;     
    constructor(@Attribute('compareNumber') private _compareNumber: string, @Attribute('flag') private _flag: string) { }
    public validate(control: AbstractControl) {

        if (control.value == undefined || control.value == null)
            return;
        let compareCtrl = control.root.get(this._compareNumber + '_' + this.indexValue);
       
        if (compareCtrl && compareCtrl.errors != null) {
            delete compareCtrl.errors["compareNumber"];
            compareCtrl.setErrors({"compareNumber" :null});
        }
        if (control.errors != null) {
            delete control.errors["compareNumber"];
            control.setErrors({"compareNumber" :null});
        }
       
        if(compareCtrl!=null) {
             
            if (this._flag === 'true') {
                if (parseInt(control.value) > parseInt(compareCtrl.value)) {
                    return {
                        compareNumber: true
                    }
                }                 
            }    
            else if (this._flag === 'false') {
                if (parseInt(control.value) < parseInt(compareCtrl.value)) {
                    return {
                        compareNumber: true
                    }
                }               
            }
        }

        
        return null;        
    }
}