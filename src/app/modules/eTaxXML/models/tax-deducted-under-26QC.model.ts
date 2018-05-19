export class TaxDeductedUnder26QCModel{
    public PAN:string;
    public name:string;
    public amountForTaxDeduction:number;
    public selectedTenantDeductionYear: number;
    public taxDeducted:number;
    public amountClaimedThisYear :number;

    constructor(pan:string,name:string,amountForTaxDeduction:number,taxDeducted:number,amountClaimedThisYear:number){
            this.PAN=pan;
            this.name=name;
            this.amountForTaxDeduction=amountForTaxDeduction;             
            this.taxDeducted=this.taxDeducted;
            this.amountClaimedThisYear=amountClaimedThisYear;
    }
}