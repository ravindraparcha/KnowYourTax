import  { NgModule, forwardRef} from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { NgxMyDatePickerModule } from 'ngx-mydatepicker';

import {eTaxXMLComponent} from '../eTaxXML/components/eTaxXML.component';
import {personalInfoComponent} from '../eTaxXML/components/personal-info/personal-info.component';
import {IncomeDetailsComponent} from '../eTaxXML/components/income-details/income-details.component';
import {sharedModule} from '../../shared/sharedModule';
import {DeductionsComponent} from '../eTaxXML/components/deduction/deductions.components';
import {TaxDeductedComponent} from '../eTaxXML/components/tax-deducted/tax-deducted.component';
import {TaxPaidVerificationComponent} from '../eTaxXML/components/tax-paid-verification/tax-paid-verification.component';
import {Donation80GComponent} from '../eTaxXML/components/donation-80G/donation.80G.component';



@NgModule({
    imports: [CommonModule,NgSelectModule,FormsModule,ReactiveFormsModule,NgxMyDatePickerModule.forRoot(),sharedModule],
    providers : [],
    declarations : [eTaxXMLComponent,personalInfoComponent,IncomeDetailsComponent,DeductionsComponent,TaxDeductedComponent,TaxPaidVerificationComponent,Donation80GComponent],
    exports : [eTaxXMLComponent]
})

export class eTaxXMLModule {}