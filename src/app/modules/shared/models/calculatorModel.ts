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
    public TaxToPay:number;
    public SelectedMediClaim : string;
    public SelectedMediClaimValue : number;
    public CalculationResult : any; //CalculationOutput;
    public OtherDeductions : number;

    public calculateTaxLoader : boolean;
    public sectionLoader : boolean;
    public ayLoader : boolean;
    public selectedAssessmentYearId :  number;
    public selectedCategory : number;
    public selectedCarId : number;
}


export class CalculatorInputs{
    public Category : number;
    public OtherSourceIncome : number;
    public SalaryIncome :number;
    public assessmentYearId : number;
    public SectionValues : any[];
  
    public OtherDeductions : number;    
    public GrossTaxableSalary :number;
    public YearRange : string;
    public DueDateEfiling:string;
    public CurrentDate : string;
    public Section234BEndDate : string;
}
export class SectionValue {
    constructor(name:string,amount:number,parentSection:string){
        this.SectionName = name;
        this.Amount = amount;
        this.ParentSection = parentSection;
    }
    public SectionName:string;
    public Amount : number;
    public ParentSection : string;
}
export class Section {
    constructor(Amount : number,Description:string, EnteredAmount : number, Mediclaim : Mediclaim,SectionOptions : any[],Name : string)
    {
        this.Amount=Amount;
        this.Description = Description;
        this.EnteredAmount= EnteredAmount;
        this.Mediclaim=Mediclaim;
        this.SectionOptions = SectionOptions;
        this.Name=Name;
    }
    public Amount: number;
    public Description: string;
    public EnteredAmount: number;
    public Mediclaim: Mediclaim;
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

export class UserCalculatorInputModel {
    public name:string;
    public amount : number;
}