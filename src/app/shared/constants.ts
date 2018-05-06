import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment'
@Injectable()
export class Configuration {
    public ServerWithApiUrl = environment.apiUrl;
    public CustomOptions = {
        positionClass: 'toast-top-center', newestOnTop: true, showCloseButton: true, toastLife: 2000
    }
    public ErrorOccurred = "Some error occurred. Try refreshing page or contact administrator";

    public stateList = [
        { "state": "ANDAMAN AND NICOBAR ISLANDS", stateCode: "01" },
        { "state": "ANDHRA PRADESH", stateCode: "02" },
        { "state": "ANDAMAN", stateCode: "01" },
        { "state": "ARUNACHAL PRADESH", stateCode: "03" },
        { "state": "ASSAM", stateCode: "04" },
        { "state": "BIHAR", stateCode: "05" },
        { "state": "CHANDIGARH", stateCode: "06" },
        { "state": "DADRA AND NAGAR HAVELI", stateCode: "07" },
        { "state": "DAMAN AND DIU", stateCode: "08" },
        { "state": "DELHI", stateCode: "09" },
        { "state": "GOA", stateCode: "10" },
        { "state": "GUJRAT", stateCode: "11" },
        { "state": "HARYANA", stateCode: "12" },
        { "state": "HIMACHAL PRADESH", stateCode: "13" },
        { "state": "JAMMU AND KASHMIR", stateCode: "14" },
        { "state": "KARNATAKA", stateCode: "15" },
        { "state": "KERALA", stateCode: "16" },
        { "state": "LAKSHWADEEP", stateCode: "17" },
        { "state": "MADHYA PRADESH", stateCode: "18" },
        { "state": "MAHARASHTRA", stateCode: "19" },
        { "state": "MANIPUR", stateCode: "20" },
        { "state": "MEGHALAYA", stateCode: "21" },
        { "state": "MIZORAM", stateCode: "22" },
        { "state": "NAGALAND", stateCode: "23" },
        { "state": "ORISSA", stateCode: "24" },
        { "state": "PONDICHERRY", stateCode: "25" },
        { "state": "PUNJAB", stateCode: "26" },
        { "state": "RAJASTHAN", stateCode: "27" },
        { "state": "SIKKIM", stateCode: "28" },
        { "state": "TAMILNADU", stateCode: "29" },
        { "state": "TRIPURA", stateCode: "30" },
        { "state": "UTTAR PRADESH", stateCode: "31" },
        { "state": "WEST BENGAL", stateCode: "32" },
        { "state": "CHHATTISGARH", stateCode: "33" },
        { "state": "UTTARAKHAND", stateCode: "34" },
        { "state": "JHARKHAND", stateCode: "35" },
        { "state": "TELANGANA", stateCode: "36" }
    ];

    public employerCategoryList = [
        { "empCatValue": "GOV", empCatText: "GOV" },
        { "empCatValue": "PSU", empCatText: "PSU" },
        { "empCatValue": "OTH", empCatText: "OTH" },
        { "empCatValue": "NA", empCatText: "NA" },
    ];
    public returnFiledList = [
        { "returnFileValue": "11", "returnFileText": "11-On Or Before DueDt 139(1)" },
        { "returnFileValue": "12", "returnFileText": "12-After DueDt 139(4)" },
        { "returnFileValue": "13", "returnFileText": "13-u/s 142(1)" },
        { "returnFileValue": "14", "returnFileText": "14-u/s 148" },
        { "returnFileValue": "15", "returnFileText": "15-u/s 153A" },
        { "returnFileValue": "16", "returnFileText": "16-u/s 153C r/w 153A" },
        { "returnFileValue": "17", "returnFileText": "17-Revised u/s 139(5)" },
        { "returnFileValue": "18", "returnFileText": "18-Response u/s 139(9)" },
        { "returnFileValue": "20", "returnFileText": "20-section 139(4) read with section 119(2)(b)" },

    ];
    public yesNoList = [
        {"value" : "Y", "text":"Yes"},
        {"value" : "N", "text":"No"}
    ]
    public originalRevisedList = [
        {"value" : "O", "text":"Original"},
        {"value" : "R", "text":"Revised"}
        
    ];
}