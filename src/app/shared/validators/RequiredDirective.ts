import { Directive, Input, forwardRef } from "@angular/core";
import { NG_VALIDATORS, Validator, AbstractControl } from "@angular/forms";

@Directive({
    selector: '[RequiredValidator][ngModel]',
    providers: [{
        provide: NG_VALIDATORS,
        useExisting: forwardRef(() => RequiredValidatorDirective),
        multi: true
    }
    ]
})

export class RequiredValidatorDirective implements Validator {
    validate(c: AbstractControl) { 
        return null;
        
     }
}

