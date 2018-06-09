import { Directive, Input, forwardRef } from "@angular/core";
import { NG_VALIDATORS,  Validator, AbstractControl } from "@angular/forms";

@Directive({
    selector: '[EmailValidator][ngModel]',
    providers: [{
        provide: NG_VALIDATORS,
        useExisting:forwardRef(() => EmailValidatorDirective) ,
        multi: true
    }
    ]
})

export class EmailValidatorDirective implements Validator {   
    validate(c: AbstractControl) {
        if(c.value==null)
            return null;
        var pattern = /[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}/;
        if (pattern.test(c.value))
            return null;
        else
            return {
                emailError: {
                    errorMsg : 'Email is not valid'
                }
            };
    }
}