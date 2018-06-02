export class DeductionModel {
    public relief: number;
    public advanceTax: number = 0;
    public dueDate: string;
    public filingDate: string;
}

export class AdvanceTaxModel {
    public transactionDate: string;
    public amount: number;
    constructor(transactionDate: string, amount: number) {
        this.amount = amount;
        this.transactionDate = transactionDate;
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
}

export class TaxModel {
    public name: string;
    public amount: number;
    public option: number;
}

export class TaxComputationModel {
    public totalDeductions: number;
    public totalIncome: number;
    public taxPayableOnTotalIncome: number;
    public rebateAmt: number;
    public taxPayableAfterRebate: number;
    public cessTax: number;
    public totalTaxAndCess: number;
    public reliefUnder89: number;
    public balanceTaxAfterRelief: number;
    public interest234A: number = 0;
    public interest234B: number = 0;
    public interest234C: number = 0;
    public feeUnder236F: number = 0;
    public totalInterestPayable: number;
    public totalTaxFeeInterest: number;
}