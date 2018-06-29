import { Directive, Input, forwardRef } from "@angular/core";
import { NG_VALIDATORS, Validator, AbstractControl } from "@angular/forms";

@Directive({
    selector: '[ReceiptNumberValidator][ngModel]',
    providers: [{
        provide: NG_VALIDATORS,
        useExisting: forwardRef(() => ReceiptNumberValidatorDirective),
        multi: true
    }
    ]
})

export class ReceiptNumberValidatorDirective implements Validator {
    validate(c: AbstractControl) { 
        if (c.value == null || c.value=="")
            return null;

        let pattern = /^\d{15}$/;
        if (pattern.test(c.value))
            return null;
         else {
            return {
                receiptNumberError: {
                    errorMsg: 'Receipt number is invalid'
                }
            };
        }
     }
}

