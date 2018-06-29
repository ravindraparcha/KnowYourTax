import { Directive, Input, forwardRef } from "@angular/core";
import { NG_VALIDATORS,  Validator, AbstractControl } from "@angular/forms";

@Directive({
    selector: '[NameValidator][ngModel]',
    providers: [{
        provide: NG_VALIDATORS,
        useExisting:forwardRef(() => NameValidatorDirective) ,
        multi: true
    }
    ]
})

export class NameValidatorDirective implements Validator {   
    validate(c: AbstractControl) {
       
        if(c.value==null || c.value=="")
            return null;
        var pattern = /[^a-zA-Z ]/;
        if (!pattern.test(c.value))
            return null;
        else
            return {
                nameError: {
                    errorMsg : 'No special character/number allowed'
                }
            };
    }
}