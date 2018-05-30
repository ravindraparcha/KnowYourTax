export class DeductionModel {
    public text :string;
    public amount : number;
    public section : string;
    constructor(text:string,amount:number,section){
        this.text=text;
        this.amount = amount;
        this.section=section;
    }
    
}

export class SlabResult {
    public min : number;
    public max : number;
    public taxableAmount : number;
    public tax : number;
    public cessTax : number;
    public totalTax : number;
     
}

export class IncomeTaxModel {
 public userTaxModel :any[];
 public systemTaxModel : any[];
 public taxComputationModel : TaxComputationModel;
}

export class TaxComputationModel {
    public totalDeductions : number;
    public totalIncome : number;
    public taxPayableOnTotalIncome : number;
    public rebateAmt : number;
    public taxPayableAfterRebate : number;
    public cessTax : number;
    public totalTaxAndCess : number;
    public reliefUnder89 : number;
    public balanceTaxAfterRelief : number;
    public interest234A : number;
    public interest234B: number;
    public interest234C: number;
    public feeUnder236F : number;
    public totalInterestPayable : number;
    public totalTaxFeeInterest : number;
}