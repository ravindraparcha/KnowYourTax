import { Directive, Input, forwardRef } from "@angular/core";
import { NG_VALIDATORS,  Validator, AbstractControl } from "@angular/forms";

@Directive({
    selector: '[NumberValidator][ngModel]',
    providers: [{
        provide: NG_VALIDATORS,
        useExisting:forwardRef(() => NumberValidatorDirective) ,
        multi: true
    }
    ]
})

export class NumberValidatorDirective implements Validator {   
    validate(c: AbstractControl) {       
        if(c.value==null || c.value=="")
            return null;
        var pattern = /^[0-9]*$/;
        if (pattern.test(c.value))
            return null;
        else
            return {
                numberError: {
                    errorMsg : 'Only number allowed'
                }
            };
    }
}