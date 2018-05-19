export class TaxPaidModel {
    public totalAdvanceTaxPaid: number;
    public totalTDSClaimed: number;
    public totalTCSClaimed: number;
    public totalSelfAssessmentTaxPaid: number;
    public totalTaxesPaid: number;
    public amountPayable: number;
    public refund: number;
    public exemptedLongTermCapitalGain: number;
    public exemptedDividendIncome: number;
    public agricultureIncome: number;
    public otherExemptionModels: OtherExemptionModel[]
}
export class OtherExemptionModel {
    public selectedIncomeNature: string;
    public descriptionIfAnyOtherSelected: string;
    public amount: number
    constructor(descriptionIfAnyOtherSelected: string, amount: number,selectedIncomeNature:string) {
        this.descriptionIfAnyOtherSelected = descriptionIfAnyOtherSelected;
        this.amount = amount;
        this.selectedIncomeNature=selectedIncomeNature;
    }
}