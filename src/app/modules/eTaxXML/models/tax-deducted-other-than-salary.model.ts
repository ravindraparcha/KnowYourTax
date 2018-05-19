export class TaxDeductedOtherThanSalaryModel{
    public TAN : string;
    public name : string;
    public amountForTaxDeduction : number;
    public taxDeducted :number;
    public amountClaimedThisYear : number;
    public yearList : any[];
    public selectedOtherThanSalaryYear : number;
    constructor(tan:string,name:string,amountForTaxDeduction:number,taxDeducted:number,amountClaimed:number) {
        this.TAN=tan;
        this.name=name;
        this.amountForTaxDeduction=amountForTaxDeduction;
        this.taxDeducted=taxDeducted;
        this.amountClaimedThisYear=amountClaimed;
    }
}