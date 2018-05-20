import  {Component, OnInit} from '@angular/core';
import { Donation80G,DonationDeduction } from '../../models/donation-80G.model';
import { INgxMyDpOptions, IMyDateModel } from "ngx-mydatepicker";
import { Configuration } from '../../../../shared/constants';

@Component({
    selector:'donation-80G',
    templateUrl:'./donation.80G.component.html'

})

export class Donation80GComponent {

    public donation100DeductionWithoutQualifyingLimitModels=[];
    public newDonation100DeductionWithoutQualifyingLimitModel;

    public donation50DeductionWithoutQualifyingLimitModels=[];
    public newDonation50DeductionWithoutQualifyingLimitModel;

    public donation100DeductionWithQualifyingLimitModels=[];
    public newDonation100DeductionWithQualifyingLimitModel;

    public donation50DeductionWithQualifyingLimitModels=[];
    public newDonation50DeductionWithQualifyingLimitModel;

    
    constructor(public configuration : Configuration){}

    addNewDonation100DeductionWithoutQualifyingLimit() {
        this.newDonation100DeductionWithoutQualifyingLimitModel = new DonationDeduction("","","","",0,"",0,0);
        this.donation100DeductionWithoutQualifyingLimitModels.push(this.newDonation100DeductionWithoutQualifyingLimitModel);
    }
    deleteDonation100DeductionWithoutQualifyingLimitItem(index: number) {
        this.donation100DeductionWithoutQualifyingLimitModels.splice(index,1);
    }

    addNewDonation50DeductionWithoutQualifyingLimit() {
        this.newDonation50DeductionWithoutQualifyingLimitModel = new DonationDeduction("","","","",0,"",0,0);
        this.donation50DeductionWithoutQualifyingLimitModels.push(this.newDonation50DeductionWithoutQualifyingLimitModel);
    }
    deleteDonation50DeductionWithoutQualifyingLimitItem(index: number) {
        this.donation50DeductionWithoutQualifyingLimitModels.splice(index,1);
    }
    addNewDonation100DeductionWithQualifyingLimit() {
        this.newDonation100DeductionWithoutQualifyingLimitModel = new DonationDeduction("","","","",0,"",0,0);
        this.donation100DeductionWithQualifyingLimitModels.push(this.newDonation100DeductionWithoutQualifyingLimitModel);
    }    
    deleteDonation100DeductionWithQualifyingLimitItem(index: number) {
        this.donation100DeductionWithQualifyingLimitModels.splice(index,1);
    }

    addNewDonation50DeductionWithQualifyingLimit() {
        this.newDonation50DeductionWithQualifyingLimitModel = new DonationDeduction("","","","",0,"",0,0);
        this.donation50DeductionWithQualifyingLimitModels.push(this.newDonation50DeductionWithQualifyingLimitModel);
    }
    deleteDonation50DeductionWithQualifyingLimitItem(index: number) {
        this.donation50DeductionWithQualifyingLimitModels.splice(index,1);
    }
    onSubmit(){
        console.log(this.donation100DeductionWithoutQualifyingLimitModels);
        console.log(this.donation50DeductionWithoutQualifyingLimitModels);
        console.log(this.donation100DeductionWithQualifyingLimitModels);
        console.log(this.donation50DeductionWithQualifyingLimitModels);
    }
}