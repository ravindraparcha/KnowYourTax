export class TaxDeductedSalaryModel {
    public TAN: string;
    public name: string;
    public amountForDeduction: number;
    public taxDeducted: number;
    public amountClaimedThisYear : number;
    constructor(tan:string,tax:string,name:string,amountForDeduction:number,taxDeducted:number,amountClaimedThisYear: number){
        this.TAN= tan;
        this.name=name;
        this.amountForDeduction=amountForDeduction;
        this.taxDeducted=taxDeducted;
        this.amountClaimedThisYear=amountClaimedThisYear;
    }
}