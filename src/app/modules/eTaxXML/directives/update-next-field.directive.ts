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
    constructor( @Attribute('nextField') private _nextField: string, @Attribute('percentage') private _percentage: number,@Attribute('setValue') private _setValue : string) { }
    public validate(control: AbstractControl) {
        
        let nextField = control.root.get(this._nextField + '_' + this.indexValue);
        if (control.value == undefined || control.value == null || control.value == '') {
            if (nextField != null)
                if(this._percentage!=null)
                    nextField.setValue(0);
                else if(this._setValue!=null)
                    nextField.setValue('');
            return;
        }
        if (this._percentage != null) {
            if (!isNaN(control.value) && nextField != null) {
                nextField.setValue(this.calcualtePercentage(parseInt(control.value), this._percentage));
            }
        }
        if(this._setValue!=null) {
            if(control.value!=="OTH") 
                nextField.setValue(this._setValue); 
            else 
                nextField.setValue('');               
        }
        return null;
    }
    private calcualtePercentage(inputValue: number, percentage: number) {
        return Math.ceil((inputValue * percentage) / 100);
    }
}