import { Directive, Input, forwardRef } from "@angular/core";
import { NG_VALIDATORS, Validator, AbstractControl } from "@angular/forms";

@Directive({
    selector: '[CountValidator][ngModel]',
    providers: [{
        provide: NG_VALIDATORS,
        useExisting: forwardRef(() => CountValidatorDirective),
        multi: true
    }
    ]
})

export class CountValidatorDirective implements Validator {
    @Input() count : number
    validate(c: AbstractControl) { 
       
        if (c.value == null || c.value=="")
            return null;
        
        if (c.value.toString().length==this.count)
            return null;
         else {
            return {
                error: {
                    errorMsg: 'Maximum '+ this.count +  (isNaN(c.value.toString()) ? ' characters allowed' : ' numbers allowed')
                }
            };
        }
     }
}

