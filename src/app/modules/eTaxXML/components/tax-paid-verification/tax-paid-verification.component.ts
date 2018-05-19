import { Component, OnInit  } from "@angular/core";

import { TaxPaidModel, OtherExemptionModel,AccountDetailModel } from '../../models/tax-paid.model';
import { Configuration } from '../../../../shared/constants';
declare var $: any;
@Component({
 selector:'tax-paid-verification',
 templateUrl:'./tax-paid-verification.component.html'
})

export class TaxPaidVerificationComponent implements OnInit {
    public taxPaidModel : TaxPaidModel;

    public OtherExemptionModels = [];
    public newOtherExemptionModel;

    public otherAccountDetailModels =[];
    public newOtherAccountDetailModel;

public accountDetailModel;

    public incomeNatureList=[];
    constructor(private _configuration:Configuration){}
    ngOnInit(){

        $('.panel-collapse').on('show.bs.collapse', function () {
            $(this).siblings('.panel-heading-custom').addClass('active');
        });

        $('.panel-collapse').on('hide.bs.collapse', function () {
            $(this).siblings('.panel-heading-custom').removeClass('active');
        });

        this.taxPaidModel= new TaxPaidModel();
        this.incomeNatureList=this._configuration.incomeNatureList;
        this.accountDetailModel=new AccountDetailModel("","","");
    }
    addNewOtherExemption() {
        this.newOtherExemptionModel = new OtherExemptionModel("",0,"");
        this.OtherExemptionModels.push(this.newOtherExemptionModel);
    }
    deleteOtherExemptionItem(index: number) {
        this.OtherExemptionModels.splice(index,1);
    }

    addNewOtherAccountDetailModel() {
        this.newOtherAccountDetailModel = new AccountDetailModel("","","");
        this.otherAccountDetailModels.push(this.newOtherAccountDetailModel);
    }
    deleteOtherAccountDetailModelItem(index: number) {
        this.otherAccountDetailModels.splice(index,1);
    }

    onSubmit() {
        console.log(this.OtherExemptionModels);
        console.log(this.otherAccountDetailModels);
        
    }
}