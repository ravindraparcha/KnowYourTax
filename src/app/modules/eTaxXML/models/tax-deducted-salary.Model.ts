export class TaxDeductedSalaryModel {
    public TAN: string;
    public name: string;
    public incomeChargeableForDeduction: number;
    public taxDeducted: number;    
    constructor(tan:string,tax:string,name:string,incomeChargeableForDeduction:number,taxDeducted:number){
        this.TAN= tan;
        this.name=name;
        this.incomeChargeableForDeduction=incomeChargeableForDeduction;
        this.taxDeducted=taxDeducted;        
    }
}