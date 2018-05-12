import { Component, OnInit,EventEmitter,Output } from "@angular/core";
import { Configuration } from '../../../../shared/constants';
import { DeductionModel } from '../../models/deduction.model';
import { FormBuilder, FormControl, FormArray, FormGroup } from '@angular/forms';

declare var $: any;

@Component({
    selector: 'deductions',
    templateUrl: './deductions-component.html'
})

export class DeductionsComponent implements OnInit {
    private selectedSectionValue;
    public deductions;
    public sectionForm;
    @Output() onCalculateDeductionSum: EventEmitter<any> = new EventEmitter<any>();

    constructor(private _configuration: Configuration, private _fb: FormBuilder) { }

    ngOnInit() {
        this.deductions = [];
        this.deductions
        this.sectionForm = this._fb.group({
            itemRows: this._fb.array([this.initialiseNewRow('', 0, '')]) // here
        });

        //remove the first item from the form
        const control = <FormArray>this.sectionForm.controls['itemRows'];
        for(let i = control.length-1; i >= 0; i--) {
          control.removeAt(i)
        }         
    }
    initialiseNewRow(text: string, value: number, section: string) {
        return this._fb.group({
            // list all your form controls here, which belongs to your form array
            deductionText: [text],
            deductionValue: [value],
            deductionSection: [section]
        });
    }
    addSection() {       
        let section = this.selectedSectionValue;
        let duplicateFound = false;

        //duplicate check
        if (this.deductionItemIndex(this.sectionForm.value.itemRows, section) != -1) {
            duplicateFound = true;
            return;
        }
        if (duplicateFound) {
            return;
        }
        let $this = this;
        const control = <FormArray>this.sectionForm.controls['itemRows'];
        $.each(this._configuration.deductionList, function (i, v) {
            if (v.value == section) {
                control.push($this.initialiseNewRow(v.text, 0, section));
                return;
            }
        });
    }

    deleteSection(index: number) {
        // control refers to your formarray
        const control = <FormArray>this.sectionForm.controls['itemRows'];
        // remove the chosen row
        control.removeAt(index);
    }
    onSubmit(formData: any) {        
        let deductions = formData.value.itemRows;
        let sum=0;
        for(let deduction of deductions){
            sum+=deduction.deductionValue;
        }
        //alert(sum);
        this.onCalculateDeductionSum.emit(sum);
    }
    private deductionItemIndex(objArray, objElement): number {
        let index = -1;
        $.each(objArray, function (i, v) {
            if (v.deductionSection == objElement) {
                index = i;
                return;
            }
        });
        return index;
    }

    calculateSum(formData: any) {
        console.log(formData.form.value);
        console.log(this.deductions);
        

    }
    onDeductionChange() {
        this.addSection();
    }
    onChangeCalculateDeductionAmount(formData:any) {        
        let sum=0;
        for(let deduction of formData.form.value){
            sum+=deduction.amount;
        }
        console.log(sum);
    }

}