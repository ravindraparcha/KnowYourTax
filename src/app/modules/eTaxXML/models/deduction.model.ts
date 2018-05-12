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