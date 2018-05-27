export class TaxPaidModel {
    public totalAdvanceTaxPaid: number=0;
    public totalTDSClaimed: number =0;
    public totalTCSClaimed: number =0;
    public totalSelfAssessmentTaxPaid: number =0;
    public totalTaxesPaid: number =0;
    public amountPayable: number = 0;
    public refund: number =0;
    public exemptedLongTermCapitalGain: number =0;
    public exemptedDividendIncome: number = 0;
    public agricultureIncome: number =0;
    public otherExemptionModels: OtherExemptionModel[]
    public accountDetail: AccountDetailModel;
    public otherAccountDetails:AccountDetailModel[];
    public verificationModel:VerificationModel;
}
export class OtherExemptionModel {
    public selectedIncomeNature: string;
    public descriptionIfAnyOtherSelected: string;
    public amount: number
    constructor(descriptionIfAnyOtherSelected: string, amount: number,selectedIncomeNature:string) {
        this.descriptionIfAnyOtherSelected = descriptionIfAnyOtherSelected;
        this.amount = amount;
        this.selectedIncomeNature=selectedIncomeNature;
    }
}

export class AccountDetailModel{
    public ifscCode : string;
    public bankName:string;
    public accountNo : string;
    constructor(ifscCode:string,bankName:string,accountNo:string){
        this.ifscCode=ifscCode;
        this.bankName=bankName;
        this.accountNo=accountNo;
    }
}

export class VerificationModel {
    public fullName:string;
    public sonDaughterOf :string;
    public PAN:string;
    public capacity:number;
    public place:string;
    public verficationDate:string;
    public TRPIdentificationNo:string;
    public TRPName:string;
    public TRPReimbursementAmount:number;
    constructor(fullName:string, sonDaughterOf :string, PAN:string,capacity:number,place:string,
        verficationDate:string,TRPIdentificationNo:string,TRPName:string,TRPReimbursementAmount:number){
            this.fullName=fullName;
            this.sonDaughterOf=sonDaughterOf;
            this.PAN=PAN;
            this.capacity=capacity;
            this.place=place;
            this.verficationDate=verficationDate;
            this.TRPIdentificationNo=TRPIdentificationNo;
            this.TRPName=TRPName;
            this.TRPReimbursementAmount=TRPReimbursementAmount;
    }

}