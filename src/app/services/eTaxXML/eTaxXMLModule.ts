import  { NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {eTaxXMLComponent} from './eTaxXML.component';
import {personalInfoComponent} from './personalInfo/personalInfo.component';
@NgModule({

    imports: [CommonModule,NgSelectModule,FormsModule,ReactiveFormsModule],
    providers : [],
    declarations : [eTaxXMLComponent,personalInfoComponent],
    exports : [eTaxXMLComponent]
})

export class eTaxXMLModule {}