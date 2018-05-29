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