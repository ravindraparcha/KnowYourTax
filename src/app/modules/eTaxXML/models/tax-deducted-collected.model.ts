export class TaxCollectedDeductedModel {
    public taxCollectedModels : TaxCollectedModel[];
    public taxDeductedSalaryModels :TaxDeductedSalaryModel[];
    public taxDeductedOtherThanSalaryModels : TaxDeductedOtherThanSalaryModel[];
    public taxDeductedUnder26QCModels : TaxDeductedUnder26QCModel[];
    public advanceTaxSelfAssessmentTaxModels : AdvanceTaxSelfAssessmentTaxModel[];

}
export class TaxCollectedModel {
    public taxCollectionAccountNo: string;
    public name: string;
    public amountForTaxDeduction: number;
    public selectedTaxCollectionYear: number;
    public taxCollected: number;
    public amountClaimedThisYear: number;
    constructor(taxCollectionAcNo: string, name: string, taxCollected: number, amountClaimedThisYear: number) {
        this.taxCollectionAccountNo = this.taxCollectionAccountNo;
        this.name = name;
        this.taxCollected = taxCollected;
        this.amountClaimedThisYear = amountClaimedThisYear;
    }
};
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
};
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
};
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
};


export class AdvanceTaxSelfAssessmentTaxModel {
    public BSRCode: string;
    public challanSerialNumber: string;
    public taxPaid: number;
    public depositDate : string;
    public depositDateXml : string="";
    public selectedTaxType : string="0";
    constructor(bsrCode: string, challan: string, taxPaid: number,depositDate : string) {
        this.BSRCode = bsrCode;
        this.challanSerialNumber = challan;
        this.taxPaid = taxPaid;
        this.depositDate=depositDate
    }
};