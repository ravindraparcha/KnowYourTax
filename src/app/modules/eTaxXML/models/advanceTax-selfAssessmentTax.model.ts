export class AdvanceTaxSelfAssessmentTaxModel {
    public BSRCode: string;
    public challanSerialNumber: string;
    public taxPaid: number;
    public depositDate : string;
    constructor(bsrCode: string, challan: string, taxPaid: number,depositDate : string) {
        this.BSRCode = bsrCode;
        this.challanSerialNumber = challan;
        this.taxPaid = taxPaid;
        this.depositDate=depositDate
    }
}