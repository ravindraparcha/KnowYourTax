import { CalculatorComponent } from './calculator.component';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {CalculatorRoutingModule} from './calculator.routing';
import {sharedModule} from '../shared/sharedModule';
import { NgxMyDatePickerModule } from 'ngx-mydatepicker';
import { CommonModule } from '@angular/common';  
import { FormatDateService } from '../eTaxXML/services/formatDateService';
import {coreSharedModule} from '../../core-shared/core.shared.module';
@NgModule({
    imports: [              
        CalculatorRoutingModule,
        sharedModule,
        coreSharedModule,
        FormsModule,
        NgxMyDatePickerModule.forRoot(),
        FormsModule,
        CommonModule
    ],
    declarations: [
        CalculatorComponent
    ],
    providers : [FormatDateService]

})

export class CalculatorModule { }