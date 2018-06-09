export class DeductionModel {
    public relief: number=0;
    public advanceTax: number = 0;
    public dueDate: string="";
    public filingDate: string="";
}

export class AdvanceTaxModel {
    public transactionDate: string;
    public amount: number=0;
    public isAdvanceTax : boolean;
    constructor(transactionDate: string, amount: number,isAdvanceTx:boolean=false) {
        this.amount = amount;
        this.transactionDate = transactionDate;
        this.isAdvanceTax=isAdvanceTx;
    }
}

export class SlabResult {
    public min: number;
    public max: number;
    public taxableAmount: number;
    public tax: number;
    public cessTax: number;
    public totalTax: number;

}

export class IncomeTaxModel {
    public userTaxModel: TaxModel[];
    public systemTaxModel: TaxModel[];    
    public taxComputationModel: TaxComputationModel;
    public usrDeductionSum: number;
    public sysDeductionSum: number;
}

export class TaxModel {
    public name: string;
    public amount: number;
    public option: number;
}

export class TaxComputationModel {
   
    public totalIncome: number= 0;
    public taxPayableOnTotalIncome: number= 0;
    public rebateAmt: number= 0;
    public taxPayableAfterRebate: number= 0;
    public cessTax: number= 0;
    public totalTaxAndCess: number= 0;
    public reliefUnder89: number= 0;
    public balanceTaxAfterRelief: number= 0;
    public interest234A: number = 0;
    public interest234B: number = 0;
    public interest234C: number = 0;
    public feeUnder234F: number = 0;
    public totalInterestPayable: number= 0;
    public totalTaxFeeInterest: number= 0;
}