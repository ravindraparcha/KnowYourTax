import { Injectable } from "@angular/core";
import { ParserData } from '../models/personal-info.model';

@Injectable()
export class Form26ASParserService {
    private _delimiter: string = "^";
    private _personalInfoIndexCount = 12;
    private _firstDelimiterKeyIndex: number = 0;
    private _nextDelimiterKeyIndex: number = 0;
    private _firstDelimiterValueIndex: number = 0;
    private _nextDelimiterValueIndex: number = 0;

    private _itemIndex: number = 0;
    public parsedDataArray = [];
    private _parserData;
    private _key : string;
    private _value: string;
    public dataToParse(data: string) {
        let pinCodeIndex:number=data.indexOf("Pin Code")+8;
        this._firstDelimiterKeyIndex=12;
        //while(this._firstDelimiterIndex!=-1) {
        while (this._itemIndex < this._personalInfoIndexCount) {
            this._firstDelimiterKeyIndex = data.indexOf(this._delimiter, this._firstDelimiterKeyIndex);
            this._firstDelimiterKeyIndex = this._firstDelimiterKeyIndex + 1;
            this._nextDelimiterKeyIndex = data.indexOf(this._delimiter, this._firstDelimiterKeyIndex);
            this._key = data.substring(this._firstDelimiterKeyIndex, this._nextDelimiterKeyIndex);      
            
            this._firstDelimiterValueIndex=data.indexOf(this._delimiter,pinCodeIndex+this._firstDelimiterValueIndex);
            this._firstDelimiterValueIndex = this._firstDelimiterValueIndex + 1;

            if(data.substring(this._firstDelimiterValueIndex)==this._delimiter)
                this._firstDelimiterValueIndex+=1;                

            this._nextDelimiterValueIndex = data.indexOf(this._delimiter, this._firstDelimiterValueIndex);
            if(data.substring(this._nextDelimiterValueIndex)==this._delimiter)
                this._nextDelimiterValueIndex+=1;        

            this._value = data.substring(this._firstDelimiterValueIndex, this._nextDelimiterValueIndex);   

            //this._value=data.substring( pinCodeIndex+1, this._nextDelimiterIndex);
            this.parsedDataArray.push(new ParserData(this._key.trim(), this._value.trim(), this._itemIndex));
            this._itemIndex += 1;
            pinCodeIndex=0;
        }
       console.log(this.parsedDataArray);
        this._itemIndex = 0;

    }
}
