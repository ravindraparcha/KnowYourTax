import { Directive, Input, forwardRef } from "@angular/core";
import { NG_VALIDATORS, Validator, AbstractControl } from "@angular/forms";

@Directive({
    selector: '[MobileNoValidator][ngModel]',
    providers: [{
        provide: NG_VALIDATORS,
        useExisting: forwardRef(() => MobileNoValidatorDirective),
        multi: true
    }
    ]
})

export class MobileNoValidatorDirective implements Validator {
    validate(c: AbstractControl) {
        
        if (c.value == null || c.value=="")
            return null;
        
        let pattern = /^\d{10}$/;
        if (!pattern.test(c.value)) {
              return {
                mobileNoError: {
                    errorMsg : 'Mobile number is invalid'
                }
            };
        }
        else 
            return null;
         
    }
}
