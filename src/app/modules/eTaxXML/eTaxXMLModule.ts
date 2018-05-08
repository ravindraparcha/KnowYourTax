import  { NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { NgxMyDatePickerModule } from 'ngx-mydatepicker';

import {eTaxXMLComponent} from '../eTaxXML/components/eTaxXML.component';
import {personalInfoComponent} from '../eTaxXML/components/personal-info/personal-info.component';
import {IncomeDetailsComponent} from '../eTaxXML/components/income-details/income-details.component';
import {sharedModule} from '../../shared/sharedModule';

@NgModule({
    imports: [CommonModule,NgSelectModule,FormsModule,NgxMyDatePickerModule.forRoot(),sharedModule],
    providers : [],
    declarations : [eTaxXMLComponent,personalInfoComponent,IncomeDetailsComponent],
    exports : [eTaxXMLComponent]
})

export class eTaxXMLModule {}