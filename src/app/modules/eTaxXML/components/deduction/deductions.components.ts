import { Component, OnInit, EventEmitter, Output, ViewContainerRef, Input } from "@angular/core";
import { Configuration } from '../../../../shared/constants';
import { DeductionModel, SlabResult } from '../../models/deduction.model';
import { FormBuilder, FormControl, FormArray, FormGroup } from '@angular/forms';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { slimLoaderBarService } from '../../../../shared/services/slimLoaderBarService';

import { CalculatorService } from '../../../../services/calculator.service';
import { CalculatorModel, CalculatorInputs, Section, SectionValue } from "../../models/calculatorModel";



declare var $: any;

@Component({
    selector: 'deductions',
    templateUrl: './deductions-component.html'
})

export class DeductionsComponent implements OnInit {
    public selectedSectionValue;
    public deductionList = [];
    public sectionForm;
    private assessmentYear;
    public calculationResult = {};
    @Input() grossTotalIncome: number;
    @Output() onCalculateDeductionSum: EventEmitter<any> = new EventEmitter<any>();

    constructor(private _configuration: Configuration, private _fb: FormBuilder,
        private _calcService: CalculatorService, private toastr: ToastsManager, vcr: ViewContainerRef,
        private _slimLoader: slimLoaderBarService) {
        this.toastr.setRootViewContainerRef(vcr);
    }

