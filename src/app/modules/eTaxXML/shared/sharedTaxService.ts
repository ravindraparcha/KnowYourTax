import { Injectable, Output, EventEmitter } from "@angular/core";
 
@Injectable()
export class SharedTaxService {

    @Output() totalTDS : EventEmitter<any> = new EventEmitter();

    // private totalAdvanceTaxPaid = new BehaviorSubject(0);
    // private totalTDSClaimed = new BehaviorSubject(0);
    // private totalTCSClaimed = new BehaviorSubject(0);
    // private totalSelfAssessmentTaxPaid = new BehaviorSubject(0);
    
    // public currentTotalAdvancetaxPaid = this.totalAdvanceTaxPaid.asObservable();
    // public currentTotalTDSClaimed = this.totalTDSClaimed.asObservable();
    // public currentTotalTCSClaimed = this.totalTCSClaimed.asObservable();
    // public currentTotalSelfAssessmentTaxPaid = this.totalSelfAssessmentTaxPaid.asObservable();

    constructor(){}

    public changeTDSAmount(taxAmount: number) {
        this.totalTDS.emit(taxAmount);
    }
    public getTDSAmount() {
        return this.totalTDS;
    }

    // public changeTotalAdvanceTaxPaid(tax:number) {
    //     this.totalAdvanceTaxPaid.next(tax);
    // }
    // public changeTotalTDSClaimed(tax:number) {
    //     this.totalAdvanceTaxPaid.next(tax);
    // }
    // public changeTotalTCSClaimed(tax:number) {
    //     this.totalAdvanceTaxPaid.next(tax);
    // }
    // public changeTotalSelfAssessmentTaxPaid(tax:number=0) {
    //     this.totalAdvanceTaxPaid.next(tax);
    // }
}