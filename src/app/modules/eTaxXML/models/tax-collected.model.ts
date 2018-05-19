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
}