    ngOnInit() {
        let currentDate = new Date();
        let sections;
        this.assessmentYear = currentDate.getFullYear() + "-" + (currentDate.getFullYear() + 1);
 
        this.getSectionsArray(this._configuration.deductionList);
        this.sectionForm = this._fb.group({
            itemRows: this._fb.array([this.initialiseNewRow('', 0, '', '')]) // here
        });

        //remove the first item from the form
        const control = <FormArray>this.sectionForm.controls['itemRows'];
        for (let i = control.length - 1; i >= 0; i--) {
            control.removeAt(i)
        }
    }
    initialiseNewRow(text: string, value: number, section: string, parent: string) {
        return this._fb.group({
            // list all your form controls here, which belongs to your form array
            deductionText: [text],
            deductionValue: [value],
            deductionSection: [section],
            parent: [parent]
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
        $.each(this.deductionList, function (i, v) {
            if (v.name == section) {
                control.push($this.initialiseNewRow(v.text, 0, section, ""));// v.section));
                return;
            }
        });

    }

    deleteSection(index: number) {
        // control refers to your formarray
        const control = <FormArray>this.sectionForm.controls['itemRows'];
        // remove the chosen row
        control.removeAt(index);
        //deduct value from deductionsum
        let sum = this.calculateDeduction(control.value);
        this.onCalculateDeductionSum.emit(sum);
    }
    onDeductionChangeCalculateSum(formData: any) {
        let sum = this.calculateDeduction(formData.value.itemRows);
        this.onCalculateDeductionSum.emit(sum);
    }
    calculateDeduction(deductionsArray) {
        let sum = 0;
        for (let deduction of deductionsArray) {
            sum += deduction.deductionValue;
        }
        return sum;
    }
    calculateTax(formData: any) {
         
        let deductionList = this.getSectionWithAmount(formData.value.itemRows);
        let deductionApplicable = 0;
        for (let deduction of deductionList)
            deductionApplicable += deduction.amount;

        //calculate rebate amount
        let slabList=this._configuration.slabs;
        let slabs;
        for(let data of slabList) {
            if(data.ayYear==this.getAssessmentYear()) {
                slabs= data.slabLimits;
                break;
            }
        }

        let slabResults ={};
        slabResults = this.calculateTaxPerSlab((this.grossTotalIncome - deductionApplicable));
        console.log(slabResults);
        // //prepare data to send to server for tax calculation 
        // let calculatorInputs = new CalculatorInputs();

        // calculatorInputs.Category = 1;//default Male as of now
        // calculatorInputs.OtherSourceIncome = 0;
        // calculatorInputs.SalaryIncome = 0;
        // calculatorInputs.GrossTaxableSalary = this.grossTotalIncome; //(isNaN(this.calcModel.SalaryIncome) ? 0 : this.calcModel.SalaryIncome) + (isNaN(this.calcModel.OtherSourceIncome) ? 0 : this.calcModel.OtherSourceIncome);
        // calculatorInputs.OtherDeductions = 0;//(isNaN(model.OtherDeductions) == true || model.OtherDeductions == null) ? 0 : model.OtherDeductions;
        // calculatorInputs.YearRange = this.assessmentYear;
        // calculatorInputs.DueDateEfiling = this._configuration.dueDateForFiling;
        // calculatorInputs.Section234BEndDate = this._configuration.section234BEndDate;
        // let date = new Date();
        // let month=date.getMonth()+1;
        // let monthStr;
        // if((date.getMonth()+1)<10){
        //     monthStr="0"+month;
        //     //monthStr="09";
        // }
        // else {
        //     monthStr=month;
        // }

        // calculatorInputs.CurrentDate = date.getDate() + "/"+monthStr+"/"+date.getFullYear();
        // calculatorInputs.SectionValues = [];
        // for (let i = 0; i < deductions.length; i++) {
        //     calculatorInputs.SectionValues.push({ "SectionName": deductions[i].deductionSection, "Amount": deductions[i].deductionValue, "ParentSection": deductions[i].parent });
        // }

        // this._calcService.calculateTax<any>(calculatorInputs)
        //     .subscribe((data: any) => this.calculationResult = data,
        //         (error) => {
        //             this.toastr.error(this._configuration.ErrorOccurred, "Error", this._configuration.CustomOptions);
        //             //this.calcModel.calculateTaxLoader = false;
        //             this._slimLoader.stopLoading();
        //         },
        //         () => {
        //             //this.calcModel.calculateTaxLoader = false;
        //             this._slimLoader.completeLoading();
        //             console.log(this.calculationResult);
        //             //$("html, body").animate({ scrollTop: $(document).height() }, 1000);                    
        //         });

    }

    private getAssessmentYear() : string {
        let currentDate = new Date();
        let nextDate = new Date(currentDate.getFullYear()+1,currentDate.getMonth()+1,currentDate.getDate());
        return (currentDate.getFullYear()+"-"+nextDate.getFullYear());
    }
    private getSectionWithAmount(deductions) {
        let masterDataList = this._configuration.masterSec;
        let deductionSum = 0
        let limitCrossed = true;
        let usrSections = [];
        let optionSum = 0;
      
        let masterData;
        for(let data of masterDataList) {
            if(data.ayYear==this.getAssessmentYear()) {
                masterData=data.sections;
                break;
            }
        } 
        for (let msData of masterData) {
            deductionSum = 0;
            optionSum = 0;
            for (let usrDeduction of deductions) {
                if (msData.name == this.getSectionName(usrDeduction.deductionSection)) {
                    //check if section has options but options don't have limits e.g. 80C
                    if (msData.limit > 0) {
                        //set limit to percentage amount
                        if(msData.limit<=100) {
                            msData.limit=this.grossTotalIncome * msData.limit/100;
                        }
                        if (msData.options.length > 0)
                            deductionSum += usrDeduction.deductionValue;
                        //check if section has no option and has limit
                        else if (msData.options.length == 0) {
                            deductionSum = usrDeduction.deductionValue;
                            if (deductionSum > msData.limit) {
                                deductionSum = msData.limit;
                            }
                        }
                        if (deductionSum >= msData.limit)
                            deductionSum = msData.limit;
                    }
                    else if(msData.limit==-1) {
                        deductionSum = usrDeduction.deductionValue;
                    }
                    //check options with its limit
                    else if (msData.limit == 0) {
                        for (let p = 0; p < msData.options.length; p++) {
                            if (msData.options[p].name == usrDeduction.deductionSection) {
                                deductionSum += usrDeduction.deductionValue;
                                if (deductionSum > msData.options[p].limit) {
                                    deductionSum = msData.options[p].limit;
                                }

                            }
                        }
                    }
                }
            }
            usrSections.push({ name: msData.name, amount: deductionSum });
        }
        return usrSections;
    }

    private calculateTaxPerSlab(netTotalIncome: number)  {

        let tax = 0;
        let slabResults = [];
        let slabTax = 0;
        let slabList=this._configuration.slabs;
        let slabs;
        for(let data of slabList) {
            if(data.ayYear==this.getAssessmentYear()) {
                slabs= data.slabLimits;
                break;
            }
        }
        for (let slab of slabs) {
            slabTax = 0;
            let slabResult = new SlabResult();
            //first slab has exemption			 
            if (netTotalIncome >= slab.max) {
                slabTax = Math.ceil(((slab.max - slab.min) * slab.rate) / 100);
            }
            else if (netTotalIncome >= slab.min) {
                slabTax = Math.ceil(((netTotalIncome - slab.min) * slab.rate) / 100);
            }

            slabResult.min = slab.min;
            slabResult.max = slab.max;
            slabResult.taxableAmount = slab.max - slab.min;
            slabResult.tax = slabTax;
            slabResult.cessTax = Math.ceil(slabTax * 3 / 100);
            slabResult.totalTax = slabResult.tax + slabResult.cessTax;
            slabResults.push(slabResult);
        }
        for (let i = 0; i < slabResults.length; i++)
            tax += slabResults[i].totalTax;
        
        return slabResults;
        // console.log(slabResults);
        // console.log(tax);
    }

    private getSectionName(usrSectionName) {
        let index = usrSectionName.indexOf("_");
        if (index == -1)
            return usrSectionName;
        return usrSectionName.substring(0, index);
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

    onDeductionChange() {
        this.addSection();
    }

    onChangeCalculateDeductionAmount(formData: any) {
        let sum = 0;
        for (let deduction of formData.form.value) {
            sum += deduction.amount;
        }
    }

    // private getSectionsArray(sections: any[]) {
    //     sections.forEach(element => {
    //         if (element.HasOption) {
    //             for (let i = 0; i < element.SectionOptions.length; i++) {
    //                 this.deductionList.push({ "value": element.Name + "_" + (i + 1), "text": element.SectionOptions[i].Name, "section": element.Name });
    //             }
    //         }
    //         else {
    //             this.deductionList.push({ "value": element.Name, "text": element.Description,"section": element.Name  });
    //         }
    //     });        
    // }
    private getSectionsArray(sections: any[]) {
        sections.forEach(element => {
            this.deductionList.push({ "name": element.name, "text": element.text });
        });
    }

}
