import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment'
@Injectable()
export class Configuration {
    public ServerWithApiUrl : string = environment.apiUrl;
    public CustomOptions = {
        positionClass: 'toast-top-center', newestOnTop: true, showCloseButton: true, toastLife: 2000
    }
    public ErrorOccurred = "Some error occurred. Try refreshing page or contact administrator";

    public dateTimeFormat:string='dd/mm/yyyy';

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
    public housePropertyType = [
        {"value" : "S", "text": "Self Occupied" },
        {"value" : "L", "text": "Let Out" }
    ];

    public annualValuePercentage:number=30;
    public allowedHousePropertyLoss: number = 200000;

    //Need to get list of deductions from server for assessment year

    public deductionList = [
        {"value":"Section80C" ,"text": "PPF (Public Provident Fund)"},
        {"value":"Section80C" ,"text": "EPF (Employees’ Provident Fund)"},
        {"value":"Section80C" ,"text": "Five years Bank or Post office Tax saving Deposits"},
        {"value":"Section80C" ,"text": "NSC (National Savings Certificates)"},
        {"value":"Section80C" ,"text": "ELSS Mutual Funds (Equity Linked Saving Schemes)"},
        {"value":"Section80C" ,"text": "Kid’s Tuition Fees"},
        {"value":"Section80C" ,"text": "SCSS (Post office Senior Citizen Savings Scheme)"},
        {"value":"Section80C" ,"text": "Principal repayment of Home Loan"},
        {"value":"Section80C" ,"text": "NPS (National Pension System)"},
        {"value":"Section80C" ,"text": "Life Insurance Premium"},
        {"value":"Section80C" ,"text": "Sukanya Samriddhi Account Deposit Scheme"},

        {"value":"Section80CCC","text":"LIC/Life insurance company pension for tax benefit"},

        {"value":"Section80CCD","text":"Government notified Pension Scheme/NPS(10% of salary)"},
        {"value":"Section80CCD","text":"Self employed contribution to government notificed scheme(20% of salary)"},
        {"value":"Section80CCD","text":"Employer's contribution to Pension scheme(10% of salary)"},

        {"value":"Section80D","text":"Health insurance premium for Self and family"},
        {"value":"Section80D","text":"Health insurance premium for self(Senior Citizen) and family"},
        {"value":"Section80D","text":"Health insurance premium for parents(Senior Citizen)"},
        {"value":"Section80D","text":"Health insurance premium for Self and family including parents"},
        {"value":"Section80D","text":"Health insurance premium for self and family including senior citizen parents"},
        {"value":"Section80D","text":"Health insurance premium for self(Senior citizen) and family including senior citizen parents"},

        {"value":"Section80DD","text":"Medical treatment of your dependant(spouse, parents, kids or siblings)"},
        {"value":"Section80DD","text":"Medical treatment of your dependant(spouse, parents, kids or siblings) with 40% disability"},

        {"value":"Section80DDB","text":"Treatment of specified critical ailment/disease for self or dependent( less than 60 years)"},
        {"value":"Section80DDB","text":"Treatment of specified critical ailment/disease for self or dependent(senior citizen)"},
        {"value":"Section80DDB","text":"Treatment of specified critical ailment/disease for self or dependent(super senior citizen)"},

        {"value":"Section80CCG","text":"Rajiv Gandhi Equity Saving Scheme(RGESS) tax benefit amount withdrawn or deduction amount not investment amount"},
        
        {"value":"Section80E","text":"Interest paid towards higher education loan by you as legal guardian"},

        {"value":"Section80EE","text":"Loan interest for first residential home property"},

        {"value":"Section80G","text":"Contribution made to certain relief funds and charitable institution"},        
        {"value":"Section80GG","text":"Tax deduction on rent paid who do not receive HRA"},
        {"value":"Section80GGA","text":"Donation for scientific research or rural development"},
        {"value":"Section80GGC","text":"Deduction on contribution to political party"},

        {"value":"Section80QQB","text":"Deduction on income received through certain books"},

        {"value":"Section80RRB","text":"Deduction on income received through patent royalty"},

        {"value":"Section80TTA","text":"Deduction on interest received on saving bank accounts"},

        {"value":"Section80U","text":"Medical treatment for self"},
        {"value":"Section80U","text":"Medical treatment for  self with 40% disability"},
        
    ];
}