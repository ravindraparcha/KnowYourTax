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
    public selectedTaxCollectionYear: number=null;
    public taxCollected: number;
    public amountClaimedThisYear: number;
    constructor(taxCollectionAcNo: string, name: string, taxCollected: number, amountClaimedThisYear: number) {
        this.taxCollectionAccountNo = taxCollectionAcNo;
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
    public selectedOtherThanSalaryYear : number=null;
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
    public selectedTenantDeductionYear: number=null;
    public taxDeducted:number;
    public amountClaimedThisYear :number;

    constructor(pan:string,name:string,amountForTaxDeduction:number,taxDeducted:number,amountClaimedThisYear:number){
            this.PAN=pan;
            this.name=name;
            this.amountForTaxDeduction=amountForTaxDeduction;             
            this.taxDeducted=taxDeducted;
            this.amountClaimedThisYear=amountClaimedThisYear;
    }
};


export class AdvanceTaxSelfAssessmentTaxModel {
    public BSRCode: string;
    public challanSerialNumber: string;
    public taxPaid: string="0";
    public depositDate : string;
    public depositDateXml : string="";
    public selectedTaxType : string=null;
    constructor(bsrCode: string, challan: string, taxPaid: string,depositDate : string) {
        this.BSRCode = bsrCode;
        this.challanSerialNumber = challan;
        this.taxPaid = taxPaid;
        this.depositDate=depositDate
    }
};