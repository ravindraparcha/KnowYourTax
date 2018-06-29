import { Directive, Input, forwardRef } from "@angular/core";
import { NG_VALIDATORS, Validator, AbstractControl } from "@angular/forms";

@Directive({
    selector: '[AadharCardEnrollmentIdValidator][ngModel]',
    providers: [{
        provide: NG_VALIDATORS,
        useExisting: forwardRef(() => AadharCardEnrollmentIdValidatorDirective),
        multi: true
    }
    ]
})

export class AadharCardEnrollmentIdValidatorDirective implements Validator {
    validate(c: AbstractControl) { 
        if (c.value == null || c.value=="")
            return null;

        let pattern = /^\d+$/;
        if (pattern.test(c.value) && c.value.length == 28)
            return null;
         else {
            return {
                aadharEnrollmentIdError: {
                    errorMsg: 'Aadhar card enrollmentid is invalid'
                }
            };
        }
     }
}

