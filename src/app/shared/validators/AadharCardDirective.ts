import { Directive, Input, forwardRef } from "@angular/core";
import { NG_VALIDATORS, Validator, AbstractControl } from "@angular/forms";

@Directive({
    selector: '[AadharCardValidator][ngModel]',
    providers: [{
        provide: NG_VALIDATORS,
        useExisting: forwardRef(() => AadharCardValidatorDirective),
        multi: true
    }
    ]
})

export class AadharCardValidatorDirective implements Validator {
    validate(c: AbstractControl) {
        if (c.value == null)
            return null;
        let aadharError = {
            aadharError: {
                errorMsg: 'Aadhar card number is invalid'
            }
        };

        let pattern = /^\d+$/;
        if (!pattern.test(c.value) && c.value.length != 12) {
            return aadharError;
        }
        if (validateAadharCardNumber(c.value))
            return null;
        else
            return aadharError;
    }
}
// Verhoeff algorithm validation check, by Avraham Plotnitzky. (aviplot at gmail)
let validateAadharCardNumber = function (str) {
    {
        let d = [[0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
        [1, 2, 3, 4, 0, 6, 7, 8, 9, 5],
        [2, 3, 4, 0, 1, 7, 8, 9, 5, 6],
        [3, 4, 0, 1, 2, 8, 9, 5, 6, 7],
        [4, 0, 1, 2, 3, 9, 5, 6, 7, 8],
        [5, 9, 8, 7, 6, 0, 4, 3, 2, 1],
        [6, 5, 9, 8, 7, 1, 0, 4, 3, 2],
        [7, 6, 5, 9, 8, 2, 1, 0, 4, 3],
        [8, 7, 6, 5, 9, 3, 2, 1, 0, 4],
        [9, 8, 7, 6, 5, 4, 3, 2, 1, 0]];
        let p = [[0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
        [1, 5, 7, 6, 2, 8, 3, 0, 9, 4],
        [5, 8, 0, 3, 7, 9, 6, 1, 4, 2],
        [8, 9, 1, 6, 0, 4, 3, 5, 2, 7],
        [9, 4, 5, 3, 1, 2, 6, 8, 7, 0],
        [4, 2, 8, 6, 5, 7, 3, 9, 0, 1],
        [2, 7, 9, 3, 8, 0, 6, 4, 1, 5],
        [7, 0, 4, 6, 9, 1, 3, 2, 5, 8]];
        let j = [0, 4, 3, 2, 1, 5, 6, 7, 8, 9];

        let c = 0;
        str.replace(/\D+/g, "").split("").reverse().join("").replace(/[\d]/g, function (u, i, o) {
            c = d[c][p[i & 7][parseInt(u, 10)]];
        });
        return (c === 0);

    }
}

