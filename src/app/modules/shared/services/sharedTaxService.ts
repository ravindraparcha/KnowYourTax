import { Injectable, Output, EventEmitter } from "@angular/core";

@Injectable()
export class SharedTaxService {

    @Output() totalTDS: EventEmitter<number> = new EventEmitter();
    @Output() totalTCS: EventEmitter<number> = new EventEmitter();
    @Output() totalSelfAssessmentTax: EventEmitter<number> = new EventEmitter();
    @Output() totalAdvanceTax: EventEmitter<number> = new EventEmitter();
    @Output() totalTDSTCS: EventEmitter<number> = new EventEmitter();
    @Output() totalTax: EventEmitter<number> = new EventEmitter();
    @Output() amountPayable: EventEmitter<number> = new EventEmitter();
    @Output() refund: EventEmitter<number> = new EventEmitter();
    @Output() selfAssessmentAdvanceTax: EventEmitter<any> = new EventEmitter();
    @Output() returnFiledSection: EventEmitter<number> = new EventEmitter();
    @Output() userPANNumber : EventEmitter<string> = new EventEmitter();
    @Output() spousePANNumber :  EventEmitter<string> = new EventEmitter();
    @Output() tenantPANNumberList :  EventEmitter<string[]> = new EventEmitter();
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
    }
    public changeUserPANNumber(pan:string) {
        this.userPANNumber.emit(pan);
    }
    public getUserPANNumber() {
        return this.userPANNumber;
    }
    public changeSpousePANNumber(pan:string) {
        this.spousePANNumber.emit(pan);
    }
    public getSpousePANNumber() {
        return this.spousePANNumber;
    }
     public changePANNumberList(pans:string[]) {
        this.tenantPANNumberList.emit(pans);
    }
    public getPANNumberList() {
        return this.tenantPANNumberList;
    }

    public changeTDSAmount(taxAmount: number) {
        this.tds = taxAmount;
        this.changeTotalTDSTCS();
        this.totalTDS.emit(taxAmount);
    }
    public getTDSAmount() {
        return this.totalTDS;
    }
    public changeTCSAmount(taxAmount: number) {
        this.tcs = taxAmount;
        this.changeTotalTDSTCS();
        this.totalTCS.emit(taxAmount);
    }
    public getTCSAmount() {
        return this.totalTCS;
    }
    public changeSelfAssessmentAmount(taxAmount: number) {
        this.selfAssessment = taxAmount;
        this.changeTotalTDSTCS();
        this.totalSelfAssessmentTax.emit(taxAmount);
    }
    public getSelfAssessmentAmount() {
        return this.totalSelfAssessmentTax;
    }
    public changeAdvanceTaxAmount(taxAmount: number) {
        this.advanceTax = taxAmount;
        this.changeTotalTDSTCS();
        this.totalAdvanceTax.emit(taxAmount);
    }
    public getAdvanceTaxAmount() {
        return this.totalAdvanceTax;
    }

    private changeTotalTDSTCS() {
        this.changeAmountPayable();
        this.changeRefund();
        this.totalTDSTCS.emit(this.getTotalTaxDeductedCollected());
    }
    public getTotalTDSTCS() {
        return this.totalTDSTCS;
    }

    public changeTotalTaxAmount(taxAmount: number) {
        this.totalTaxSum = taxAmount;
        this.changeAmountPayable();
        this.changeRefund();
        this.totalTax.emit(taxAmount);
    }
    public getTotalTaxAmount() {
        return this.totalTax;
    }
    private changeAmountPayable() {
        return this.amountPayable.emit(this.getDifference(true));
    }
    public getAmountPayable() {
        return this.amountPayable;
    }
    public changeSelfAssessmentAdvanceTax(selfAssessmentAdvanceTax) {
        this.selfAssessmentAdvanceTax.emit(selfAssessmentAdvanceTax);
    }
    public getSelfAssessmentAdvanceTax() {
        return this.selfAssessmentAdvanceTax;
    }

    public changeReturnFiledSection(returnFiledSec) {
        this.returnFiledSection.emit(returnFiledSec);
    }
    public getReturnFiledSection() {
        return this.returnFiledSection;
    }
    private changeRefund() {
        return this.refund.emit(this.getDifference(false));

    }
    public getRefund() {
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