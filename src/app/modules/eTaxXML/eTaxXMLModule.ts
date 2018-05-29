import  { NgModule, forwardRef} from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { NgxMyDatePickerModule } from 'ngx-mydatepicker';

import {eTaxXMLComponent} from '../eTaxXML/components/eTaxXML.component';
import {PersonalInfoComponent} from '../eTaxXML/components/personal-info/personal-info.component';
import {IncomeDetailsComponent} from '../eTaxXML/components/income-details/income-details.component';
import {sharedModule} from '../../shared/sharedModule';
import {DeductionsComponent} from '../eTaxXML/components/deduction/deductions.components';
import {TaxDeductedCollectedComponent} from '../eTaxXML/components/tax-deducted-collected/tax-deducted-collected.component';
import {TaxPaidVerificationComponent} from '../eTaxXML/components/tax-paid-verification/tax-paid-verification.component';
import {Donation80GComponent} from '../eTaxXML/components/donation-80G/donation.80G.component';
import {Form26ASParserService} from '../eTaxXML/services/form26AS-parser-service';
import {XmlGeneratorService} from '../eTaxXML/services/xml-generator-service';
import {SharedXMLService} from '../eTaxXML/shared/sharedXMLService';
import {TaxCalculatorService} from '../eTaxXML/services/tax-calculator.service';

@NgModule({
    imports: [CommonModule,NgSelectModule,FormsModule,ReactiveFormsModule,NgxMyDatePickerModule.forRoot(),sharedModule],
    providers : [Form26ASParserService,XmlGeneratorService,SharedXMLService,TaxCalculatorService],
    declarations : [eTaxXMLComponent,PersonalInfoComponent,IncomeDetailsComponent,DeductionsComponent,TaxDeductedCollectedComponent,TaxPaidVerificationComponent,Donation80GComponent],
    exports : [eTaxXMLComponent]
})

export class eTaxXMLModule {}