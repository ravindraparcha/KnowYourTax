import { AssessmentYearsModel } from "./assessmentYearsModel";

export class CalculatorModel {
    public assessmentYearId: number;
    public Category: number;
    public GrossTaxableSalary: number;
    public SalaryIncome: number;
    public OtherSourceIncome: number;
    public HRAAllowance: number;
    public TransportAllowance: number;
    public Sections: any[];    
    public AssessmentYearsModels: any[]; //Array<AssessmentYearsModel>
    
}

export class CalculatorInputs{
    public Category : number;
    public OtherSourceIncome : number;
    public SalaryIncome :number;
    public assessmentYearId : number;
    public SectionValues : any[];
    public Section80C : number;
    public Section80D : number;
    public Section24 :  number;
    public SectionTTA : number;
    public Section80G : number;
    public Section80E : number;
}
export class SectionValue {
    constructor(name:string,amount:number){
        this.SectionName = name;
        this.Amount = amount;
    }
    public SectionName:string;
    public Amount : number;
}
export class Section {
    constructor(Amount : number,Description:string, EnteredAmount : number, Mediclaims : any[],SectionOptions : any[],Name : string)
    {
        this.Amount=Amount;
        this.Description = Description;
        this.EnteredAmount= EnteredAmount;
        this.Mediclaims=Mediclaims;
        this.SectionOptions = SectionOptions;
        this.Name=Name;
    }
    public Amount: number;
    public Description: string;
    public EnteredAmount: number;
    public Mediclaims: any[];
    public SectionOptions : any[];
    public Name: string;
}
export class SectionOption {
    constructor(Amount : number,Description:string,EnteredAmount:number)
    {
        this.Amount=Amount;
        this.Description=Description;
        this.EnteredAmount=EnteredAmount;
    }
    public Amount: number;
    public Description: string;
    public EnteredAmount: number;
}
export class Mediclaim {
    constructor(SelfWithFamily:number,SelfWithFamilyParents:number,SelfWithFamilySeniorCititizenParents:number,SelfWithFamilySuperCitizenParents:number)
    {
        this.SelfWithFamily=SelfWithFamily;
        this.SelfWithFamilyParents =SelfWithFamilyParents;
        this.SelfWithFamilySeniorCitizenParents = SelfWithFamilySeniorCititizenParents;
        this.SelfWithFamilySuperSeniorCitizenParents = this.SelfWithFamilySuperSeniorCitizenParents;
    }
    public SelfWithFamily: number;
    public SelfWithFamilyParents: number;
    public SelfWithFamilySeniorCitizenParents: number;
    public SelfWithFamilySuperSeniorCitizenParents: number;
}