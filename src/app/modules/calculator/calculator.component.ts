import { Component, OnInit, ViewContainerRef, ElementRef } from '@angular/core';
import { CalculatorModel, CalculatorInputs, Section, SectionValue } from "../../shared/models/calculatorModel";
import { AssessmentYearsModel } from '../../shared/models/assessmentYearsModel';
import { CalculatorService } from '../../services/calculator.service';
import { slimLoaderBarService } from '../../shared/services/slimLoaderBarService';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Configuration } from '../../shared/constants';
import { debug } from 'util';

 
declare var $: any;

@Component({
    selector: 'calculator',
    templateUrl: './calculator.component.html'

})
export class CalculatorComponent implements OnInit {

    public calcModel: CalculatorModel;     
    public assessmentYearsModels: AssessmentYearsModel[];
    public selectedCarId:any;
    
    constructor(private _calcService: CalculatorService, private _slimLoader: slimLoaderBarService, public toastr: ToastsManager, vcr: ViewContainerRef
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
        this.calcModel.ayLoader=true;
        this._calcService.getAssessmentYears<any[]>()
            .subscribe((data: any[]) => this.calcModel.AssessmentYearsModels = data,
             (error) => {                                    
                    this.calcModel.ayLoader = false;                         
                    this.toastr.error(this._configuration.ErrorOccurred, "Error", this._configuration.CustomOptions);                    
                    this._slimLoader.stopLoading();
                },
                () => {                   
                    this.calcModel.ayLoader = false;
                    this._slimLoader.completeLoading();
                    this.calcModel.selectedAssessmentYearId = 0;
                });

    }
    calculateGrossSalary(): void {
        this.calcModel.GrossTaxableSalary = (isNaN(this.calcModel.SalaryIncome) ? 0 : this.calcModel.SalaryIncome) + (isNaN(this.calcModel.OtherSourceIncome) ? 0 : this.calcModel.OtherSourceIncome);
    }

    calculateTax(model: any, isValid: boolean): void {        
        if(!this.validateFormData(model.Category, model.assessmentYearId)){
            return;
        }
       
        let calculatorInputs = new CalculatorInputs();
        calculatorInputs.assessmentYearId = model.assessmentYearId;
        calculatorInputs.Category = model.Category;
        calculatorInputs.OtherSourceIncome = model.OtherSourceIncome;
        calculatorInputs.SalaryIncome = model.SalaryIncome;
        calculatorInputs.GrossTaxableSalary = (isNaN(this.calcModel.SalaryIncome) ? 0 : this.calcModel.SalaryIncome) + (isNaN(this.calcModel.OtherSourceIncome) ? 0 : this.calcModel.OtherSourceIncome);
        calculatorInputs.OtherDeductions = (isNaN(model.OtherDeductions) == true || model.OtherDeductions == null) ? 0 : model.OtherDeductions;
         
        calculatorInputs.SectionValues = [];

        calculatorInputs.SectionValues.push(new SectionValue("80C", (isNaN(model.Section80C) == true || model.Section80C == null) ? 0 : model.Section80C));
        calculatorInputs.SectionValues.push(new SectionValue("80D", (isNaN(model.Section80D) == true || model.Section80D == null) ? 0 : model.Section80D));
        calculatorInputs.SectionValues.push(new SectionValue("24", (isNaN(model.Section24) == true || model.Section24 == null) ? 0 : model.Section24));
        calculatorInputs.SectionValues.push(new SectionValue("TTA", (isNaN(model.SectionTTA) == true || model.SectionTTA == null) ? 0 : model.SectionTTA));
        calculatorInputs.SectionValues.push(new SectionValue("80G", (isNaN(model.Section80G) == true || model.Section80G == null) ? 0 : model.Section80G));
        calculatorInputs.SectionValues.push(new SectionValue("80E", (isNaN(model.Section80E) == true || model.Section80E == null) ? 0 : model.Section80E));
        calculatorInputs.SectionValues.push(new SectionValue("OtherDeductions", calculatorInputs.OtherDeductions));
        calculatorInputs.SelectedMediClaim = this.calcModel.SelectedMediClaim;

        this.calcModel.calculateTaxLoader = true;
        this._calcService.calculateTax<any>(calculatorInputs)
            .subscribe((data: any) => this.calcModel.CalculationResult = data, 
                  (error) => {                    
                    this.toastr.error(this._configuration.ErrorOccurred, "Error", this._configuration.CustomOptions);
                    this.calcModel.calculateTaxLoader = false;
                    this._slimLoader.stopLoading();
                },
                () => {                  
                    this.calcModel.calculateTaxLoader = false;
                    this._slimLoader.completeLoading();
                    $("html, body").animate({ scrollTop: $(document).height() }, 1000);
                });

    }

    onMediClaimChange(claimType: string, amount: number) {
        this.calcModel.SelectedMediClaim = claimType;
        this.calcModel.SelectedMediClaimValue = amount;
    }

    onChange(categoryId, assessmentYearId,control) {    
        this.calcModel.CalculationResult = null;  
        if(isNaN(categoryId)){
            categoryId = parseInt(categoryId.substr(categoryId.indexOf(":") + 1).trim());    
        }
        if(isNaN(assessmentYearId)){
            assessmentYearId = parseInt(assessmentYearId.substr(assessmentYearId.indexOf(":") + 1).trim());    
        }
       
        this.calcModel.Sections = [];        
        if(control=="categoryChanged"){
            this.calcModel.sectionLoader = true;
        }
        else if(control=="yearChanged") {        
            if(categoryId==0) {
                this.calcModel.sectionLoader = false;
                this.calcModel.ayLoader = false;
                return;
            }
            this.calcModel.ayLoader = true;
        }
        if(!this.validateFormData(categoryId,assessmentYearId)){
            this.calcModel.sectionLoader = false;
            this.calcModel.ayLoader = false;
            return;
        }
       
        this._calcService
            .getSections<Section[]>(assessmentYearId, categoryId)
            .subscribe((data: Section[]) => this.calcModel.Sections = data,
                (error) => {
                    this.calcModel.sectionLoader = false;                    
                    this.toastr.error(this._configuration.ErrorOccurred, "Error", this._configuration.CustomOptions);
                    this._slimLoader.stopLoading();
                },
                () => {
                    this._slimLoader.completeLoading();
                    this.calcModel.sectionLoader = false;
                    this.calcModel.ayLoader = false;
                    if (this.calcModel.Sections !== null && this.calcModel.Sections.length>0) {                        
                        this.onMediClaimChange('SelfWithFamily', this.calcModel.Sections[1].Mediclaim.SelfWithFamily);
                    }
                });
    }

    validateFormData(category: number,assementYearId:number) {
        if (category==undefined ||  category == 0) { 
            this.toastr.warning("Please choose 'who you are'", "Warning", this._configuration.CustomOptions);
            return false;
        }
        else if (assementYearId == undefined || assementYearId == 0){
            this.toastr.warning("Please choose 'Assessment year'", "Warning", this._configuration.CustomOptions);
            return false;
        }
        return true;
    }
}