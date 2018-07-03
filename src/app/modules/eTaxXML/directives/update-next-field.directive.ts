import { Directive, Input, forwardRef, Attribute } from "@angular/core";
import { NG_VALIDATORS, Validator, AbstractControl } from "@angular/forms";


@Directive({
    selector: '[UpdateNextField][ngModel]',
    providers: [{
        provide: NG_VALIDATORS,
        useExisting: forwardRef(() => UpdateNextFieldDirective),
        multi: true
    }
    ]
})

export class UpdateNextFieldDirective implements Validator {
    @Input() indexValue: number;
    constructor(@Attribute('nextField') private _nextField: string, @Attribute('percentage') private _percentage: number) { }
    public validate(control: AbstractControl) {
        let nextField = control.root.get(this._nextField + '_' + this.indexValue);
        if (control.value == undefined || control.value == null || control.value=='') {            
            if(nextField != null)
                nextField.setValue(0);
            return;
        } 
        if (!isNaN(control.value) && nextField != null) {
            nextField.setValue(Math.ceil((parseInt(control.value) * this._percentage) / 100));
        }
        return null;
    }
}