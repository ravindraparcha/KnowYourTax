import { Component, OnInit  } from "@angular/core";

import { TaxPaidModel, OtherExemptionModel } from '../../models/tax-paid.model';
import { Configuration } from '../../../../shared/constants';
@Component({
 selector:'tax-paid-verification',
 templateUrl:'./tax-paid-verification.component.html'
})

export class TaxPaidVerificationComponent implements OnInit {
    public taxPaidModel : TaxPaidModel;
    public OtherExemptionModels = [];
    public newOtherExemptionModel;
    public incomeNatureList=[];
    constructor(private _configuration:Configuration){}
    ngOnInit(){
        this.taxPaidModel= new TaxPaidModel();
        this.incomeNatureList=this._configuration.incomeNatureList;
    }
    addNewOtherExemption() {
        this.newOtherExemptionModel = new OtherExemptionModel("",0,"");
        this.OtherExemptionModels.push(this.newOtherExemptionModel);
    }
    deleteOtherExemptionItem(index: number) {
        this.OtherExemptionModels.splice(index,1);
    }
    onSubmit() {
        console.log(this.OtherExemptionModels);
        
    }
}