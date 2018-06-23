import { Component, OnInit, EventEmitter, Output, ViewContainerRef, Input } from "@angular/core";
import { ConfigurationService } from  '../../../shared/ConfigurationService';
import { DeductionModel, SlabResult, TaxComputationModel, IncomeTaxModel, TaxModel, AdvanceTaxModel } from '../../models/deduction.model';
import { FormBuilder, FormControl, FormArray, FormGroup } from '@angular/forms';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { slimLoaderBarService } from  '../../../shared/services/slimLoaderBarService';
 
import { CalculatorModel, CalculatorInputs, Section, SectionValue } from "../../models/calculatorModel";
import { INgxMyDpOptions, IMyDateModel } from "ngx-mydatepicker";
import { SharedTaxService } from '../../services/sharedTaxService';
import { Subscription } from 'rxjs/Rx';
declare var $: any;

@Component({
    selector: 'deductions',
    templateUrl: './deductions-component.html'
})

export class DeductionsComponent implements OnInit {
    public selectedSectionValue;
    public deductionList = [];
    public sectionForm;

    public calculationResult = {};
    public taxComputationModel: TaxComputationModel;
    public incomeTaxModel: IncomeTaxModel;
    public deductionModel: DeductionModel;
    public advanceTaxModels: AdvanceTaxModel[];
    public selfAssessmentAdvanceTax: any[];
    private _subscription: Subscription;
    private _returnFiledSection: number;
    private selfAssessmentTaxPaid:number=0;
    private advanceTaxForm26AS : number=0;
    @Input() grossTotalIncome: number;
    @Output() onCalculateDeductionSum: EventEmitter<any> = new EventEmitter<any>();

    @Input()
    set advanceTaxAlreadyPaid(taxModel: any[]) {
        this.advanceTaxModels=[];        
        if (this.deductionModel === undefined)
            this.deductionModel = new DeductionModel();       
        if (taxModel !== undefined) {
            this.advanceTaxForm26AS = 0;
            for (let i = 0; i < taxModel.length; i++) {
                this.advanceTaxForm26AS += taxModel[i].amount;
            }
            this.advanceTaxModels = taxModel;
        }

    }

    myOptions: INgxMyDpOptions = {
        dateFormat: this._configuration.dateTimeFormat,
        //disableSince: { year: new Date().getFullYear(), month: 4, day: 1 }
    };

