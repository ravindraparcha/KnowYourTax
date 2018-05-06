import { Component, OnInit, ChangeDetectorRef } from "@angular/core";
import {INgxMyDpOptions, IMyDateModel} from 'ngx-mydatepicker';

import { PersonalInfoModel } from './personalInfo.model';

@Component({
    selector: 'personal-info',
    templateUrl: './personalInfo.component.html'

})
export class personalInfoComponent implements OnInit {
    public personalInfo : PersonalInfoModel;

    myOptions: INgxMyDpOptions = {
        // other options...
        dateFormat: 'dd/mm/yyyy',
        // disableSince: {year: 2018, month: 4, day: 1}
    };

    stateList = [
        { "state": "ANDAMAN AND NICOBAR ISLANDS", stateCode: "01"},
        { "state": "ANDHRA PRADESH", stateCode: "02"},
        { "state": "ANDAMAN", stateCode: "01"},
        { "state": "ARUNACHAL PRADESH", stateCode: "03"},
        { "state": "ASSAM", stateCode: "04"},
        { "state": "BIHAR", stateCode: "05"},
        { "state": "CHANDIGARH", stateCode: "06"},
        { "state": "DADRA AND NAGAR HAVELI", stateCode: "07"},
        { "state": "DAMAN AND DIU", stateCode: "08"},
        { "state": "DELHI", stateCode: "09"},
        { "state": "GOA", stateCode: "10"},
        { "state": "GUJRAT", stateCode: "11"},
        { "state": "HARYANA", stateCode: "12"},
        { "state": "HIMACHAL PRADESH", stateCode: "13"},
        { "state": "JAMMU AND KASHMIR", stateCode: "14"},
        { "state": "KARNATAKA", stateCode: "15"},
        { "state": "KERALA", stateCode: "16"},
        { "state": "LAKSHWADEEP", stateCode: "17"},
        { "state": "MADHYA PRADESH", stateCode: "18"},
        { "state": "MAHARASHTRA", stateCode: "19"},
        { "state": "MANIPUR", stateCode: "20"},
        { "state": "MEGHALAYA", stateCode: "21"},
        { "state": "MIZORAM", stateCode: "22"},
        { "state": "NAGALAND", stateCode: "23"},
        { "state": "ORISSA", stateCode: "24"},
        { "state": "PONDICHERRY", stateCode: "25"},
        { "state": "PUNJAB", stateCode: "26"},
        { "state": "RAJASTHAN", stateCode: "27"},
        { "state": "SIKKIM", stateCode: "28"},
        { "state": "TAMILNADU", stateCode: "29"},
        { "state": "TRIPURA", stateCode: "30"},
        { "state": "UTTAR PRADESH", stateCode: "31"},
        { "state": "WEST BENGAL", stateCode: "32"},
        { "state": "CHHATTISGARH", stateCode: "33"},
        { "state": "UTTARAKHAND", stateCode: "34"},
        { "state": "JHARKHAND", stateCode: "35"},
        { "state": "TELANGANA", stateCode: "36"}        
    ];

    constructor(private cd: ChangeDetectorRef) { }

    // when old value does not match with new value during expression evaluation for child component
    // angular throws ExpressionChangedAfterItHasBeenCheckedError error. 
    // To resolve this issue, run detectChanges method in ngAfterViewInit() to update the values
    ngAfterViewInit() {
        this.cd.detectChanges();
    }

    ngOnInit() {      
        this.personalInfo = new PersonalInfoModel();        
        this.personalInfo.birthDate="";   
        this.personalInfo.selectedState=0;
    }
    onBirthDateChanged(event: IMyDateModel) {
        console.log('onDateChanged(): ', event.date, ' - jsdate: ', new Date(event.jsdate).toLocaleDateString(), ' - formatted: ', event.formatted, ' - epoc timestamp: ', event.epoc);
        if(event.date.day!=0)
            this.personalInfo.birthDate=event.date.day+"/"+event.date.month+"/"+event.date.year;
        else 
            this.personalInfo.birthDate="";
        console.log(this.personalInfo.birthDate);
      }
    
}