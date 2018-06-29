import { Directive, Input, forwardRef } from "@angular/core";
import { NG_VALIDATORS, Validator, AbstractControl } from "@angular/forms";

@Directive({
    selector: '[IFSCValidator][ngModel]',
    providers: [{
        provide: NG_VALIDATORS,
        useExisting: forwardRef(() => IFSCValidatorDirective),
        multi: true
    }
    ]
})

export class IFSCValidatorDirective implements Validator {
    validate(c: AbstractControl) { 
        if (c.value == null || c.value=="")
            return null;

        let pattern = /^[A-Za-z]{4}\d{7}$/;
        if (pattern.test(c.value))
            return null;
         else {
            return {
                ifscError: {
                    errorMsg: 'IFSC code is invalid'
                }
            };
        }
     }
}