    constructor(private _configuration: ConfigurationService, private _fb: FormBuilder,
         private toastr: ToastsManager, vcr: ViewContainerRef,
        private _slimLoader: slimLoaderBarService, private _sharedTaxService: SharedTaxService) {
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
        this.incomeTaxModel.taxComputationModel = this.taxComputationModel;
        if (this.deductionModel == undefined)
            this.deductionModel = new DeductionModel();
        this.advanceTaxModels=[];
        this.deductionModel.advanceTax = 0;

        this._subscription = this._sharedTaxService.getSelfAssessmentAdvanceTax().subscribe(item => this.selfAssessmentAdvanceTax = item);
        this._subscription = this._sharedTaxService.getReturnFiledSection().subscribe(item => this._returnFiledSection = item);
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

    onDueDateChanged(event: IMyDateModel) {
        // console.log('onDateChanged(): ', event.date, ' - jsdate: ', new Date(event.jsdate).toLocaleDateString(), ' - formatted: ', event.formatted, ' - epoc timestamp: ', event.epoc);
        if (event.date.day != 0) {
            this.deductionModel.dueDate = event.jsdate.toString();  //event.date.day + "/" + event.date.month + "/" + event.date.year;            
        }
        else {
            this.deductionModel.dueDate = "";
        }
    }
    onFilingDateChanged(event: IMyDateModel) {
        // console.log('onDateChanged(): ', event.date, ' - jsdate: ', new Date(event.jsdate).toLocaleDateString(), ' - formatted: ', event.formatted, ' - epoc timestamp: ', event.epoc);
        if (event.date.day != 0) {
            this.deductionModel.filingDate = event.jsdate.toString();  //event.date.day + "/" + event.date.month + "/" + event.date.year;            
        }
        else {
            this.deductionModel.filingDate = "";
        }
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

    calculateTax(): IncomeTaxModel {

        this.createAdvanceTaxModelArray(this.selfAssessmentAdvanceTax);

        this.deductionModel.advanceTax =this.advanceTaxForm26AS + this.selfAssessmentTaxPaid;

        if (this.sectionForm == undefined)
            return new IncomeTaxModel();

        let deductionList = this.getSectionWithLimitAndAmount(this.sectionForm.value.itemRows);// Data.value.itemRows);
        //console.log(deductionList);
        this.incomeTaxModel.userTaxModel = [];
        this.incomeTaxModel.systemTaxModel = [];

        this.incomeTaxModel.usrDeductionSum = 0;
        this.incomeTaxModel.sysDeductionSum = 0;
        for (let deduction of deductionList) {
            this.incomeTaxModel.userTaxModel.push({ name: deduction.name, amount: deduction.enteredAmount, option: deduction.optionIndex });
            this.incomeTaxModel.systemTaxModel.push({ name: deduction.name, amount: deduction.limit, option: 0 });
            this.incomeTaxModel.usrDeductionSum += deduction.enteredAmount;
            this.incomeTaxModel.sysDeductionSum += deduction.limit;
        }
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
        //Total income - as per excel
        let netTaxableIncome = this.grossTotalIncome - deductionApplicable;

        let slabResults = [];
        slabResults = this.calculateTaxPerSlab(netTaxableIncome);

        let totalTax = 0;
        this.taxComputationModel.cessTax = 0;
        for (let result of slabResults) {
            totalTax += result.tax;
            this.taxComputationModel.cessTax += result.cessTax;
        }

        //calculate tax if total tax(without cess charges) to pay is less than rebateAmount set
        //referece:- https://cleartax.in/s/income-tax-rebate-us-87a
        if (totalTax <= slabData.rebateAmount && totalTax > 0)
            this.taxComputationModel.taxPayableAfterRebate = totalTax - slabData.rebateAmount;
        else
            this.taxComputationModel.taxPayableAfterRebate = totalTax;


        this.taxComputationModel.totalTaxAndCess = this.taxComputationModel.taxPayableAfterRebate + this.taxComputationModel.cessTax;
        this.taxComputationModel.balanceTaxAfterRelief = this.taxComputationModel.totalTaxAndCess - this.deductionModel.relief;


        //Calculate interest rate 234 start
        // if (this.taxComputationModel.balanceTaxAfterRelief < this._configuration.taxLiability) {
        //     this.taxComputationModel.feeUnder234F = 0;
        //     this.taxComputationModel.interest234A = 0;
        //     this.taxComputationModel.interest234B = 0;
        //     this.taxComputationModel.interest234C = 0;
        //     //return;
        // }
        this.taxComputationModel.feeUnder234F = 0;
        this.taxComputationModel.interest234A = 0;
        this.taxComputationModel.interest234B = 0;
        this.taxComputationModel.interest234C = 0;

        this.taxComputationModel.taxPayableOnTotalIncome = totalTax;
        this.taxComputationModel.reliefUnder89 = this.deductionModel.relief;
        this.taxComputationModel.balanceTaxAfterRelief = this.taxComputationModel.totalTaxAndCess - this.taxComputationModel.reliefUnder89;

        let dueDt ;
        let filingDt;
        if(this.deductionModel.filingDate==null || this.deductionModel.dueDate) {
            dueDt = undefined;
            filingDt = undefined;
        }
        else {
            dueDt = this.deductionModel.dueDate["jsdate"];
            filingDt = this.deductionModel.filingDate["jsdate"];
        }
        
        if (dueDt != undefined && filingDt != undefined) {
            let diffDate: number;
            let days = 0;
            let taxAfterTDS = this.taxComputationModel.balanceTaxAfterRelief - this.deductionModel.advanceTax;
            //section  234A
            if (filingDt > dueDt) {
                diffDate = Math.abs(filingDt.getTime() - dueDt.getTime() + 1);
                days = Math.ceil(diffDate / (1000 * 3600 * 24));
                if (days > 0) {
                    let months = Math.ceil(days / (365.25 / 12));
                    taxAfterTDS = taxAfterTDS - taxAfterTDS % 100;
                    this.taxComputationModel.interest234A = Math.ceil(((months * 1) * taxAfterTDS / 100));
                }
            }
            else
                this.taxComputationModel.interest234A = 0;

            //Section 234B is directly calculated from april to that month date
            //Section 234B calculation 
            //tax is always calculated from April 
            let taxCalculateDate = new Date(new Date().getFullYear(), 3, 1);
            diffDate = Math.abs(filingDt.getTime() - taxCalculateDate.getTime() + 1);
            days = Math.ceil(diffDate / (1000 * 3600 * 24));
            if (days > 0) {

                let months = Math.ceil(days / (365.25 / 12));
                let partOfTax = (this.taxComputationModel.balanceTaxAfterRelief * 90 / 100);

                if ((taxAfterTDS > this._configuration.taxLiability) || partOfTax > this.deductionModel.advanceTax) {
                    taxAfterTDS = taxAfterTDS - taxAfterTDS % 100;
                    this.taxComputationModel.interest234B = Math.ceil(((months * 1) * taxAfterTDS) / 100);
                }
            }
            //section 234C
            //https://cleartax.in/s/interest-imposed-by-income-tax-department-under-section-234c    
            let taxToPay = this.taxComputationModel.balanceTaxAfterRelief;
            let advanceTaxDeposited = 0;;
            if (this.taxComputationModel.balanceTaxAfterRelief > this._configuration.taxLiability) {
                let mntArray = [3, 6, 9, 12];
                let taxPercentageArr = [15, 45, 75, 100];
                let quarterLastDate;
                for (let i = 0; i < mntArray.length; i++) {
                    let fDate = new Date(filingDt.getFullYear() - 1, 0, 15);
                    fDate.setMonth(mntArray[i] - 1);
                    let lDate = new Date(filingDt.getFullYear() - 1, 0, 15);
                    lDate.setMonth(mntArray[i] + 2);
                    if (lDate >= filingDt)
                        break;

                    let tax = taxToPay * taxPercentageArr[i] / 100;
                    let months;
                    if (i < 3)
                        months = 3;
                    else
                        months = 1;

                    if (this.advanceTaxModels !== undefined && this.advanceTaxModels.length > 0) {
                        let advanceTax = 0;
                        for (let j = 0; j < this.advanceTaxModels.length; j++) {
                            let d = new Date(this.advanceTaxModels[j].transactionDate);
                            if (d >= fDate && d <= lDate) {
                                advanceTaxDeposited += this.advanceTaxModels[j].amount;
                            }
                        }
                        let balanceAdvanceTax;
                        if (advanceTaxDeposited > tax)
                            balanceAdvanceTax = 0;
                        else
                            balanceAdvanceTax = (tax - advanceTaxDeposited) - (tax - advanceTaxDeposited) % 100;

                        let diffDate: number;
                        diffDate = Math.abs(filingDt.getTime() - dueDt.getTime());

                        // for 234C, tax is calculated for all 3 months, for last installment, tax will be calculated for 1 month

                        let interTax = ((months * 1) * balanceAdvanceTax) / 100;
                        if ((i == 0 && interTax >= (this.taxComputationModel.balanceTaxAfterRelief * 12) / 100)
                            || (i == 1 && interTax >= (this.taxComputationModel.balanceTaxAfterRelief * 36) / 100)) {
                            this.taxComputationModel.interest234C += 0;
                        }
                        else
                            this.taxComputationModel.interest234C += interTax;
                    }
                    else {
                        this.taxComputationModel.interest234C += ((months * 1) * tax) / 100;
                    }
                }
            }
            this.taxComputationModel.interest234C = Math.ceil(this.taxComputationModel.interest234C);


            //Section 234F
            //(a)five thousand rupees, if the return is furnished on or before the 31st day of December of the assessment year;
            //(b)ten thousand rupees in any other case:
            //https://incometaxindia.gov.in/Acts/Finance%20Acts/2017/102120000000064631.htm
            //iff its under 139
            if (this._returnFiledSection == 17) {
                let lastDate = new Date(new Date().getFullYear(), 11, 31);
                if (this.grossTotalIncome > this._configuration.sec234FTotalIncomeLimit) {
                    if (lastDate > filingDt)
                        this.taxComputationModel.feeUnder234F = 5000;
                    else
                        this.taxComputationModel.feeUnder234F = 10000;

                }
                else {
                    if (lastDate > filingDt)
                        this.taxComputationModel.feeUnder234F = 1000;
                }
            }

            // if (this.grossTotalIncome > this._configuration.sec234FTotalIncomeLimit) {
            //     let currntDate = new Date();
            //     let strtDate = new Date(currntDate.getFullYear(), 7, 1); //1 august
            //     let endDate = new Date(currntDate.getFullYear(), 11, 31); //31 december
            //     if (strtDate <= filingDt && filingDt <= endDate)
            //         this.taxComputationModel.feeUnder234F = 5000;
            //     else if (filingDt > endDate)
            //         this.taxComputationModel.feeUnder234F = 10000;
            // }
            // else {
            //     this.taxComputationModel.feeUnder234F = 1000;
            // }

        }
        this.taxComputationModel.totalInterestPayable = this.taxComputationModel.interest234A + this.taxComputationModel.interest234B + this.taxComputationModel.interest234C + this.taxComputationModel.feeUnder234F;
        this.taxComputationModel.totalTaxFeeInterest = this.taxComputationModel.balanceTaxAfterRelief + this.taxComputationModel.totalInterestPayable;
        this._sharedTaxService.changeTotalTaxAmount(this.taxComputationModel.totalTaxFeeInterest);

        //console.log(slabResults);
        this.taxComputationModel = this.taxComputationModel;
        return this.incomeTaxModel;
        //this.showCalculation();         
    }

    private createAdvanceTaxModelArray(selfAssmntAdvnceTaxArr) {
        if (selfAssmntAdvnceTaxArr === undefined)
            return;
        this.advanceTaxModels = this.advanceTaxModels.filter(x=>x.isAdvanceTax!=true);
        let advanceTaxModel;
        let month: number, year: number, date: number;
        this.selfAssessmentTaxPaid=0;
        for (let selfAssmntAdvnceTx of selfAssmntAdvnceTaxArr) {
            date = selfAssmntAdvnceTx.depositDate.substr(0, this.getPosition(selfAssmntAdvnceTx.depositDate, "/", 1));
            month = selfAssmntAdvnceTx.depositDate.substring(this.getPosition(selfAssmntAdvnceTx.depositDate, "/", 1) + 1, this.getPosition(selfAssmntAdvnceTx.depositDate, "/", 2));
            year = selfAssmntAdvnceTx.depositDate.substr(this.getPosition(selfAssmntAdvnceTx.depositDate, "/", 2) + 1);
            this.selfAssessmentTaxPaid += selfAssmntAdvnceTx.taxPaid;
            //decrease month by 1 
            month-=1;
            let dateObj = new Date(year,month,date);
            advanceTaxModel = new AdvanceTaxModel(dateObj.toString(), selfAssmntAdvnceTx.taxPaid,true);
            this.advanceTaxModels.push(advanceTaxModel);
        }
    }
    private getPosition(source, toSearch, indexNumber): number {
        return source.split(toSearch, indexNumber).join(toSearch).length;
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
            enteredAmount = 0;
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
                                //dSum += msData.limit;
                                //enteredAmount += msData.limit;
                                enteredAmount = usrDeduction.deductionValue;
                                dSum = msData.limit;
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
                        enteredAmount = dSum;
                    }

                }

            }
            usrSections.push({ name: msData.name, limit: dSum, enteredAmount: enteredAmount, optionIndex: sectionOptionIndex, parent: msData.parent });
        }

        for (let msDt of masterData) {
            if (msDt.parent !== "")
                this.updateSectionLimit(masterData, usrSections, msDt.parent);
        }
         
        return usrSections;
    }

    private updateSectionLimit(masterData: any[], usrSections: any[], parentSectionName: string) {
        debugger;
        let balanceAmount = 0;       
        for (let msData of masterData) {
            balanceAmount = msData.limit;
            if (msData.name == parentSectionName) {
                let parentAmount = 0;                
                //finding entered value 
                for (let usrSection of usrSections) {
                    if (usrSection.name == parentSectionName) {
                        parentAmount = usrSection.enteredAmount;
                        if (parentAmount < msData.limit)
                            balanceAmount = msData.limit - parentAmount;
                        else
                            balanceAmount = 0;
                    }
                    if (usrSection.parent == parentSectionName) {
                        if (usrSection.enteredAmount > balanceAmount) {
                            //usrSection.enteredAmount = balanceAmount;
                            usrSection.limit = balanceAmount;
                            balanceAmount = 0;
                        }
                        else {

                            usrSection.limit = usrSection.enteredAmount;
                            balanceAmount = balanceAmount - usrSection.enteredAmount;
                        }
                    }
                    else if(usrSection.name==parentSectionName) {
                        if (usrSection.enteredAmount > msData.limit) {
                            //usrSection.enteredAmount = balanceAmount;
                            usrSection.limit = msData.limit;
                            
                        }
                        else {
                            usrSection.limit = usrSection.enteredAmount;                           
                        }
                    }
                }
            }
        }
    }

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
        //console.log(tax);
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

    private getSectionsArray(sections: any[]) {
        sections.forEach(element => {
            this.deductionList.push({ "name": element.name, "text": element.text });
        });
    }

}
