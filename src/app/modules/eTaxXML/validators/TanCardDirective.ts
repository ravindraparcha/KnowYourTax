import { Directive, Input, forwardRef } from "@angular/core";
import { NG_VALIDATORS,  Validator, AbstractControl } from "@angular/forms";

@Directive({
    selector: '[TanCardValidator][ngModel]',
    providers: [{
        provide: NG_VALIDATORS,
        useExisting:forwardRef(() => TanCardValidatorDirective) ,
        multi: true
    }
    ]
})

export class TanCardValidatorDirective implements Validator {   
    validate(c: AbstractControl) {                
        if(c.value==null || c.value=="")
            return null;
        var pattern = /[A-Za-z]{4}[0-9]{5}[A-Za-z]{1}/;
        if (pattern.test(c.value))
            return null;
        else
            return {
                tanNoError: {
                    errorMsg : 'Tan card number is invalid'
                }
            };
    }
}