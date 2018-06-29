export class Donation80G {
    public donation100DeductionWithoutQualifyingLimit: DonationDeduction[];
    public donation50DeductionWithoutQualifyingLimit: DonationDeduction[];
    public donation100DeductionWithQualifyingLimit: DonationDeduction[];
    public donation50DeductionWithQualifyingLimit: DonationDeduction[];
}

export class DonationDeduction {
    public doneeName: string;
    public address: string;
    public cityTownDistrict: string;
    public selectedStateCode: string=null;
    public pinCode: number;
    public PAN: string;
    public donationAmount: number;   
    constructor(doneeName: string,address: string,cityTownDistrict: string,selectedStateCode: string,
        pinCode: number,PAN: string,donationAmount: number){
            this.doneeName=doneeName;
            this.address=address;
            this.cityTownDistrict=cityTownDistrict;
            this.selectedStateCode=selectedStateCode;
            this.pinCode=pinCode;
            this.PAN=PAN;
            this.donationAmount=donationAmount;           
    }
}