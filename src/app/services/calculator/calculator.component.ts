import { Component, OnInit, ViewContainerRef, ElementRef } from '@angular/core';
import { CalculatorModel, CalculatorInputs, Section, SectionValue } from "../../models/calculatorModel";
import { AssessmentYearsModel } from '../../models/assessmentYearsModel';
import { CalculatorDataService } from '../../dataServices/calculator.dataservice';
import { slimLoaderBarService } from '../../shared/services/slimLoaderBarService';
//import {ToasterService} from '../../shared/services/toasterService';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Configuration } from '../../shared/constants';
import { debug } from 'util';

declare var jquery: any;
declare var $: any;


@Component({
    selector: 'calculator',
    templateUrl: './calculator.component.html'

})
export class CalculatorComponent implements OnInit {

    public calcModel: CalculatorModel;
    public values: any;
    public assessmentYearsModels: AssessmentYearsModel[];

    constructor(private _calcService: CalculatorDataService, private _slimLoader: slimLoaderBarService, public toastr: ToastsManager, vcr: ViewContainerRef
        , private _configuration: Configuration) {
        this.toastr.setRootViewContainerRef(vcr);

    }
    CategoryList = [
        { "CategoryId": 1, "CategoryName": "Male" },
        { "CategoryId": 2, "CategoryName": "Female" },
        { "CategoryId": 3, "CategoryName": "Senior Citizen or > 60 years" },
        { "CategoryId": 4, "CategoryName": "Super Senior Citizen or > 80 years" }
    ];
    ngOnInit() {

        this.calcModel = new CalculatorModel();
        this.calcModel.selectedCategory = 0;
        this.calcModel.OtherDeductions=0;
        this._calcService.getAssessmentYears<any[]>()
            .subscribe((data: any[]) => this.calcModel.AssessmentYearsModels = data,
                error => () => {
                    this.calcModel.calculateTaxLoader = false;
                    //this._toasterService.pop('error', 'Damn', 'Something went wrong...');                
                    this.toastr.success("Some error occurred", "Error", this._configuration.customOptions);

                },
                () => {
                    //this._toasterService.pop('success', 'Complete', 'Getting all values complete');
                    //this._slimLoadingBarService.complete();
                    // debugger;
                    // var a = this.calcModel.AssessmentYearsModels;

                    this.calcModel.calculateTaxLoader = false;
                    this._slimLoader.completeLoading();
                    //$('#assessmentYearId').val("1: 1");
                    this.calcModel.selectedAssessmentYearId = 1;
                });

    }
    calculateGrossSalary(): void {
        this.calcModel.GrossTaxableSalary = (isNaN(this.calcModel.SalaryIncome) ? 0 : this.calcModel.SalaryIncome) + (isNaN(this.calcModel.OtherSourceIncome) ? 0 : this.calcModel.OtherSourceIncome);
    }

    calculateTax(model: any, isValid: boolean): void {
        if (model.Category == 0) {
            return;
        }
        this.calcModel.calculateTaxLoader = true;
        let calculatorInputs = new CalculatorInputs();
        calculatorInputs.assessmentYearId = model.assessmentYearId;
        calculatorInputs.Category = model.Category;
        calculatorInputs.OtherSourceIncome = model.OtherSourceIncome;
        calculatorInputs.SalaryIncome = model.SalaryIncome;
        calculatorInputs.GrossTaxableSalary = (isNaN(this.calcModel.SalaryIncome) ? 0 : this.calcModel.SalaryIncome) + (isNaN(this.calcModel.OtherSourceIncome) ? 0 : this.calcModel.OtherSourceIncome);
        calculatorInputs.OtherDeductions = model.OtherDeductions;
         
        calculatorInputs.SectionValues = [];

        calculatorInputs.SectionValues.push(new SectionValue("80C", (isNaN(model.Section80C) == true || model.Section80C == null) ? 0 : model.Section80C));
        calculatorInputs.SectionValues.push(new SectionValue("80D", (isNaN(model.Section80D) == true || model.Section80D == null) ? 0 : model.Section80D));
        calculatorInputs.SectionValues.push(new SectionValue("24", (isNaN(model.Section24) == true || model.Section24 == null) ? 0 : model.Section24));
        calculatorInputs.SectionValues.push(new SectionValue("TTA", (isNaN(model.SectionTTA) == true || model.SectionTTA == null) ? 0 : model.SectionTTA));
        calculatorInputs.SectionValues.push(new SectionValue("80G", (isNaN(model.Section80G) == true || model.Section80G == null) ? 0 : model.Section80G));
        calculatorInputs.SectionValues.push(new SectionValue("80E", (isNaN(model.Section80E) == true || model.Section80E == null) ? 0 : model.Section80E));
        calculatorInputs.SectionValues.push(new SectionValue("OtherDeductions", model.OtherDeductions));
        calculatorInputs.SelectedMediClaim = this.calcModel.SelectedMediClaim;

        this._calcService.calculateTax<any>(calculatorInputs)
            .subscribe((data: any) => this.calcModel.CalculationResult = data,  //this.calcModel.TaxToPay = data,
                error => () => {
                    //this._toasterService.pop('error', 'Damn', 'Something went wrong...');
                    this.toastr.success("Some error occurred", "Error", this._configuration.customOptions);
                    this.calcModel.calculateTaxLoader = false;
                },
                () => {
                    //this._toasterService.pop('success', 'Complete', 'Getting all values complete');
                    //this._slimLoadingBarService.complete();
                    // debugger;
                    // var a = this.calcModel.AssessmentYearsModels;         
                    var a = this.calcModel.CalculationResult.IntermediateOutputs;
                    this.calcModel.calculateTaxLoader = false;
                    this._slimLoader.completeLoading();
                });

    }

    onMediClaimChange(claimType: string, amount: number) {
        this.calcModel.SelectedMediClaim = claimType;
        this.calcModel.SelectedMediClaimValue = amount;
    }

    onCategoryChange(categoryId: string, assessmentYearId: number) {
        this.calcModel.sectionLoader = true;
        if (assessmentYearId == undefined)
            return;
        this.calcModel.Sections = [];
        let category = parseInt(categoryId.substr(categoryId.indexOf(":") + 1).trim());
        this._calcService
            .getSections<Section[]>(assessmentYearId, category)
            .subscribe((data: Section[]) => this.calcModel.Sections = data,
                error => () => {
                    this.calcModel.sectionLoader = false;
                    //this._toasterService.pop('error', 'Damn', 'Something went wrong...');
                    this.toastr.success("Some error occurred", "Error", this._configuration.customOptions);
                },
                () => {
                    this._slimLoader.completeLoading();
                    this.calcModel.sectionLoader = false;
                    if (this.calcModel.Sections !== null) {                        
                        this.onMediClaimChange('SelfWithFamily', this.calcModel.Sections[1].Mediclaim.SelfWithFamily);
                    }

                });

    }

}