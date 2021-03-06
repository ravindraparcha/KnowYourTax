import { Component, OnInit, Output, EventEmitter, ViewChild, OnDestroy } from "@angular/core";

import { TaxPaidModel, OtherExemptionModel, AccountDetailModel, VerificationModel } from '../../models/tax-paid.model';
import { ConfigurationService } from '../../../shared/services/configurationService';
import { INgxMyDpOptions, IMyDateModel } from "ngx-mydatepicker";
import { FormatDateService } from '../../services/formatDateService';
import { SharedTaxService } from '../../../shared/services/sharedTaxService';
import { Subscription } from 'rxjs/Rx';
declare var $: any;
@Component({
    selector: 'tax-paid-verification',
    templateUrl: './tax-paid-verification.component.html'
})

export class TaxPaidVerificationComponent implements OnInit,OnDestroy {
    public taxPaidModel: TaxPaidModel;
    public verificationModel: VerificationModel;

    public OtherExemptionModels ;
    private _newOtherExemptionModel;

    public otherAccountDetailModels ;
    private _newOtherAccountDetailModel;

    public accountDetailModel;
    public model: any;
    public incomeNatureList;
    private _subscription: Subscription;
    private totalTaxInterest: number;

    @Output() isTaxPaidVerificationComponentValid: EventEmitter<boolean> = new EventEmitter<boolean>();
    @ViewChild('taxPaidVerificationFrm') taxPaidVerificationFrm;

    public myOptions: INgxMyDpOptions ; 
    constructor(private _configuration: ConfigurationService, private _formatDateService: FormatDateService, private _sharedTaxService: SharedTaxService) {
        this.myOptions = {
            dateFormat: this._configuration.dateTimeFormat
        };
        this.OtherExemptionModels = [];
        this.otherAccountDetailModels = [];
        this.incomeNatureList = [];
        this.totalTaxInterest = 0;
    }

    ngOnInit() {

        $('.panel-collapse').on('show.bs.collapse', function () {
            $(this).siblings('.panel-heading-custom').addClass('active');
        });

        $('.panel-collapse').on('hide.bs.collapse', function () {
            $(this).siblings('.panel-heading-custom').removeClass('active');
        });

        this.taxPaidModel = new TaxPaidModel();
        this.verificationModel = new VerificationModel("", "", "", 0, "", null, "", "", "");
        this.incomeNatureList = this._configuration.incomeNatureList;
        this.accountDetailModel = new AccountDetailModel("", "", "");
        this.taxPaidModel.accountDetail = this.accountDetailModel;
        this.taxPaidModel.otherExemptionModels = [];
        this.taxPaidModel.otherAccountDetails = [];
        this.taxPaidModel.verificationModel = this.verificationModel;

        this._subscription = this._sharedTaxService.getTDSAmount().subscribe(item => this.taxPaidModel.totalTDSClaimed = item);
        this._subscription = this._sharedTaxService.getTCSAmount().subscribe(item => this.taxPaidModel.totalTCSClaimed = item);
        this._subscription = this._sharedTaxService.getSelfAssessmentAmount().subscribe(item => this.taxPaidModel.totalSelfAssessmentTaxPaid = item);
        this._subscription = this._sharedTaxService.getAdvanceTaxAmount().subscribe(item => this.taxPaidModel.totalAdvanceTaxPaid = item);
        this._subscription = this._sharedTaxService.getTotalTaxAmount().subscribe(item => this.totalTaxInterest = item);
        this._subscription = this._sharedTaxService.getTotalTDSTCS().subscribe(item => this.taxPaidModel.totalTaxesPaid = item);
        this._subscription = this._sharedTaxService.getAmountPayable().subscribe(item => this.taxPaidModel.amountPayable = item);
        this._subscription = this._sharedTaxService.getRefund().subscribe(item => this.taxPaidModel.refund = item);
    }
    ngOnDestroy() {
        this._subscription.unsubscribe();
    }

    addNewOtherExemption() {
        this._newOtherExemptionModel = new OtherExemptionModel("", 0);
        this.OtherExemptionModels.push(this._newOtherExemptionModel);
        this.taxPaidModel.otherExemptionModels = this.OtherExemptionModels;
    }
    public deleteOtherExemptionItem(index: number) {
        this.OtherExemptionModels.splice(index, 1);
    }

    public addNewOtherAccountDetailModel() {
        this._newOtherAccountDetailModel = new AccountDetailModel("", "", "");
        this.otherAccountDetailModels.push(this._newOtherAccountDetailModel);
        this.taxPaidModel.otherAccountDetails = this.otherAccountDetailModels;
    }
    public deleteOtherAccountDetailModelItem(index: number) {
        this.otherAccountDetailModels.splice(index, 1);
    }

    public onVerficationDateChanged(event: IMyDateModel) {
        if (event.date.day != 0) {
            this.verificationModel.verficationDate = event.date.day + "/" + event.date.month + "/" + event.date.year;
            this.verificationModel.verificationDateXml = this._formatDateService.formatDate(event.date.day, event.date.month, event.date.year, "yyyy-mm-dd", "-");
        }
        else {
            this.verificationModel.verficationDate = "";
            this.verificationModel.verificationDateXml = "";
        }
    }

    onSubmit() {
        console.log(this.taxPaidModel);
        console.log(this.OtherExemptionModels);
        console.log(this.otherAccountDetailModels);
    }

    public validateTaxPaidVerificationComponentForm() {
        if (this.taxPaidVerificationFrm.valid)
            this.isTaxPaidVerificationComponentValid.emit(true);
        else
            this.isTaxPaidVerificationComponentValid.emit(false);
    }
}