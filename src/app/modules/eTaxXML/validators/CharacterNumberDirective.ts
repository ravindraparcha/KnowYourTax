import { Directive, Input, forwardRef } from "@angular/core";
import { NG_VALIDATORS, Validator, AbstractControl } from "@angular/forms";

@Directive({
    selector: '[CharacterNumberValidator][ngModel]',
    providers: [{
        provide: NG_VALIDATORS,
        useExisting: forwardRef(() => CharacterNumberValidatorDirective),
        multi: true
    }
    ]
})

export class CharacterNumberValidatorDirective implements Validator {
    //1. only number, 2. only characters, 3. alphanumeric    
    @Input() validationType: number;
    
    validate(c: AbstractControl) {         
        let errorMsg:string;
        if (c.value == null || c.value == "")
            return null;
        let pattern;
        if (this.validationType == 2) {
            pattern = /^[a-zA-Z ]*$/;
            errorMsg="Only character allowed";
        }
        else if (this.validationType == 1) {
            pattern = /^\d+$/;
            errorMsg="Only number allowed";
        }
        else if (this.validationType == 3) {
            pattern = /^[a-z0-9 ]+$/i;
            errorMsg="Characters and numbers allowed";
        }

        if (pattern.test(c.value))
            return null;
        else {
            return {
                error: {                    
                    errorMsg: errorMsg
                }
            };
        }
    }
}

