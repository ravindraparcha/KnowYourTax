import { Component, Input, ViewChild, OnInit } from "@angular/core";
import { ToastrService } from 'ngx-toastr';

import { Form26ASParserService } from './services/form26AS-parser-service';
import { PersonalInfoModel } from './models/personal-info.model';
import { AdvanceTaxModel, IncomeTaxModel, TaxComputationModel, TaxModel } from '../shared/models/deduction.model';
import { ConfigurationService } from '../shared/services/ConfigurationService';
import { TaxDeductedSalaryModel } from './models/tax-deducted-collected.model';
import { IncomeData } from '../../modules/shared/models/income-details.model';
import { XmlGeneratorService } from './services/xml-generator-service';

import { PersonalInfoComponent } from './components/personal-info/personal-info.component';
import { TaxPaidVerificationComponent } from './components/tax-paid-verification/tax-paid-verification.component';
import { TaxDeductedCollectedComponent } from './components/tax-deducted-collected/tax-deducted-collected.component';
import { Donation80GComponent } from './components/donation-80G/donation.80G.component';
import { IncomeDetailsComponent } from '../shared/components/income-details/income-details.component';
import { SharedTaxService } from '../shared/services/sharedTaxService';
import { Subscription } from "rxjs";


declare var $: any;

@Component({
    selector: 'eTaxXML',
    templateUrl: './eTaxXML.component.html'
})
export class eTaxXMLComponent implements OnInit {


    //child component object for xml generation
    @ViewChild(PersonalInfoComponent) _personalInfoComponent: PersonalInfoComponent;
    @ViewChild(IncomeDetailsComponent) _incomeDetailsComponent: IncomeDetailsComponent;
    @ViewChild(TaxPaidVerificationComponent) _taxPaidVerificationComponent: TaxPaidVerificationComponent;
    @ViewChild(TaxDeductedCollectedComponent) _taxDeductedCollectedComponent: TaxDeductedCollectedComponent;
    @ViewChild(Donation80GComponent) _donation80GComponent: Donation80GComponent;

    public personalInfoData = new PersonalInfoModel();
    public taxDeducted;
    private parseJson;
    private xmlDataArray = [];
    public advanceTaxPaidModels;
    public incomeData: IncomeData;
    public incomeTaxModel: any;

    public totalTDSClaimed: number = 0;
    public totalTCSClaimed: number = 0;
    public totalSelfAssessmentTaxPaid: number = 0;
    public totalAdvanceTaxPaid: number = 0;
    public totalTaxInterest: number = 0;
    public totalTaxesPaid: number = 0;
    public amountPayable: number = 0;
    public refund: number = 0;

    public accountDetailModel;
    public model: any;
    public incomeNatureList = [];
    private _subscription: Subscription;

   
    constructor(private _form26ASParserService: Form26ASParserService, private _configuration: ConfigurationService,
        private _xmlGeneratorService: XmlGeneratorService, private _toastr: ToastrService, private _sharedTaxService: SharedTaxService
    ) { }

    canDeactivate() {
        return true;
    }

    ngOnInit() {
        this.incomeTaxModel = new IncomeTaxModel();
        this.incomeTaxModel.userTaxModel = [];
        this.incomeTaxModel.systemTaxModel = [];
        this.incomeTaxModel.taxComputationModel = new TaxComputationModel();

        this._subscription = this._sharedTaxService.getTDSAmount().subscribe(item => this.totalTDSClaimed = item);
        this._subscription = this._sharedTaxService.getTCSAmount().subscribe(item => this.totalTCSClaimed = item);
        this._subscription = this._sharedTaxService.getSelfAssessmentAmount().subscribe(item => this.totalSelfAssessmentTaxPaid = item);
        this._subscription = this._sharedTaxService.getAdvanceTaxAmount().subscribe(item => this.totalAdvanceTaxPaid = item);
        // this._subscription = this._sharedTaxService.getTotalTaxAmount().subscribe(item => this.totalTaxInterest = item);
        this._subscription = this._sharedTaxService.getTotalTDSTCS().subscribe(item => this.totalTaxesPaid = item);
        this._subscription = this._sharedTaxService.getAmountPayable().subscribe(item => this.amountPayable = item);
        this._subscription = this._sharedTaxService.getRefund().subscribe(item => this.refund = item);
    }

