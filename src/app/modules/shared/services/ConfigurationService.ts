import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
@Injectable()
export class ConfigurationService {
    public ServerWithApiUrl: string = environment.apiUrl;
    public CustomToastOptions = {
        positionClass: 'toast-top-center', newestOnTop: true, closeButton: true, timeOut: 4000, enableHtml: true
    }
    public ErrorOccurred = "Some error occurred. Try refreshing page or contact administrator";

    public dateTimeFormat: string = 'dd/mm/yyyy';

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
        { "value": "Y", "text": "Yes" },
        { "value": "N", "text": "No" }
    ]
    public originalRevisedList = [
        { "value": "O", "text": "Original" },
        { "value": "R", "text": "Revised" }

    ];
    public housePropertyType = [
        { "value": "S", "text": "Self Occupied" },
        { "value": "L", "text": "Given on rent" }
    ];

    public annualValuePercentage: number = 30;
    public allowedHousePropertyLoss: number = 200000;
    // public dueDateForFiling: string = "31/07/" + new Date().getFullYear(); //dd/mm//yyyy format
    // public section234BEndDate: string = "31/03/" + new Date().getFullYear();
    public taxLiability = 10000;
    public sec234FTotalIncomeLimit = 500000;
    //Need to get list of deductions from server for assessment year
    //income tax calculation input starts here
    public deductionList = [
        { "name": "80C_1", "text": "PPF(Public Provident Fund)" },
        { "name": "80C_2", "text": "EPF(Employees’ Provident Fund)" },
        { "name": "80C_3", "text": "Five years Bank or Post office Tax saving Deposits" },
        { "name": "80C_4", "text": "NSC(National Savings Certificates)" },
        { "name": "80C_5", "text": "ELSS Mutual Funds (Equity Linked Saving Schemes)" },
        { "name": "80C_6", "text": "Kid’s Tuition Fees" },
        { "name": "80C_7", "text": "SCSS(Post office Senior Citizen Savings Scheme)" },
        { "name": "80C_8", "text": "Principal repayment of Home Loan" },
        { "name": "80C_9", "text": "NPS(National Pension System)" },
        { "name": "80C_10", "text": "Life Insurance Premium" },
        { "name": "80C_11", "text": "Sukanya Samriddhi Account Deposit Scheme" },
        { "name": "80CCD1", "text": "Government notified Pension Scheme/NPS" }, //Actual section = 80CCD1 comes under 80C

        { "name": "80CCC", "text": "LIC/Life insurance company pension for tax benefit" }, //Actual section = 80CCC comes under 80C

        { "name": "80CCD1B", "text": "Self employed contribution to government notificed scheme(NPS)" }, //Actual section = 80CCD1B, limit 50000 (Employees have savings Rs. 1,50,000 under 80C excluding NPS Deductions, Then the Employee can show their NPS  Deductions, under 80 CCD(1B), which is over the 1,50,000 Limit) so now limit 2lakhs
        { "name": "80CCD2", "text": "Employer's contribution to Pension scheme(10% of salary)" }, //Actual section = 80CCD2 10% of total income (total of salary/pension)

        { "name": "80D_1", "text": "Health insurance premium for Self and family" },
        { "name": "80D_2", "text": "Health insurance premium for self(Senior Citizen) and family" },
        { "name": "80D_3", "text": "Health insurance premium for parents" },
        { "name": "80D_4", "text": "Health insurance premium for parents(Senior Citizen)" },
        { "name": "80D_5", "text": "Health insurance premium for Self and family including parents" },
        { "name": "80D_6", "text": "Health insurance premium for self and family including senior citizen parents" },
        { "name": "80D_7", "text": "Health insurance premium for self(Senior citizen) and family including senior citizen parents" },

        { "name": "80DD_1", "text": "Medical treatment of your dependant(spouse, parents, kids or siblings)" },
        { "name": "80DD_2", "text": "Medical treatment of your dependant(spouse, parents, kids or siblings) with 40% disability" },

        { "name": "80DDB_1", "text": "Treatment of specified critical ailment/disease for self or dependent( less than 60 years)" },
        { "name": "80DDB_2", "text": "Treatment of specified critical ailment/disease for self or dependent(senior citizen)" },
        { "name": "80DDB_3", "text": "Treatment of specified critical ailment/disease for self or dependent(super senior citizen)" },

        { "name": "80CCG", "text": "Rajiv Gandhi Equity Saving Scheme(RGESS) tax benefit amount withdrawn or deduction amount not investment amount" },

        { "name": "80E", "text": "Interest paid towards higher education loan by you as legal guardian" },

        { "name": "80EE", "text": "Loan interest for first residential home property" },

        { "name": "80G", "text": "Contribution made to certain relief funds and charitable institution" },
        { "name": "80GG", "text": "Tax deduction on rent paid who do not receive HRA" },
        { "name": "80GGA", "text": "Donation for scientific research or rural development" },
        { "name": "80GGC", "text": "Deduction on contribution to political party" },

        { "name": "80QQB", "text": "Deduction on income received through certain books" },

        { "name": "80RRB", "text": "Deduction on income received through patent royalty" },

        { "name": "TTA", "text": "Deduction on interest received on saving bank accounts" },

        { "name": "80U_1", "text": "Medical treatment for self" },
        { "name": "80U_2", "text": "Medical treatment for  self with 40% disability" },

    ];

    // public masterDeductionList = [
    //     { "sectionName": "80C", "limit": 150000 },
    //     { "sectionName": "80D_1", "limit": 25000 },
    //     { "sectionName": "80D_2", "limit": 30000 },
    //     { "sectionName": "80D_3", "limit": 25000 },
    //     { "sectionName": "80D_4", "limit": 30000 },
    //     { "sectionName": "80D_5", "limit": 50000 },
    //     { "sectionName": "80D_6", "limit": 55000 },
    //     { "sectionName": "80D_7", "limit": 60000 },
    //     { "sectionName": "80DD_1", "limit": 75000 },
    //     { "sectionName": "80DD_2", "limit": 125000 },
    //     { "sectionName": "80DDB_1", "limit": 40000 },
    //     { "sectionName": "80DDB_2", "limit": 40000 },
    //     { "sectionName": "80DDB_3", "limit": 60000 },
    //     { "sectionName": "80CCG", "limit": -1 },
    //     { "sectionName": "80E", "limit": -1 },
    //     { "sectionName": "80EE", "limit": 50000 },
    //     { "sectionName": "80G", "limit": 2000 },
    //     { "sectionName": "80GG", "limit": 60000 },
    //     { "sectionName": "80GGA", "limit": 10000 },
    //     { "sectionName": "80GGC", "limit": -1 },
    //     { "sectionName": "80QQB", "limit": 300000 },
    //     { "sectionName": "80RRB", "limit": 300000 },
    //     { "sectionName": "TTA", "limit": 10000 },
    //     { "sectionName": "80U_1", "limit": 75000 },
    //     { "sectionName": "80U_2", "limit": 125000 }

    // ];

    public selectedMasterSec = [];
    public selectedSlabs = [];
    public masterSec = [
        {
            ayYear: '2018-2019',
            sections: [
                {
                    name: "80C",
                    limit: 150000,
                    parent: "",
                    grossLimit: 0,
                    options: [
                        { name: "80C_1", limit: 0 }, { name: "80C_2", limit: 0 }, { name: "80C_3", limit: 0 }, { name: "80C_4", limit: 0 },
                        { name: "80C_5", limit: 0 }, { name: "80C_6", limit: 0 }, , { name: "80C_7", limit: 0 }, { name: "80C_8", limit: 0 },
                        { name: "80C_9", limit: 0 }, { name: "80C_10", limit: 0 }, , { name: "80C_11", limit: 0 }, { name: "80C_12", limit: 0 },
                        { name: "80C_13", limit: 0 }
                    ]
                },
                {
                    name: "80CCC",
                    limit: 0,  // check with parent if amount found, subtract it
                    options: [],
                    parent: "80C",
                    grossLimit: 0,
                },
                {
                    name: "80CCD1",
                    limit: 0,  // check with parent if amount found, subtract it
                    options: [],
                    parent: "80C",
                    grossLimit: 0,
                },
                {
                    name: "80CCD1B",
                    limit: 50000,
                    parent: "",
                    options: [],
                    grossLimit: 0,
                },
                {
                    name: "80CCD2",
                    limit: 10.0,
                    parent: "",
                    options: [],
                    grossLimit: 0,
                },

                {
                    name: "80D",
                    limit: 0,
                    parent: "",
                    grossLimit: 0,
                    options: [
                        { name: "80D_1", limit: 25000 }, { name: "80D_2", limit: 30000 }, { name: "80D_3", limit: 25000 }, { name: "80D_4", limit: 30000 },
                        { name: "80D_5", limit: 50000 }, { name: "80D_6", limit: 55000 }, { name: "80D_7", limit: 60000 },
                    ]
                },
                {
                    name: "80DD",
                    limit: 0,
                    parent: "",
                    grossLimit: 0,
                    options: [
                        { name: "80DD_1", limit: 75000 }, { name: "80DD_2", limit: 125000 }
                    ]
                },
                {
                    name: "80DDB",
                    limit: 0,
                    parent: "",
                    grossLimit: 0,
                    options: [
                        { name: "80DDB_1", limit: 40000 }, { name: "80DDB_2", limit: 40000 }, { name: "80DDB_2", limit: 60000 }
                    ]
                },
                {
                    name: "80CCG", //applicable only gross total income is less than 12 lakhs  https://cleartax.in/s/80c-80-deductions#80CCG
                    limit: 25000,
                    parent: "",
                    grossLimit: 1200000,
                    options: []
                },
                {
                    name: "80E",
                    limit: -1,
                    parent: "",
                    grossLimit: 0,
                    options: []
                },
                {
                    name: "80EE",
                    limit: 50000,
                    parent: "",
                    grossLimit: 0,
                    options: []
                },
                {
                    name: "80G",
                    limit: 2000,
                    parent: "",
                    grossLimit: 0,
                    options: []
                },
                {
                    name: "80GG",
                    limit: 60000,
                    parent: "",
                    grossLimit: 0,
                    options: []
                },
                {
                    name: "80GGA",
                    limit: 10000,
                    parent: "",
                    grossLimit: 0,
                    options: []
                },
                {
                    name: "80GGC",
                    limit: -1,
                    parent: "",
                    grossLimit: 0,
                    options: []
                },
                {
                    name: "80QQB",
                    limit: 300000,
                    parent: "",
                    grossLimit: 0,
                    options: []
                },
                {
                    name: "80RRB",
                    limit: 300000,
                    parent: "",
                    grossLimit: 0,
                    options: []
                },
                {
                    name: "TTA",
                    limit: 10000,
                    parent: "",
                    grossLimit: 0,
                    options: []
                },
                {
                    name: "80U",
                    limit: 0,
                    parent: "",
                    grossLimit: 0,
                    options: [{ name: "80U_1", limit: 75000 }, { name: "80U_2", limit: 125000 }]
                }
            ],            
        },
        {
            ayYear: '2019-2020',
            sections: [
                {
                    name: "80C",
                    limit: 150000,
                    parent: "",
                    grossLimit: 0,
                    options: [
                        { name: "80C_1", limit: 0 }, { name: "80C_2", limit: 0 }, { name: "80C_3", limit: 0 }, { name: "80C_4", limit: 0 },
                        { name: "80C_5", limit: 0 }, { name: "80C_6", limit: 0 }, , { name: "80C_7", limit: 0 }, { name: "80C_8", limit: 0 },
                        { name: "80C_9", limit: 0 }, { name: "80C_10", limit: 0 }, , { name: "80C_11", limit: 0 }, { name: "80C_12", limit: 0 },
                        { name: "80C_13", limit: 0 }
                    ]
                },
                {
                    name: "80CCC",
                    limit: 0,  // check with parent if amount found, subtract it
                    options: [],
                    parent: "80C",
                    grossLimit: 0,
                },
                {
                    name: "80CCD1",
                    limit: 0,  // check with parent if amount found, subtract it
                    options: [],
                    parent: "80C",
                    grossLimit: 0,
                },
                {
                    name: "80CCD1B",
                    limit: 50000,
                    parent: "",
                    options: [],
                    grossLimit: 0,
                },
                {
                    name: "80CCD2",
                    limit: 10.0,
                    parent: "",
                    options: [],
                    grossLimit: 0,
                },

                {
                    name: "80D",
                    limit: 0,
                    parent: "",
                    grossLimit: 0,
                    options: [
                        { name: "80D_1", limit: 25000 }, { name: "80D_2", limit: 30000 }, { name: "80D_3", limit: 25000 }, { name: "80D_4", limit: 30000 },
                        { name: "80D_5", limit: 50000 }, { name: "80D_6", limit: 55000 }, { name: "80D_7", limit: 60000 },
                    ]
                },
                {
                    name: "80DD",
                    limit: 0,
                    parent: "",
                    grossLimit: 0,
                    options: [
                        { name: "80DD_1", limit: 75000 }, { name: "80DD_2", limit: 125000 }
                    ]
                },
                {
                    name: "80DDB",
                    limit: 0,
                    parent: "",
                    grossLimit: 0,
                    options: [
                        { name: "80DDB_1", limit: 40000 }, { name: "80DDB_2", limit: 40000 }, { name: "80DDB_2", limit: 60000 }
                    ]
                },
                {
                    name: "80CCG", //applicable only gross total income is less than 12 lakhs  https://cleartax.in/s/80c-80-deductions#80CCG
                    limit: 25000,
                    parent: "",
                    grossLimit: 1200000,
                    options: []
                },
                {
                    name: "80E",
                    limit: -1,
                    parent: "",
                    grossLimit: 0,
                    options: []
                },
                {
                    name: "80EE",
                    limit: 50000,
                    parent: "",
                    grossLimit: 0,
                    options: []
                },
                {
                    name: "80G",
                    limit: 2000,
                    parent: "",
                    grossLimit: 0,
                    options: []
                },
                {
                    name: "80GG",
                    limit: 60000,
                    parent: "",
                    grossLimit: 0,
                    options: []
                },
                {
                    name: "80GGA",
                    limit: 10000,
                    parent: "",
                    grossLimit: 0,
                    options: []
                },
                {
                    name: "80GGC",
                    limit: -1,
                    parent: "",
                    grossLimit: 0,
                    options: []
                },
                {
                    name: "80QQB",
                    limit: 300000,
                    parent: "",
                    grossLimit: 0,
                    options: []
                },
                {
                    name: "80RRB",
                    limit: 300000,
                    parent: "",
                    grossLimit: 0,
                    options: []
                },
                {
                    name: "TTA",
                    limit: 10000,
                    parent: "",
                    grossLimit: 0,
                    options: []
                },
                {
                    name: "80U",
                    limit: 0,
                    parent: "",
                    grossLimit: 0,
                    options: [{ name: "80U_1", limit: 75000 }, { name: "80U_2", limit: 125000 }]
                }
            ],            
        }
        ];

    public slabs = [
        {
            ayYear: '2018-2019',
            cess: 3,
            rebateLimit: 350000,
            rebateAmount: 2500,
            exemption : 250000,
            slabLimits: [
                {
                    min: 250000,
                    max: 500000,
                    rate: 5
                },
                {
                    min: 500000,
                    max: 1000000,
                    rate: 20
                },
                {
                    min: 1000000,
                    max: 5000000,
                    rate: 30
                }
            ]
        },
        {
            ayYear: '2019-2020',
            cess: 4,
            rebateLimit: 350000,
            rebateAmount: 2500,
            exemption : 250000,
            slabLimits: [
                {
                    min: 250000,
                    max: 500000,
                    rate: 5
                },
                {
                    min: 500000,
                    max: 1000000,
                    rate: 20
                },
                {
                    min: 1000000,
                    max: 5000000,
                    rate: 30
                }
            ]
        }
        ];
    //income tax calculation input ends here

    public incomeNatureList = [
        { "value": "10(5)", "text": "Section 10(5)-Leave Travel Allowance" },
        { "value": "10(6)", "text": "Section 10(6)-Sec 10(6)-Remuneration received as an official, by whatever" },
        { "value": "10(7)", "text": "Section 10(5)-Sec 10(7)-Sec 10(7)-Allowances or perquisites paid or allowed as such outside India by the Government to a citizen of India for rendering service outside India" },
        { "value": "10(10)", "text": "Sec 10(10)-Death-cum-retirement gratuity received " },
        { "value": "10(10A)", "text": "Sec 10(10A)-Commuted value of pension received" },
        { "value": "10(10AA)", "text": "Sec 10(10AA)-Earned leave encashment" },
        { "value": "10(10B)", "text": "Sec 10(10B)-Retrenchment Compensation received" },
        { "value": "10(10C)", "text": "Sec 10(10C)-Amount received on voluntary retirement or termination of service" },
        { "value": "10(10D)", "text": "Sec 10(10D)-Sum received under a life insurance policy including bonus" },
        { "value": "10(11)", "text": "Sec 10(11)-Statuory Provident Fund received" },
        { "value": "10(12)", "text": "Sec 10(12)-Recognised Provident Fund received" },
        { "value": "10(13)", "text": "Sec 10(13)-Approved superannuation fund received" },
        { "value": "10(13A)", "text": "Sec 10(13A)-House Rent Allowance" },
        { "value": "10(14)", "text": "Sec 10(14)-Amount received towards the expenditure incurred during performance of duty" },
        { "value": "10(15)", "text": "Sec 10(15)-Income by way of interest, premium on redemption or other payment on such securities, bonds, annuity certificates, savings certificates, other certificates" },
        { "value": "10(16)", "text": "Sec 10(16)-Scholarships granted to meet the cost of education" },
        { "value": "10(17)", "text": "Sec 10(17)-Allownace MP/MLA/MLC" },
        { "value": "10(17A)", "text": "Sec 10(17A)-Award instituted by Government" },
        { "value": "10(18)", "text": "Sec 10(18)-Pension received by winner of  Param Vir Chakra/Maha Vir Chakra/Vir Chakra/such other gallantry award" },
        { "value": "10(19)", "text": "Sec 10(19)-Family pension received" },
        { "value": "OTH", "text": "Any other" }

    ];

}