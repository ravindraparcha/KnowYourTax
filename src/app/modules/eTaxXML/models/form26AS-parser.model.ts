export class Form26ASParserModel {
    public personalDetailModel : PersonalDetailModel;
    public partA : PartA;
}

export class PersonalDetailModel {
    public FileCreationDate:string;
    public PAN:string;
    public PANStatus:string;
    public financialYear:number;
    public assessmentYear:number;
    public assesseeName:string;
    public address1 : string;
    public address2 : string;
    public address3 : string;
    public address4 : string;
    public address5 : string;
    public stateCode:string;
    public pinCode:string;
}
export class PartA {
    public partACumulative :PartACumulative[];
    public header:string;
}
export class PartACumulative {    
    public deductorName:string;
    public deductorTAN:string;
    public totalAmtPaid:number;
    public totalTaxDeducted:number;
    public totalTDSDeposited:number;
    public partAMonthWise : PartAMonthWise[];
}
export class PartAMonthWise {
    public srNo:number;
    public section:string;
    public transactionDate:string;
    public bookingStatus : string;
    public remark : string;
    public bookingDate: string;
    public amountPaid:number;
    public taxDeducted:number;
    public tdsDeposited:number;
}