import { Component, Input } from "@angular/core";
import {Form26ASParserService} from '../services/form26AS-parser-service';
import { PersonalInfoModel } from '../models/personal-info.model';
import {Configuration} from '../../../shared/constants'; 
declare var $: any;

@Component({
    selector: 'eTaxXML',
    templateUrl : './eTaxXML.component.html' 
})
export class eTaxXMLComponent  {
    cars = [
        { "id": 1 ,"name" :"Mahindra","disabled":true },
        { "id": 2 ,"name" :"Mahindra","disabled":false }
    ];

   
    public personalInfoData = new PersonalInfoModel();
    //public personalData=this.personalInfoData; 
    private parseJson;
    constructor(private _form26ASParserService:Form26ASParserService,private _configuration: Configuration){}
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
           console.log($this.parseJson);
           //convert json to appropriate model 
           $this.parseJson.forEach(element => {            
            if(element.partName=="Personal Information") {      
                // $this.parseJson.personalInfo[0];          
                // return false;
                $this.personalInfoData = $this.getPersonalInformationModel($this.parseJson.personalInfo[0].personalInfoArray);
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

}