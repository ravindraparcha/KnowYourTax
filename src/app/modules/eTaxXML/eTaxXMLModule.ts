import  { NgModule, forwardRef} from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { NgxMyDatePickerModule } from 'ngx-mydatepicker';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {BrowserModule} from '@angular/platform-browser';
import { ToastrModule } from 'ngx-toastr';

import {eTaxXMLComponent} from '../eTaxXML/components/eTaxXML.component';
import {PersonalInfoComponent} from '../eTaxXML/components/personal-info/personal-info.component';
import {sharedModule} from '../../shared/sharedModule';
//import {DeductionsComponent} from '../eTaxXML/components/deduction/deductions.components';
import {TaxDeductedCollectedComponent} from '../eTaxXML/components/tax-deducted-collected/tax-deducted-collected.component';
import {TaxPaidVerificationComponent} from '../eTaxXML/components/tax-paid-verification/tax-paid-verification.component';
import {Donation80GComponent} from '../eTaxXML/components/donation-80G/donation.80G.component';
import {Form26ASParserService} from '../eTaxXML/services/form26AS-parser-service';
import {XmlGeneratorService} from '../eTaxXML/services/xml-generator-service';
import {FormatDateService} from '../eTaxXML/shared/FormatDateService';

import {SharedTaxService} from '../../shared/services/sharedTaxService';
//Validator starts
import {EmailValidatorDirective} from '../../shared/validators/EmailValidatorDirective';
import {NameValidatorDirective} from '../../shared/validators/NameValidationDirective';
import {AadharCardValidatorDirective} from '../../shared/validators/AadharCardDirective';
import {PanCardValidatorDirective} from '../../shared/validators/PanCardDirective';
import {AadharCardEnrollmentIdValidatorDirective} from '../../shared/validators/AadharCardEnrollmentIdDirective';
import {MobileNoValidatorDirective} from '../../shared/validators/MobileNumberDirective';
import {PinCodeValidatorDirective} from '../../shared/validators/PinCodeDirective';
import {ReceiptNumberValidatorDirective} from '../../shared/validators/ReceiptNumberDirective';
import {NoticeNumberValidatorDirective} from '../../shared/validators/NoticeNumberDirective';
import {CompareTwoNumbersValidatorDirective} from '../../shared/validators/CompareTwoNumbersDirective';
import {RequiredValidatorDirective} from '../../shared/validators/RequiredDirective';
import {IFSCValidatorDirective} from '../../shared/validators/IFSCDirective';
import {CharacterNumberValidatorDirective} from '../../shared/validators/CharacterNumberDirective';
import {CountValidatorDirective} from '../../shared/validators/CountDirective';
//Validator ends
@NgModule({
    imports: [CommonModule,NgSelectModule,FormsModule,ReactiveFormsModule,
              NgxMyDatePickerModule.forRoot(),sharedModule,
            BrowserModule,BrowserAnimationsModule,ToastrModule.forRoot({timeOut: 1000,
                positionClass: 'toast-center'})],
    providers : [Form26ASParserService,XmlGeneratorService,FormatDateService,
                 SharedTaxService],
    declarations : [eTaxXMLComponent,PersonalInfoComponent,
                    TaxDeductedCollectedComponent,TaxPaidVerificationComponent,Donation80GComponent,
                    EmailValidatorDirective,NameValidatorDirective,AadharCardValidatorDirective,PanCardValidatorDirective,
                    AadharCardEnrollmentIdValidatorDirective,MobileNoValidatorDirective,PinCodeValidatorDirective,ReceiptNumberValidatorDirective,
                    NoticeNumberValidatorDirective,CompareTwoNumbersValidatorDirective,RequiredValidatorDirective,
                    IFSCValidatorDirective,CharacterNumberValidatorDirective,CountValidatorDirective],
    exports : [eTaxXMLComponent]
})

export class eTaxXMLModule {}