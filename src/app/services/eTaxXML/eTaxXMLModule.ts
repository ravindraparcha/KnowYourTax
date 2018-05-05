import  { NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';
import {eTaxXMLComponent} from './eTaxXML.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';

@NgModule({

    imports: [CommonModule,NgSelectModule,FormsModule],
    providers : [],
    declarations : [eTaxXMLComponent],
    exports : [eTaxXMLComponent]
})

export class eTaxXMLModule {}