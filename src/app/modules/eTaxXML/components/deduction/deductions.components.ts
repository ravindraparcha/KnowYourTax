import { Component, OnInit, EventEmitter, Output, ViewContainerRef, Input } from "@angular/core";
import { Configuration } from '../../../../shared/constants';
import { DeductionModel, SlabResult, TaxComputationModel, IncomeTaxModel, TaxModel } from '../../models/deduction.model';
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
    //private assessmentYear;
    public calculationResult = {};
    public taxComputationModel: TaxComputationModel;
    public incomeTaxModel: IncomeTaxModel;

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
        //this.assessmentYear = currentDate.getFullYear() + "-" + (currentDate.getFullYear() + 1);

        this.getSectionsArray(this._configuration.deductionList);
        this.sectionForm = this._fb.group({
            itemRows: this._fb.array([this.initialiseNewRow('', 0, '', '')]) // here
        });

        //remove the first item from the form
        const control = <FormArray>this.sectionForm.controls['itemRows'];
        for (let i = control.length - 1; i >= 0; i--) {
            control.removeAt(i)
        }
        this.taxComputationModel = new TaxComputationModel();
        this.incomeTaxModel = new IncomeTaxModel();
        this.incomeTaxModel.userTaxModel = [];
        this.incomeTaxModel.systemTaxModel = [];
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

        let deductionList = this.getSectionWithLimitAndAmount(formData.value.itemRows);
        this.incomeTaxModel.userTaxModel = [];
        this.incomeTaxModel.systemTaxModel = [];
        for (let deduction of deductionList) {
            this.incomeTaxModel.userTaxModel.push({ name: deduction.name, amount: deduction.enteredAmount, option: deduction.optionIndex });
            this.incomeTaxModel.systemTaxModel.push({ name: deduction.name, amount: deduction.limit, option: 0 });
        }
        //console.log(deductionList);
        let deductionApplicable = 0;
        for (let deduction of deductionList) {
            if (deduction.parent != "") {
                for (let i = 0; i < this.incomeTaxModel.systemTaxModel.length; i++) {
                    if (this.incomeTaxModel.systemTaxModel[i].name == deduction.name) {
                        deductionApplicable += this.incomeTaxModel.systemTaxModel[i].amount;
                        break;
                    }
                }
            }
            else {
                if (deduction.enteredAmount >= deduction.limit)
                    deductionApplicable += deduction.limit;
                else
                    deductionApplicable += deduction.enteredAmount;
            }
        }

        //calculate rebate amount
        let slabList = this._configuration.slabs;
        let slabData;
        for (let data of slabList) {
            if (data.ayYear == this.getAssessmentYear()) {
                slabData = data;
                break;
            }
        }

        let netTaxableIncome = this.grossTotalIncome - deductionApplicable;
        if (netTaxableIncome <= slabData.rebateLimit)
            this.taxComputationModel.rebateAmt = slabData.rebateAmount;



        let slabResults = {};
        slabResults = this.calculateTaxPerSlab(netTaxableIncome);
        console.log(slabResults);
        //console.log(this.taxComputationModel);
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

    private getAssessmentYear(): string {
        let currentDate = new Date();
        let nextDate = new Date(currentDate.getFullYear() + 1, currentDate.getMonth() + 1, currentDate.getDate());
        return (currentDate.getFullYear() + "-" + nextDate.getFullYear());
    }
    private getSectionWithLimitAndAmount(deductions) {

        let dSum = 0;        
        let masterDataList = this._configuration.masterSec;
        let usrSections = [];
        let enteredAmount = 0;
        let sectionOptionIndex = 0;
        let masterData;
        for (let data of masterDataList) {
            if (data.ayYear == this.getAssessmentYear()) {
                masterData = data.sections;
                break;
            }
        }

        for (let msData of masterData) {
            dSum = 0;
            sectionOptionIndex = 0;
            enteredAmount=0;
            for (let usrDeduction of deductions) {
                if (msData.name == this.getSectionName(usrDeduction.deductionSection)) {
                    if (msData.limit > 0) {

                        //set limit to percentage amount
                        if (msData.limit <= 100 && msData.limit != -1) {
                            let percentageAmt = this.grossTotalIncome * msData.limit / 100;
                            //msData.limit = percentageAmt;
                            enteredAmount = percentageAmt;
                        }
                        if (msData.options.length > 0) {
                            if (usrDeduction.deductionValue > msData.limit) {
                                dSum += msData.limit;
                                enteredAmount += msData.limit;
                            }
                            else {
                                dSum += usrDeduction.deductionValue;
                                enteredAmount += usrDeduction.deductionValue;
                            }                         
                        }
                    }
                    else if (msData.limit == 0) {
                        if (msData.parent !== "") {
                            dSum += usrDeduction.deductionValue;
                            enteredAmount += usrDeduction.deductionValue;
                        }
                        else if (msData.parent == "") {
                            for (let p = 0; p < msData.options.length; p++) {
                                if (msData.options[p].name === usrDeduction.deductionSection) {
                                    if (usrDeduction.deductionValue > msData.options[p].limit && msData.options[p].limit > 0) {
                                        dSum += msData.options[p].limit;
                                        enteredAmount += usrDeduction.deductionValue;
                                    }
                                    else {
                                        dSum += usrDeduction.deductionValue;
                                        enteredAmount += usrDeduction.deductionValue;
                                    }
                                }
                            }
                        }
                        let index = usrDeduction.deductionSection.indexOf("_");
                        if (index > 0) {
                            sectionOptionIndex = usrDeduction.deductionSection.substring(index + 1);
                        }
                    }
                    else if (msData.limit == -1) {
                        dSum += usrDeduction.deductionValue;
                        //msData.limit = dSum;
                        enteredAmount=dSum;
                    }

                }

            }
            usrSections.push({ name: msData.name, limit: dSum, enteredAmount: enteredAmount, optionIndex: sectionOptionIndex, parent: msData.parent });           
        }
        for (let usrSection of usrSections) {
            if (usrSection.parent !== "") {
                for (let msData of masterData) {
                    if (usrSection.parent == msData.name) {
                        //limit of parent 
                        let parentValue;
                        //loop through to get value passed for section
                        for (let usrDedn of deductions) {
                            if (this.getSectionName(usrDedn.deductionSection) == msData.name) {
                                parentValue = usrDedn.deductionValue;
                                break;
                            }
                        }
                        if (parentValue >= msData.limit)
                            usrSection.limit = 0;
                        else if (parentValue < msData.limit) {
                            var difference = msData.limit - parentValue;
                            if (usrSection.enteredAmount > difference)
                                usrSection.limit = difference;
                        }
                    }
                }
            }
        }       
        return usrSections;
    }
    // private getSectionWithLimitAndAmount(deductions) {
    //     let masterDataList = this._configuration.masterSec;
    //     let deductionSum = 0
    //     let limitCrossed = true;
    //     let usrSections = [];
    //     let enteredAmount = 0;
    //     let sectionOptionIndex = 0;
    //     let masterData;
    //     for (let data of masterDataList) {
    //         if (data.ayYear == this.getAssessmentYear()) {
    //             masterData = data.sections;
    //             break;
    //         }
    //     }
    //     for (let msData of masterData) {
    //         deductionSum = 0;
    //         enteredAmount = 0;
    //         sectionOptionIndex = 0;
    //         for (let usrDeduction of deductions) {
    //             if (msData.name == this.getSectionName(usrDeduction.deductionSection)) {

    //                 //check if section has options but options don't have limits e.g. 80C
    //                 if (msData.limit > 0) {
    //                     //set limit to percentage amount
    //                     if (msData.limit <= 100 && msData.limit != -1) {
    //                         let percentageAmt = this.grossTotalIncome * msData.limit / 100;
    //                         msData.limit = percentageAmt;
    //                         enteredAmount = percentageAmt;
    //                     }
    //                     if (msData.options.length > 0) {
    //                         deductionSum += usrDeduction.deductionValue;
    //                         enteredAmount += usrDeduction.deductionValue;
    //                     }
    //                     //check if section has no option and has limit
    //                     else if (msData.options.length == 0) {
    //                         deductionSum = usrDeduction.deductionValue;
    //                         enteredAmount = usrDeduction.deductionValue;
    //                         if (deductionSum > msData.limit && msData.parent == "") {
    //                             deductionSum = msData.limit;
    //                         }
    //                     }
    //                     if (deductionSum >= msData.limit)
    //                         deductionSum = msData.limit;
    //                 }
    //                 else if (msData.limit == -1) {
    //                     deductionSum = usrDeduction.deductionValue;
    //                     enteredAmount = usrDeduction.deductionValue;
    //                 }
    //                 //check options with its limit
    //                 else if (msData.limit == 0) {
    //                     for (let p = 0; p < msData.options.length; p++) {
    //                         if (msData.options[p].name == usrDeduction.deductionSection) {
    //                             deductionSum += usrDeduction.deductionValue;
    //                             enteredAmount = usrDeduction.deductionValue;
    //                             if (deductionSum > msData.options[p].limit) {
    //                                 deductionSum = msData.options[p].limit;
    //                             }

    //                         }
    //                         let index = usrDeduction.deductionSection.indexOf("_");
    //                         if (index > 0) {
    //                             sectionOptionIndex = usrDeduction.deductionSection.substring(index + 1);
    //                         }
    //                     }
    //                 }
    //             }
    //         }
    //         usrSections.push({ name: msData.name, limit: deductionSum, enteredAmount: enteredAmount, optionIndex: sectionOptionIndex, parent: msData.parent });
    //     }

    //     //80CCC comes under section 80C but is different section
    //     let enteredAmt = 0;
    //     for (let msData of masterData) {
    //         if (msData.parent !== "") {
    //             for (let usrSec of usrSections) {
    //                 if (usrSec.name == msData.parent) {
    //                     enteredAmt = usrSec.enteredAmount;
    //                 }
    //                 else if (usrSec.name == msData.name) {
    //                     let difference = msData.limit - enteredAmt;
    //                     if (difference > 0 && difference < usrSec.enteredAmount)
    //                         usrSec.limit = difference;
    //                     else
    //                         usrSec.limit = 0;
    //                 }
    //             }
    //         }
    //     }

    //     return usrSections;
    // }

    private calculateTaxPerSlab(netTotalIncome: number) {

        let tax = 0;
        let slabResults = [];
        let slabTax = 0;
        let slabList = this._configuration.slabs;
        let slabs;
        let slabData;
        for (let data of slabList) {
            if (data.ayYear == this.getAssessmentYear()) {
                slabData = data;
                break;
            }
        }
        slabs = slabData.slabLimits;
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
            slabResult.cessTax = Math.ceil(slabTax * slabData.cess / 100);
            slabResult.totalTax = slabResult.tax + slabResult.cessTax;
            slabResults.push(slabResult);
        }
        for (let i = 0; i < slabResults.length; i++)
            tax += slabResults[i].totalTax;
        console.log(tax);
        return slabResults;
        // console.log(slabResults);

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
