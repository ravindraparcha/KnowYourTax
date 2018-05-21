export class PersonalInfoModel {
    
//     ^Form 26AS^

// File Creation Date^Permanent Account Number (PAN)^Current Status of PAN^Financial Year^Assessment Year^Name of Assessee^Address Line 1^Address Line 2^Address Line 3^Address Line 4^Address Line 5^Statecode^Pin Code
}

export class ParserData {
    public key : string;
    public value: string;
    public itemIndex :number;
    constructor(key:string,value:string,index:number){
        this.key=key;
        this.value=value;
        this.itemIndex=index;
    }
}