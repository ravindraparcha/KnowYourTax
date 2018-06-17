import { NgModule } from '@angular/core';
import {IndianCurrency} from './pipe/indianCurrency';
import { CommonModule } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { NgxMyDatePickerModule } from 'ngx-mydatepicker';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {BrowserModule} from '@angular/platform-browser';
import { ToastrModule } from 'ngx-toastr';

import {DeductionsComponent} from './components/deduction/deductions.components';
import {IncomeDetailsComponent} from './components/income-details/income-details.component';
@NgModule({
    imports: [CommonModule,NgSelectModule,FormsModule,ReactiveFormsModule,NgxMyDatePickerModule,BrowserAnimationsModule,
            BrowserModule,ToastrModule],
    providers : [],
    declarations : [IndianCurrency,DeductionsComponent,IncomeDetailsComponent],
    exports : [IndianCurrency,DeductionsComponent,IncomeDetailsComponent]
})
 

export class sharedModule{}

 