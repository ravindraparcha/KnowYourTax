import { Component, OnInit, Output, ViewChild, EventEmitter, HostListener } from '@angular/core';
import { Donation80G,DonationDeduction } from '../../models/donation-80G.model';
import { INgxMyDpOptions, IMyDateModel } from "ngx-mydatepicker";
import { ConfigurationService } from '../../../shared/services/ConfigurationService';

@Component({
    selector:'donation-80G',
    templateUrl:'./donation.80G.component.html'
})

export class Donation80GComponent  {

    public donation80G : Donation80G;

    public donation100DeductionWithoutQualifyingLimitModels;
    private _newDonation100DeductionWithoutQualifyingLimitModel;

    public donation50DeductionWithoutQualifyingLimitModels;
    private _newDonation50DeductionWithoutQualifyingLimitModel;

    public donation100DeductionWithQualifyingLimitModels;
    private _newDonation100DeductionWithQualifyingLimitModel;

    public donation50DeductionWithQualifyingLimitModels;
    private _newDonation50DeductionWithQualifyingLimitModel;

    @Output() isDonation80GComponentValid: EventEmitter<boolean> = new EventEmitter<boolean>();
    @ViewChild('donation80GForm') donation80GForm;
    
    constructor(public configuration : ConfigurationService) {
        this.donation100DeductionWithoutQualifyingLimitModels=[];
        this.donation50DeductionWithoutQualifyingLimitModels=[];
        this.donation100DeductionWithQualifyingLimitModels=[];
        this.donation50DeductionWithQualifyingLimitModels=[];

        this.donation80G = new Donation80G();
        this.donation80G.donation100DeductionWithoutQualifyingLimit=[];
        this.donation80G.donation50DeductionWithoutQualifyingLimit= [];
        this.donation80G.donation100DeductionWithQualifyingLimit = [];
        this.donation80G.donation50DeductionWithQualifyingLimit = [];
    }
      
    addNewDonation100DeductionWithoutQualifyingLimit() {
        this._newDonation100DeductionWithoutQualifyingLimitModel = new DonationDeduction("","","",null,0,"",0,0);
        this.donation100DeductionWithoutQualifyingLimitModels.push(this._newDonation100DeductionWithoutQualifyingLimitModel);
        this.donation80G.donation100DeductionWithoutQualifyingLimit = this.donation100DeductionWithoutQualifyingLimitModels;        
    }
    deleteDonation100DeductionWithoutQualifyingLimitItem(index: number) {
        this.donation100DeductionWithoutQualifyingLimitModels.splice(index,1);
    }

    addNewDonation50DeductionWithoutQualifyingLimit() {
        this._newDonation50DeductionWithoutQualifyingLimitModel = new DonationDeduction("","","",null,0,"",0,0);        
        this.donation50DeductionWithoutQualifyingLimitModels.push(this._newDonation50DeductionWithoutQualifyingLimitModel);
        this.donation80G.donation50DeductionWithoutQualifyingLimit = this.donation50DeductionWithoutQualifyingLimitModels;
    }
    deleteDonation50DeductionWithoutQualifyingLimitItem(index: number) {
        this.donation50DeductionWithoutQualifyingLimitModels.splice(index,1);
    }
    addNewDonation100DeductionWithQualifyingLimit() {
        this._newDonation100DeductionWithoutQualifyingLimitModel = new DonationDeduction("","","",null,0,"",0,0);
        this.donation100DeductionWithQualifyingLimitModels.push(this._newDonation100DeductionWithoutQualifyingLimitModel);
        this.donation80G.donation100DeductionWithQualifyingLimit = this.donation100DeductionWithQualifyingLimitModels;
    }    
    deleteDonation100DeductionWithQualifyingLimitItem(index: number) {
        this.donation100DeductionWithQualifyingLimitModels.splice(index,1);
    }

    addNewDonation50DeductionWithQualifyingLimit() {
        this._newDonation50DeductionWithQualifyingLimitModel = new DonationDeduction("","","",null,0,"",0,0);
        this.donation50DeductionWithQualifyingLimitModels.push(this._newDonation50DeductionWithQualifyingLimitModel);
        this.donation80G.donation50DeductionWithQualifyingLimit=this.donation50DeductionWithQualifyingLimitModels;
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
    public validateDonation80GComponentForm() {
       
        if (this.donation80GForm.valid)  
            this.isDonation80GComponentValid.emit(true);
        else 
            this.isDonation80GComponentValid.emit(false);         
    }     
}