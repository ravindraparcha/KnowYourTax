import { Directive, Input, forwardRef } from "@angular/core";
import { NG_VALIDATORS, Validator, AbstractControl } from "@angular/forms";

@Directive({
    selector: '[DuplicateCheckValidator][ngModel]',
    providers: [{
        provide: NG_VALIDATORS,
        useExisting: forwardRef(() => DuplicateCheckValidatorDirective),
        multi: true
    }
    ]
})

export class DuplicateCheckValidatorDirective implements Validator {
    //1. only number, 2. only characters, 3. alphanumeric    
    @Input() duplicateCheckInput: any;   
    validate(c: AbstractControl) {       
        if(c.value==null || c.value==undefined || this.duplicateCheckInput=="" || this.duplicateCheckInput==NaN)  
            return null;
        let elementInput = isNaN(c.value)  ? c.value.toLowerCase() : parseFloat(c.value);
        this.duplicateCheckInput = isNaN(this.duplicateCheckInput) ? this.duplicateCheckInput.toLowerCase() : parseFloat(this.duplicateCheckInput);
        if (elementInput!=this.duplicateCheckInput)
            return null;
        else {
            return {
                duuplicateError: {                    
                    errorMsg: elementInput + ' cannot be duplicated'
                }
            };
        }
    }
}

