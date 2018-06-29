import { Injectable } from "@angular/core";
import { ParserData } from '../models/parse-data-model';
import { PersonalInfoModel } from '../models/personal-info.model';
import { Form26ASParserModel, PersonalDetailModel, PartA, PartAMonthWise, PartACumulative } from '../models/form26AS-parser.model';
import { findReadVarNames } from "@angular/compiler/src/output/output_ast";
 
declare var parseForm26AS :any;

@Injectable()
export class Form26ASParserService {
    private _delimiter: string = "^";     
    public parseTextFile(fileData: string) {       
        let lines = fileData.split('\n');                 
        return parseForm26AS.extractInfoPartWise(lines,this._delimiter);       
    }
}
