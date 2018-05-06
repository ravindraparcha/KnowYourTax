import  { NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { NgxMyDatePickerModule } from 'ngx-mydatepicker';


import {eTaxXMLComponent} from './eTaxXML.component';
import {personalInfoComponent} from './personalInfo/personalInfo.component';
@NgModule({

    imports: [CommonModule,NgSelectModule,FormsModule,NgxMyDatePickerModule.forRoot()],
    providers : [],
    declarations : [eTaxXMLComponent,personalInfoComponent],
    exports : [eTaxXMLComponent]
})

export class eTaxXMLModule {}