import { Component, OnInit } from "@angular/core";

import { TaxPaidModel, OtherExemptionModel, AccountDetailModel, VerificationModel } from '../../models/tax-paid.model';
import { Configuration } from '../../../../shared/constants';
import { INgxMyDpOptions, IMyDateModel } from "ngx-mydatepicker";
import {SharedXMLService} from '../../shared/sharedXMLService';

declare var $: any;
@Component({
    selector: 'tax-paid-verification',
    templateUrl: './tax-paid-verification.component.html'
})

export class TaxPaidVerificationComponent implements OnInit {
    public taxPaidModel: TaxPaidModel;
    public verificationModel: VerificationModel;

    public OtherExemptionModels = [];
    public newOtherExemptionModel;

    public otherAccountDetailModels = [];
    public newOtherAccountDetailModel;

    public accountDetailModel;

    public incomeNatureList = [];

    myOptions: INgxMyDpOptions = {
        dateFormat: this._configuration.dateTimeFormat
    };

    constructor(private _configuration: Configuration, private _sharedXMLService: SharedXMLService) { }
    ngOnInit() {

        $('.panel-collapse').on('show.bs.collapse', function () {
            $(this).siblings('.panel-heading-custom').addClass('active');
        });

        $('.panel-collapse').on('hide.bs.collapse', function () {
            $(this).siblings('.panel-heading-custom').removeClass('active');
        });

        this.taxPaidModel = new TaxPaidModel();
        this.verificationModel = new VerificationModel("","","",0,"","","","",0);
        this.incomeNatureList = this._configuration.incomeNatureList;
        this.accountDetailModel = new AccountDetailModel("", "", "");
        this.taxPaidModel.accountDetail = this.accountDetailModel;
        this.taxPaidModel.otherExemptionModels = [];
        this.taxPaidModel.otherAccountDetails = [];
        this.taxPaidModel.verificationModel=this.verificationModel;
    }
    addNewOtherExemption() {
        this.newOtherExemptionModel = new OtherExemptionModel("", 0, "");
        this.OtherExemptionModels.push(this.newOtherExemptionModel);
        this.taxPaidModel.otherExemptionModels=this.OtherExemptionModels;
    }
    deleteOtherExemptionItem(index: number) {
        this.OtherExemptionModels.splice(index, 1);
    }

    addNewOtherAccountDetailModel() {
        this.newOtherAccountDetailModel = new AccountDetailModel("", "", "");
        this.otherAccountDetailModels.push(this.newOtherAccountDetailModel);
        this.taxPaidModel.otherAccountDetails=this.otherAccountDetailModels;
    }
    deleteOtherAccountDetailModelItem(index: number) {
        this.otherAccountDetailModels.splice(index, 1);
    }

    onVerficationDateChanged(event:IMyDateModel){
        if (event.date.day != 0) {
            this.verificationModel.verficationDate = event.date.day + "/" + event.date.month + "/" + event.date.year;
            this.verificationModel.verificationDateXml =this._sharedXMLService.formatDate(event.date.day,event.date.month,event.date.year,"yyyy-mm-dd","-");
        }
        else {
            this.verificationModel.verficationDate = "";
            this.verificationModel.verificationDateXml ="";
        }
    }

    onSubmit() {
        console.log(this.taxPaidModel);
        console.log(this.OtherExemptionModels);
        console.log(this.otherAccountDetailModels);

    }
}