    onFileSelection(event: EventTarget) {
        let $this = this;
        let eventObj: MSInputMethodContext = <MSInputMethodContext>event;
        let target: HTMLInputElement = <HTMLInputElement>eventObj.target;
        let files: FileList = target.files;
        if (files.length == 0)
            return;
        var reader = new FileReader();
        reader.readAsText(files[0]);
        //hiding the modal popup
        $('#form26ASModel').modal('hide');
        reader.onload = function () {
            $this.parseJson = $this._form26ASParserService.parseTextFile(reader.result);
            //convert json to appropriate model 
            $this.parseJson.forEach(element => {
                //Personal Information           
                if (element.partNumber == 0) {
                    $this.personalInfoData = $this.getPersonalInformationModel($this.parseJson.personalInfo[0].personalInfoArray);
                }
                //PART A - Details of Tax Deducted at Source
                else if (element.partNumber == 1) {
                    let result = $this.parseJson.cumulatives.filter(x => x.partNumber == 1);
                    $this.taxDeducted = [];
                    $this.taxDeducted = $this.getDeductionAtSource(result);

                }
            });
        }
    }

    private getPersonalInformationModel(arr: any[]): PersonalInfoModel {
        let personalInfoModel = new PersonalInfoModel();
        personalInfoModel.panNo = arr[0];

        let fullName = arr[4].split(' ');
        personalInfoModel.firstName = fullName[0];
        personalInfoModel.middleName = fullName[1];
        personalInfoModel.lastName = fullName[2];

        personalInfoModel.flatDoorBlockNo = arr[5];
        personalInfoModel.premisesBldgVillage = arr[6];
        personalInfoModel.roadStreetPostOffice = arr[7];
        personalInfoModel.areaLocality = arr[8];
        personalInfoModel.townCityDistrict = arr[9];
        this._configuration.stateList.forEach(element => {
            if (element.state == arr[10]) {
                personalInfoModel.selectedState = element.stateCode;
                return;
            }
        });
        personalInfoModel.zipCode = arr[11];
        return personalInfoModel;
    }

    private getDeductionAtSource(arr: any[]): TaxDeductedSalaryModel[] {
        let advanceTaxPaid = [];
        let taxDeductedSalaryModels = [];
        let taxDeductedSalaryModel;
        let financialYearStart = new Date(new Date().getFullYear() - 1, 3, 1);
        let financialYearEnd = new Date(new Date().getFullYear(), 2, 31);
        let index; let month; let day; let year;
        let taxPaidDate;
        arr.forEach(arrElement => {
            taxDeductedSalaryModel = new TaxDeductedSalaryModel(
                arrElement[1], arrElement[8], arrElement[0], arrElement[6], arrElement[7]);
            taxDeductedSalaryModels.push(taxDeductedSalaryModel);
            arrElement.monthWiseArray.forEach(elmnt => {
                // financial year cycle - April to March. Tax paid after march i.e. 1/04/2017 to 31/03/2018
                //tax deducted from last year 
                index = elmnt[2].indexOf('-');
                day = elmnt[2].substr(0, index);
                let extracted = elmnt[2].substr(index + 1);
                index = extracted.indexOf('-');
                month = elmnt[2].substr(index, extracted.indexOf('-'));
                year = elmnt[2].substr(elmnt[2].lastIndexOf('-') + 1);
                taxPaidDate = new Date(year, this.getMonthFromString(month), day);
                if (taxPaidDate > financialYearStart && taxPaidDate <= financialYearEnd) {
                    let advanceTaxModel = new AdvanceTaxModel(taxPaidDate, parseInt(elmnt[8]));
                    advanceTaxPaid.push(advanceTaxModel);
                }
            });
        });
        this.advanceTaxPaidModels = advanceTaxPaid;
        return taxDeductedSalaryModels;
    }
    private getMonthFromString(mon) {
        let d = Date.parse(mon + "1, 1900");
        if (!isNaN(d)) {
            return new Date(d).getMonth();
        }
        return -1;
    }
    public isPersonalInfoFrmValid: boolean;
    public isTaxDeductedCollectedFrmValid: boolean;
    public isIncomeDetailsFrmValid: boolean;
    public isTaxPaidVerificationFrmValid: boolean;
    public isDeduction80GComponentValid: boolean;
    generateXML() {

        //validate child component
        // this.validateIncomeDetailsComponent();
        // if (!this.isIncomeDetailsFrmValid && this.isIncomeDetailsFrmValid!=undefined) {
        //     this._toastr.error(this.getTabErrorMessage('Income details'), 'Error', this._configuration.CustomToastOptions);
        //     return;
        // }
        // this.validateTaxDeductedCollectedComponent();
        // if (!this.isTaxDeductedCollectedFrmValid && this.isTaxDeductedCollectedFrmValid!=undefined) {
        //     this._toastr.error(this.getTabErrorMessage('Tax Details'), 'Error', this._configuration.CustomToastOptions);
        //     return;
        // }
        // this.validateTaxPaidVerificationComponent();
        // if (!this.isTaxPaidVerificationFrmValid && this.isTaxPaidVerificationFrmValid!=undefined) {
        //     this._toastr.error(this.getTabErrorMessage('Tax paid and verification'), 'Error', this._configuration.CustomToastOptions);
        //     return;
        // }
        // this.validateDeduction80GComponent();
        // if (!this.isDeduction80GComponentValid && this.isDeduction80GComponentValid!=undefined) {
        //     this._toastr.error(this.getTabErrorMessage('80G details'), 'Error', this._configuration.CustomToastOptions);
        //     return;
        // }
        this.validatePersonalInfoComponent();
        debugger;
        if (!this.isPersonalInfoFrmValid && this.isPersonalInfoFrmValid!=undefined) {
            this._toastr.error(this.getTabErrorMessage('Personal Information'), 'Error', this._configuration.CustomToastOptions);
            return;
        }

        this.xmlDataArray = [];
        this.createSectionArray('personalInfo', this._personalInfoComponent.personalInfo);
        this.incomeData = new IncomeData();
        this.incomeData.incomeDetailsModel = this._incomeDetailsComponent.incomeDetailsModel;
        //calculate tax     
        this._incomeDetailsComponent.deductionsComponent.calculateTax();
        this.incomeData.incomeTaxModel = this._incomeDetailsComponent.deductionsComponent.incomeTaxModel;
        this.createSectionArray('incomeDetails', this.incomeData);
        this.createSectionArray('taxPaid', this._taxPaidVerificationComponent.taxPaidModel);
        this.createSectionArray('taxCollectedDeducted', this._taxDeductedCollectedComponent.taxCollectedDeductedModel);
        this.createSectionArray('verification', this._taxPaidVerificationComponent.taxPaidModel.verificationModel);
        this.createSectionArray('80g', this._donation80GComponent.donation80G);
        this._xmlGeneratorService.generateXML(this.xmlDataArray);
    }

