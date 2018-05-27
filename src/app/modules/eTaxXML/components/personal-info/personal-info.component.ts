import { Component, OnInit, ChangeDetectorRef, Input, Output, EventEmitter } from "@angular/core";

import { INgxMyDpOptions, IMyDateModel } from 'ngx-mydatepicker';
import { Configuration } from '../../../../shared/constants';
import { PersonalInfoModel } from '../../models/personal-info.model';
import {SharedXMLService} from '../../shared/sharedXMLService';

@Component({
    selector: 'personal-info',
    templateUrl: './personal-info.component.html'    
})
export class personalInfoComponent implements OnInit {


    @Input()
    set personalInfoData(personalInfoData: PersonalInfoModel) {
        this.initialisePersonalModelObject();
        this.personalInfo.panNo = personalInfoData.panNo;
        this.personalInfo.firstName = personalInfoData.firstName;
        this.personalInfo.middleName = personalInfoData.middleName;
        this.personalInfo.lastName = personalInfoData.lastName;
        this.personalInfo.flatDoorBlockNo = personalInfoData.flatDoorBlockNo;
        this.personalInfo.premisesBldgVillage = personalInfoData.premisesBldgVillage;
        this.personalInfo.roadStreetPostOffice = personalInfoData.roadStreetPostOffice;
        this.personalInfo.areaLocality = personalInfoData.areaLocality;
        this.personalInfo.townCityDistrict = personalInfoData.townCityDistrict;
        this.personalInfo.selectedState = personalInfoData.selectedState;
        this.personalInfo.zipCode = personalInfoData.zipCode;
    }

    public personalInfo: PersonalInfoModel;
    private file: File;
    myOptions: INgxMyDpOptions = {
        dateFormat: this._configuration.dateTimeFormat,
        disableSince: { year: new Date().getFullYear(), month: 4, day: 1 }
    };
    filedAgainstNoticeOptions: INgxMyDpOptions = {
        dateFormat: this._configuration.dateTimeFormat,
        openSelectorTopOfInput: true
    };

    constructor(private cd: ChangeDetectorRef, public _configuration: Configuration, private _sharedXMLService:SharedXMLService) { }

    // when old value does not match with new value during expression evaluation for child component
    // angular throws ExpressionChangedAfterItHasBeenCheckedError error. 
    // To resolve this issue, run detectChanges method in ngAfterViewInit() to update the values
    ngAfterViewInit() {
        this.cd.detectChanges();
    }

    ngOnInit() {
        this.initialisePersonalModelObject();
    }
    initialisePersonalModelObject() {
        this.personalInfo = new PersonalInfoModel();
        this.personalInfo.birthDate = "";
        this.personalInfo.selectedState = "";
        this.personalInfo.selectedEmployerCategory = "0";
        this.personalInfo.selectedReturnFiledSection = 0;
        this.personalInfo.filingOriginalReturnDate = "";
        this.personalInfo.selectedGovernedByPortugueseCivil = "0";
        this.personalInfo.selectedOriginalRevisedFile = "0";
        this.personalInfo.filedAgainstNotice = "";
        this.personalInfo.premisesBldgVillage = "";
        this.personalInfo.country = "91";
    }
    onBirthDateChanged(event: IMyDateModel) {

        // console.log('onDateChanged(): ', event.date, ' - jsdate: ', new Date(event.jsdate).toLocaleDateString(), ' - formatted: ', event.formatted, ' - epoc timestamp: ', event.epoc);
        if (event.date.day != 0) {
            this.personalInfo.birthDate = event.date.day + "/" + event.date.month + "/" + event.date.year;
            this.personalInfo.birthDateXml = this._sharedXMLService.formatDateDDMMYYYY(event.date.day,event.date.month,event.date.year);
        }
        else {
            this.personalInfo.birthDate = "";
            this.personalInfo.birthDateXml = "";
        }
    }
    onOriginalFilingReturnDateChanged(event: IMyDateModel) {
        if (event.date.day != 0) {
            this.personalInfo.filingOriginalReturnDate = event.date.day + "/" + event.date.month + "/" + event.date.year;
            this.personalInfo.filingOriginalReturnDateXml = this._sharedXMLService.formatDateDDMMYYYY(event.date.day,event.date.month,event.date.year);
        }
        else {
            this.personalInfo.filingOriginalReturnDate = "";
            this.personalInfo.filingOriginalReturnDateXml = "";

        }
    }
    onfiledAgainstNoticeDateChanged(event: IMyDateModel) {
        if (event.date.day != 0) {
            this.personalInfo.filedAgainstNotice = event.date.day + "/" + event.date.month + "/" + event.date.year;
            this.personalInfo.filedAgainstNoticeXml = this._sharedXMLService.formatDateDDMMYYYY(event.date.day,event.date.month,event.date.year);
        }
        else {
            this.personalInfo.filedAgainstNotice = "";
            this.personalInfo.filedAgainstNoticeXml = "";
        }
    }
   

}