import { Directive, Input, forwardRef } from "@angular/core";
import { NG_VALIDATORS,  Validator, AbstractControl } from "@angular/forms";

@Directive({
    selector: '[PanCardValidator][ngModel]',
    providers: [{
        provide: NG_VALIDATORS,
        useExisting:forwardRef(() => PanCardValidatorDirective) ,
        multi: true
    }
    ]
})

export class PanCardValidatorDirective implements Validator {   
    validate(c: AbstractControl) {       
        if(c.value==null || c.value=="")
            return null;
        var pattern = /^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/;
        if (pattern.test(c.value))
            return null;
        else
            return {
                panNoError: {
                    errorMsg : 'PAN card number is invalid'
                }
            };
    }
}