import { Component, Input, ViewChild, OnInit } from "@angular/core";
import { ToastrService } from 'ngx-toastr';
 
import { Form26ASParserService } from '../services/form26AS-parser-service';
import { PersonalInfoModel } from '../models/personal-info.model';
import {AdvanceTaxModel, IncomeTaxModel, TaxComputationModel, TaxModel} from '../models/deduction.model';
import { Configuration } from '../../../shared/constants';
import { TaxDeductedSalaryModel } from '../models/tax-deducted-collected.model';
import {IncomeData} from '../models/income-details.model';
import { XmlGeneratorService } from '../services/xml-generator-service';

import { PersonalInfoComponent } from '../components/personal-info/personal-info.component';
import { IncomeDetailsComponent } from '../components/income-details/income-details.component';
import { TaxPaidVerificationComponent } from '../components/tax-paid-verification/tax-paid-verification.component';
import { TaxDeductedCollectedComponent } from '../components/tax-deducted-collected/tax-deducted-collected.component';
import { Donation80GComponent } from '../components/donation-80G/donation.80G.component';


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
    public incomeData : IncomeData;
    public usrTaxModel;
    public incomeTaxModel : IncomeTaxModel;
    constructor(private _form26ASParserService: Form26ASParserService, private _configuration: Configuration, 
        private _xmlGeneratorService: XmlGeneratorService, private _toastr: ToastrService) { }

    ngOnInit() {
        this.incomeTaxModel = new IncomeTaxModel();
        this.incomeTaxModel.userTaxModel = [];
        this.incomeTaxModel.systemTaxModel = [];
        this.incomeTaxModel.taxComputationModel = new TaxComputationModel();
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
        let advanceTaxPaid=[];
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
                index=elmnt[2].indexOf('-');
                day=elmnt[2].substr(0,index);
                let extracted = elmnt[2].substr(index+1);
                index = extracted.indexOf('-');
                month=elmnt[2].substr(index,extracted.indexOf('-'));
                year= elmnt[2].substr(elmnt[2].lastIndexOf('-')+1);
                taxPaidDate = new Date(year,this.getMonthFromString(month),day);
                if(taxPaidDate>financialYearStart && taxPaidDate<=financialYearEnd) {
                    let advanceTaxModel = new AdvanceTaxModel(taxPaidDate,parseInt(elmnt[8]));
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
    private isPersonalInfoFrmValid:boolean;
    private isTaxDeductedCollectedFrmValid:boolean;
    private isIncomeDetailsFrmValid:boolean;
    generateXML() {
        
        //validate child component
        //this.validateTaxDeductedCollectedComponent();
        // if(!this.isTaxDeductedCollectedFrmValid)  {
        //     this._toastr.error("<b>Tax Details</b> tab data is invalid. Please correct and proceed further",'Error',this._configuration.CustomToastOptions);
        //     return;
        // }
        // this.validatePersonalInfoComponent();
        // if(!this.isPersonalInfoFrmValid)  {
        //     this._toastr.error("<b>Personal Information</b> tab data is invalid. Please correct and proceed further",'Error',this._configuration.CustomToastOptions);
        //     return;
        // }

        this.validateIncomeDetailsComponent();
        if(!this.isIncomeDetailsFrmValid)  {
            this._toastr.error("<b>Income details</b> tab data is invalid. Please correct and proceed further",'Error',this._configuration.CustomToastOptions);
            return;
        }

        this.xmlDataArray = [];
        this.createSectionArray('personalInfo', this._personalInfoComponent.personalInfo);
        this.incomeData = new IncomeData();
        this.incomeData.incomeDetailsModel=this._incomeDetailsComponent.incomeDetailsModel;
        this.incomeData.incomeTaxModel = this._incomeDetailsComponent.deductionsComponent.incomeTaxModel;
        this.createSectionArray('incomeDetails', this.incomeData);
        this.createSectionArray('taxPaid', this._taxPaidVerificationComponent.taxPaidModel);
        this.createSectionArray('taxCollectedDeducted', this._taxDeductedCollectedComponent.taxCollectedDeductedModel);
        this.createSectionArray('verification', this._taxPaidVerificationComponent.taxPaidModel.verificationModel);
        this.createSectionArray('80g', this._donation80GComponent.donation80G);
        this._xmlGeneratorService.generateXML(this.xmlDataArray);
    }
    private createSectionArray(infoType: string, data: any) {
        this.xmlDataArray.push({ "infoType": infoType, data: data });
    }
    calculateTax() {
        this.incomeTaxModel.usrDeductionSum=0;
        this.incomeTaxModel.sysDeductionSum=0;
        this.incomeTaxModel = this._incomeDetailsComponent.deductionsComponent.calculateTax();   
        $('#deductionModel').modal('show');
    }
    
    //this method will be emitted from child component i.e. ParentInfoComponent
    private isPersonalInfoComponentValid(isFormValid:  boolean) {
        this.isPersonalInfoFrmValid = isFormValid;
    }
    validatePersonalInfoComponent() {        
        this._personalInfoComponent.validatePersonalInfoComponentForm();                     
    }
    //this method will be emitted from child component i.e. TaxDeductedCollectedComponent
    private isTaxDeductedCollectedComponentValid(isFormValid:  boolean) {
        this.isTaxDeductedCollectedFrmValid = isFormValid;
    }
    validateTaxDeductedCollectedComponent() {        
        this._taxDeductedCollectedComponent.validateTaxDeductedCollectedComponentForm();              
    }
     //this method will be emitted from child component i.e. IncomeDetailsComponent
     private isIncomeDetailsComponentValid(isFormValid:  boolean) {
        this.isIncomeDetailsFrmValid = isFormValid;
    }
    validateIncomeDetailsComponent() {        
        this._incomeDetailsComponent.validateIncomeDetailsComponentForm();
    }

     

}