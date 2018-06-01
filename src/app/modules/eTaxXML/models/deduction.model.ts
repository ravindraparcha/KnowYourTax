export class DeductionModel {
     public relief: number;
     public dueDate : string;
     public filingDate : string;    
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
 public userTaxModel :TaxModel[];
 public systemTaxModel : TaxModel[];
 public taxComputationModel : TaxComputationModel;
}

export class TaxModel {
    public name : string;
    public amount : number;
    public option : number;
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