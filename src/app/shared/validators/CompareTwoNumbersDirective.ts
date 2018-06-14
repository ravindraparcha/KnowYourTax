import { Directive, Input, forwardRef } from "@angular/core";
import { NG_VALIDATORS, Validator, AbstractControl } from "@angular/forms";


@Directive({
    selector: '[CompareTwoNumbersValidator][ngModel]',
    providers: [{
        provide: NG_VALIDATORS,
        useExisting: forwardRef(() => CompareTwoNumbersValidatorDirective),
        multi: true
    }
    ]
})

export class CompareTwoNumbersValidatorDirective implements Validator {
    @Input() otherValue: any;
    public validate(control: AbstractControl) {
        let arr = this.otherValue.split(',');
        let currentControlValue = control.value;
        let valueToCompare = arr[0]=="" ? 0 : arr[0];
         
        if (arr[1]=='true') {
            if (currentControlValue > valueToCompare) {
                return {
                    numberError: {
                        errorMsg:  valueToCompare + ' should be less than ' + currentControlValue 
                    }
                };
            }
            else
                return null;
        }
        else if(arr[1]=='false') {
            if (currentControlValue < valueToCompare) {
                return {
                    numberError: {
                        errorMsg:  currentControlValue + ' should be less than ' + valueToCompare 
                    }
                };
            }
            else
                return null;
        }
    }
}