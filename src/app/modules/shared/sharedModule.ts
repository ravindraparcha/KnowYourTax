import { NgModule } from '@angular/core';
import {IndianCurrency} from './pipe/indianCurrency';
import { CommonModule } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { NgxMyDatePickerModule } from 'ngx-mydatepicker';

//import { ToastrModule } from 'ngx-toastr';

import {DeductionsComponent} from './components/deduction/deductions.components';
import {IncomeDetailsComponent} from './components/income-details/income-details.component';
import { SharedTaxService } from './services/sharedTaxService';
@NgModule({
    imports: [CommonModule,NgSelectModule,NgxMyDatePickerModule,
            FormsModule,ReactiveFormsModule],
    providers : [SharedTaxService],
    declarations : [IndianCurrency,DeductionsComponent,IncomeDetailsComponent],
    exports : [IndianCurrency,DeductionsComponent,IncomeDetailsComponent]
})
 

export class sharedModule{}

 