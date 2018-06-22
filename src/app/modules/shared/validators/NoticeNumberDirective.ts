import { Directive, Input, forwardRef } from "@angular/core";
import { NG_VALIDATORS, Validator, AbstractControl } from "@angular/forms";

@Directive({
    selector: '[NoticeNumberValidator][ngModel]',
    providers: [{
        provide: NG_VALIDATORS,
        useExisting: forwardRef(() => NoticeNumberValidatorDirective),
        multi: true
    }
    ]
})

export class NoticeNumberValidatorDirective implements Validator {
    validate(c: AbstractControl) { 
        if (c.value == null || c.value=="")
            return null;

        let pattern = /^[a-z0-9//]+$/i;
        if (pattern.test(c.value))
            return null;
         else {
            return {
                noticeNumberError: {
                    errorMsg: 'Notice number is invalid'
                }
            };
        }
     }
}

