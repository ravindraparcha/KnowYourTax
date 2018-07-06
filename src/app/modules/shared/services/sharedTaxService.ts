import { Injectable, Output, EventEmitter } from "@angular/core";

@Injectable()
export class SharedTaxService {

    @Output() totalTDS;
    @Output() totalTCS: EventEmitter<number> ;
    @Output() totalSelfAssessmentTax: EventEmitter<number>;
    @Output() totalAdvanceTax: EventEmitter<number> ;
    @Output() totalTDSTCS: EventEmitter<number> ;
    @Output() totalTax: EventEmitter<number> ;
    @Output() amountPayable: EventEmitter<number> ;
    @Output() refund: EventEmitter<number> ;
    @Output() selfAssessmentAdvanceTax: EventEmitter<any> ;
    @Output() returnFiledSection: EventEmitter<number>;
    @Output() userPANNumber: EventEmitter<string> ;
    @Output() spousePANNumber: EventEmitter<string> ;
    @Output() tenantPANNumberList: EventEmitter<string[]> ;
    @Output() isTenantAdded: EventEmitter<boolean> ;

    private tds;
    private tcs;
    private selfAssessment;
    private advanceTax;
    private totalTaxSum;

    constructor() {
        this.tds = 0;
        this.tcs = 0;
        this.selfAssessment = 0;
        this.advanceTax = 0;
        this.totalTaxSum = 0;
        this.totalTDS = new EventEmitter();
        this.totalTCS = new EventEmitter();
        this.totalSelfAssessmentTax = new EventEmitter();
        this.totalAdvanceTax = new EventEmitter();
        this.totalTDSTCS = new EventEmitter();
        this.totalTax = new EventEmitter();
        this.amountPayable = new EventEmitter();
        this.refund = new EventEmitter();
        this.selfAssessmentAdvanceTax = new EventEmitter();
        this.returnFiledSection = new EventEmitter();
        this.userPANNumber = new EventEmitter();
        this.spousePANNumber = new EventEmitter();
        this.tenantPANNumberList = new EventEmitter();
        this.isTenantAdded = new EventEmitter();
    }
    public changeUserPANNumber(pan: string) {
        this.userPANNumber.emit(pan);
    }
    public getUserPANNumber(): EventEmitter<string> {
        return this.userPANNumber;
    }
    public changeSpousePANNumber(pan: string) {
        this.spousePANNumber.emit(pan);
    }
    public getSpousePANNumber(): EventEmitter<string> {
        return this.spousePANNumber;
    }
    public changeTenantPANNumberList(pans: string[]) {
        this.tenantPANNumberList.emit(pans);
    }
    public getTenantPANNumberList(): EventEmitter<string[]> {
        return this.tenantPANNumberList;
    }

    public changeIsTenantAdded(isTenantAdded: boolean) {
        this.isTenantAdded.emit(isTenantAdded);
    }
    public getIsTenantAdded(): EventEmitter<boolean> {
        return this.isTenantAdded;
    }

    public changeTDSAmount(taxAmount: number) {
        this.tds = taxAmount;
        this.changeTotalTDSTCS();
        this.totalTDS.emit(taxAmount);
    }
    public getTDSAmount(): EventEmitter<number> {
        return this.totalTDS;
    }
    public changeTCSAmount(taxAmount: number) {
        this.tcs = taxAmount;
        this.changeTotalTDSTCS();
        this.totalTCS.emit(taxAmount);
    }
    public getTCSAmount(): EventEmitter<number> {
        return this.totalTCS;
    }
    public changeSelfAssessmentAmount(taxAmount: number) {
        this.selfAssessment = taxAmount;
        this.changeTotalTDSTCS();
        this.totalSelfAssessmentTax.emit(taxAmount);
    }
    public getSelfAssessmentAmount(): EventEmitter<number> {
        return this.totalSelfAssessmentTax;
    }
    public changeAdvanceTaxAmount(taxAmount: number) {
        this.advanceTax = taxAmount;
        this.changeTotalTDSTCS();
        this.totalAdvanceTax.emit(taxAmount);
    }
    public getAdvanceTaxAmount(): EventEmitter<number> {
        return this.totalAdvanceTax;
    }

    private changeTotalTDSTCS() {
        this.changeAmountPayable();
        this.changeRefund();
        this.totalTDSTCS.emit(this.getTotalTaxDeductedCollected());
    }
    public getTotalTDSTCS(): EventEmitter<number> {
        return this.totalTDSTCS;
    }

    public changeTotalTaxAmount(taxAmount: number) {
        this.totalTaxSum = taxAmount;
        this.changeAmountPayable();
        this.changeRefund();
        this.totalTax.emit(taxAmount);
    }
    public getTotalTaxAmount(): EventEmitter<number> {
        return this.totalTax;
    }
    private changeAmountPayable() {
        return this.amountPayable.emit(this.getDifference(true));
    }
    public getAmountPayable(): EventEmitter<number> {
        return this.amountPayable;
    }
    public changeSelfAssessmentAdvanceTax(selfAssessmentAdvanceTax) {
        this.selfAssessmentAdvanceTax.emit(selfAssessmentAdvanceTax);
    }
    public getSelfAssessmentAdvanceTax(): EventEmitter<number> {
        return this.selfAssessmentAdvanceTax;
    }

    public changeReturnFiledSection(returnFiledSec) {
        this.returnFiledSection.emit(returnFiledSec);
    }
    public getReturnFiledSection(): EventEmitter<number> {
        return this.returnFiledSection;
    }
    private changeRefund() {
        return this.refund.emit(this.getDifference(false));

    }
    public getRefund(): EventEmitter<number> {
        return this.refund;
    }
    private getDifference(isAmountPayable): number {
        let sum = this.getTotalTaxDeductedCollected();
        if (isAmountPayable) {
            let difference = this.totalTaxSum - sum;
            if (this.totalTaxSum > sum)
                return difference;
            else
                return 0;
        }
        else {
            let difference = sum - this.totalTaxSum;
            if (this.totalTaxSum < sum)
                return difference;
            else
                return 0;
        }
    }
    private getTotalTaxDeductedCollected(): number {
        return this.tcs + this.tds + this.advanceTax + this.selfAssessment;
    }

}