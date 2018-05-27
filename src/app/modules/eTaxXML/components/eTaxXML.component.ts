import { Component, Input, ViewChild } from "@angular/core";
import {Form26ASParserService} from '../services/form26AS-parser-service';
import { PersonalInfoModel } from '../models/personal-info.model';
import {Configuration} from '../../../shared/constants'; 
import {TaxDeductedSalaryModel} from '../models/tax-deducted-collected.model';
import {XmlGeneratorService} from '../services/xml-generator';

import {PersonalInfoComponent} from '../components/personal-info/personal-info.component';
import {IncomeDetailsComponent} from '../components/income-details/income-details.component';
import {TaxPaidVerificationComponent} from '../components/tax-paid-verification/tax-paid-verification.component';

declare var $:any;

@Component({
    selector: 'eTaxXML',
    templateUrl : './eTaxXML.component.html' 
})
export class eTaxXMLComponent  {
    cars = [
        { "id": 1 ,"name" :"Mahindra","disabled":true },
        { "id": 2 ,"name" :"Mahindra","disabled":false }
    ];

    //child component object for xml generation
    @ViewChild(PersonalInfoComponent ) _personalInfoComponent: PersonalInfoComponent; 
    @ViewChild(IncomeDetailsComponent) _incomeDetailsComponent : IncomeDetailsComponent;
    @ViewChild(TaxPaidVerificationComponent) _taxPaidVerificationComponent : TaxPaidVerificationComponent;

    public personalInfoData = new PersonalInfoModel();
    public taxDeducted;    
    private parseJson;
    private xmlDataArray=[];
    constructor(private _form26ASParserService:Form26ASParserService,private _configuration: Configuration, private _xmlGeneratorService : XmlGeneratorService){}
    onFileSelection(event: EventTarget) {
        let $this=this;
        let eventObj: MSInputMethodContext = <MSInputMethodContext>event;
        let target: HTMLInputElement = <HTMLInputElement>eventObj.target;
        let files: FileList = target.files;
        if(files.length==0)
            return;
        var reader = new FileReader();
        reader.readAsText(files[0]);
       //hiding the modal popup
       $('#form26ASModel').modal('hide');
        reader.onload = function () {                                            
           $this.parseJson= $this._form26ASParserService.parseTextFile(reader.result);           
           //convert json to appropriate model 
           $this.parseJson.forEach(element => {            
            //Personal Information           
            if(element.partNumber==0) {                    
                $this.personalInfoData = $this.getPersonalInformationModel($this.parseJson.personalInfo[0].personalInfoArray);
            }
            //PART A - Details of Tax Deducted at Source
            else if(element.partNumber==1){
                let result =$this.parseJson.cumulatives.filter(x=> x.partNumber==1);    
                $this.taxDeducted= $this.getDeductionAtSource(result);            
            }
        });
        }
        //console.log($this);
    }

    private getPersonalInformationModel(arr:any[]) : PersonalInfoModel {
        let personalInfoModel=new PersonalInfoModel();
        personalInfoModel.panNo=arr[0];

        let fullName = arr[4].split(' ');        
        personalInfoModel.firstName=fullName[0];
        personalInfoModel.middleName=fullName[1];
        personalInfoModel.lastName=fullName[2];

        personalInfoModel.flatDoorBlockNo=arr[5];
        personalInfoModel.premisesBldgVillage=arr[6];
        personalInfoModel.roadStreetPostOffice=arr[7];
        personalInfoModel.areaLocality=arr[8];
        personalInfoModel.townCityDistrict=arr[9];
        this._configuration.stateList.forEach(element=>{
            if(element.state==arr[10]) {
                personalInfoModel.selectedState=element.stateCode;
                return;
            }
        });        
        personalInfoModel.zipCode=arr[11];    
        return  personalInfoModel;     
    }
 
    private getDeductionAtSource(arr:any[]) :TaxDeductedSalaryModel[] {
        let taxDeductedSalaryModels = [];
        let taxDeductedSalaryModel;         
        arr.forEach(arrElement=>{           
            taxDeductedSalaryModel = new TaxDeductedSalaryModel(
                arrElement[1],arrElement[8],arrElement[0],arrElement[6],arrElement[7]);
                taxDeductedSalaryModels.push(taxDeductedSalaryModel);
            });
        
        return taxDeductedSalaryModels;
    }
    generateXML() {
        this.xmlDataArray=[];
        this.createSectionArray('personalInfo',this._personalInfoComponent.personalInfo);
        this.createSectionArray('incomeDetails',this._incomeDetailsComponent.incomeDetailsModel);
        this.createSectionArray('taxPaid',this._taxPaidVerificationComponent.taxPaidModel);
        this._xmlGeneratorService.generateXML(this.xmlDataArray);
    }
    private createSectionArray(infoType:string , data: any) {
        this.xmlDataArray.push({"infoType":infoType,data:data});        
    }
     
}