import { Directive, Input, forwardRef } from "@angular/core";
import { NG_VALIDATORS, Validator, AbstractControl } from "@angular/forms";

@Directive({
    selector: '[PinCodeValidator][ngModel]',
    providers: [{
        provide: NG_VALIDATORS,
        useExisting: forwardRef(() => PinCodeValidatorDirective),
        multi: true
    }
    ]
})

export class PinCodeValidatorDirective implements Validator {
    validate(c: AbstractControl) { 
        if (c.value == null || c.value=="")
            return null;

        let pattern = /^[1-9][0-9]{5}$/;
        if (pattern.test(c.value))
            return null;
         else {
            return {
                pinCodeError: {
                    errorMsg: 'Pincode is invalid'
                }
            };
        }
     }
}

