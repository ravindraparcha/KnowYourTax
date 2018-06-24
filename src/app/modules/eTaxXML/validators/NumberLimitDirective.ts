import { Directive, Input, forwardRef } from "@angular/core";
import { NG_VALIDATORS, Validator, AbstractControl } from "@angular/forms";

@Directive({
    selector: '[NumberLimitValidator][ngModel]',
    providers: [{
        provide: NG_VALIDATORS,
        useExisting: forwardRef(() => NumberLimitValidatorDirective),
        multi: true
    }
    ]
})

export class NumberLimitValidatorDirective implements Validator {
    @Input() maxLimit : number;
    validate(c: AbstractControl) {
        
        if (c.value == null || c.value=="")
            return null;
        if(parseInt(c.value)> this.maxLimit) {
            return {
                limitError: {
                    errorMsg : 'Amount should be <=' +this.maxLimit
                }
            };
        }         
        else 
            return null;
         
    }
}