    private getTabErrorMessage(tabName: string) {
        return "<b>" + tabName + "</b> tab data is invalid. Please correct and proceed further";
    }

    private createSectionArray(infoType: string, data: any) {
        this.xmlDataArray.push({ "infoType": infoType, data: data });
    }
    public calculateTax() {
        this._incomeDetailsComponent.incomeTaxModel = this._incomeDetailsComponent.deductionsComponent.calculateTax();
        this.incomeTaxModel = this._incomeDetailsComponent.incomeTaxModel;
        $('#deductionModel').modal('show');
    }

    //this method will be emitted from child component i.e. ParentInfoComponent
    public isPersonalInfoComponentValid(isFormValid: boolean) {
        this.isPersonalInfoFrmValid = isFormValid;
    }
    private validatePersonalInfoComponent() {
        this._personalInfoComponent.validatePersonalInfoComponentForm();
    }
    //this method will be emitted from child component i.e. TaxDeductedCollectedComponent
    public isTaxDeductedCollectedComponentValid(isFormValid: boolean) {
        this.isTaxDeductedCollectedFrmValid = isFormValid;
    }
    private validateTaxDeductedCollectedComponent() {
        this._taxDeductedCollectedComponent.validateTaxDeductedCollectedComponentForm();
    }
    //this method will be emitted from child component i.e. IncomeDetailsComponent
    public isIncomeDetailsComponentValid(isFormValid: boolean) {
        this.isIncomeDetailsFrmValid = isFormValid;
    }
    private validateIncomeDetailsComponent() {
        this._incomeDetailsComponent.validateIncomeDetailsComponentForm();
    }
    public isTaxPaidVerificationComponentValid(isFormValid: boolean) {
        this.isTaxPaidVerificationFrmValid = isFormValid;
    }
    private validateTaxPaidVerificationComponent() {
        this._taxPaidVerificationComponent.validateTaxPaidVerificationComponentForm();
    }

    public isDonation80GComponentValid(isFormValid: boolean) {
        this.isDeduction80GComponentValid = isFormValid;
    }
    validateDeduction80GComponent() {
        this._donation80GComponent.validateDonation80GComponentForm();
    }

}