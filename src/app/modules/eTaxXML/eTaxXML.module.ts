import  { NgModule, forwardRef} from '@angular/core';

import { NgSelectModule } from '@ng-select/ng-select';
import { NgxMyDatePickerModule } from 'ngx-mydatepicker';
// import {BrowserModule} from '@angular/platform-browser';
import { ToastrModule } from 'ngx-toastr';

import {eTaxXMLComponent} from '../eTaxXML/eTaxXML.component';
import {PersonalInfoComponent} from '../eTaxXML/components/personal-info/personal-info.component';
import {sharedModule} from  '../shared/sharedModule';//'../../sharedModule/sharedModule';
import {DeductionsComponent} from '../shared/components/deduction/deductions.components';
import { IncomeDetailsComponent } from  '../shared/components/income-details/income-details.component';
import {TaxDeductedCollectedComponent} from '../eTaxXML/components/tax-deducted-collected/tax-deducted-collected.component';
import {TaxPaidVerificationComponent} from '../eTaxXML/components/tax-paid-verification/tax-paid-verification.component';
import {Donation80GComponent} from '../eTaxXML/components/donation-80G/donation.80G.component';
import {Form26ASParserService} from '../eTaxXML/services/form26AS-parser-service';
import {XmlGeneratorService} from '../eTaxXML/services/xml-generator-service';
import {FormatDateService} from '../eTaxXML/services/FormatDateService';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import {SharedTaxService} from '../shared/services/sharedTaxService';
//Validator starts
import {EmailValidatorDirective} from  './validators/EmailValidatorDirective';
import {NameValidatorDirective} from './validators/NameValidationDirective';
import {AadharCardValidatorDirective} from './validators/AadharCardDirective';
import {PanCardValidatorDirective} from './validators/PanCardDirective';
import {AadharCardEnrollmentIdValidatorDirective} from './validators/AadharCardEnrollmentIdDirective';
import {MobileNoValidatorDirective} from './validators/MobileNumberDirective';
import {PinCodeValidatorDirective} from './validators/PinCodeDirective';
import {ReceiptNumberValidatorDirective} from './validators/ReceiptNumberDirective';
import {NoticeNumberValidatorDirective} from './validators/NoticeNumberDirective';
import {CompareTwoNumbersValidatorDirective} from './validators/CompareTwoNumbersDirective';
import {RequiredValidatorDirective} from './validators/RequiredDirective';
import {IFSCValidatorDirective} from './validators/IFSCDirective';
import {CharacterNumberValidatorDirective} from './validators/CharacterNumberDirective';
import {CountValidatorDirective} from './validators/CountDirective';
import {DuplicateCheckValidatorDirective} from './validators/DuplicateCheckDirective';
import {NumberLimitValidatorDirective} from './validators/NumberLimitDirective';
import {TanCardValidatorDirective} from './validators/TanCardDirective';
//Validator ends
import {eTaxXMLRoutingModule} from './eTaxXML.routing';
import { CommonModule } from '@angular/common';  


@NgModule({
    imports: [NgSelectModule,
              NgxMyDatePickerModule.forRoot(),sharedModule,
              ToastrModule.forRoot({timeOut: 1000,
                positionClass: 'toast-center'}),
                eTaxXMLRoutingModule,FormsModule,ReactiveFormsModule,CommonModule],
    providers : [Form26ASParserService,XmlGeneratorService,FormatDateService,
                 SharedTaxService],
    declarations : [eTaxXMLComponent,PersonalInfoComponent,//,IncomeDetailsComponent,
                    TaxDeductedCollectedComponent,TaxPaidVerificationComponent,Donation80GComponent,
                    EmailValidatorDirective,NameValidatorDirective,AadharCardValidatorDirective,PanCardValidatorDirective,
                    AadharCardEnrollmentIdValidatorDirective,MobileNoValidatorDirective,PinCodeValidatorDirective,ReceiptNumberValidatorDirective,
                    NoticeNumberValidatorDirective,CompareTwoNumbersValidatorDirective,RequiredValidatorDirective,
                    IFSCValidatorDirective,CharacterNumberValidatorDirective,CountValidatorDirective,
                    DuplicateCheckValidatorDirective,NumberLimitValidatorDirective,TanCardValidatorDirective],
    exports : [eTaxXMLComponent]
})

export class eTaxXMLModule {}