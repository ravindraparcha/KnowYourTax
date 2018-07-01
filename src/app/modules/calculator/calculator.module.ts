import { CalculatorComponent } from './calculator.component';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {CalculatorRoutingModule} from './calculator.routing';
import {sharedModule} from '../shared/sharedModule';
import { NgxMyDatePickerModule } from 'ngx-mydatepicker';
import { CommonModule } from '@angular/common';  
@NgModule({
    imports: [              
        CalculatorRoutingModule,
        sharedModule,
        FormsModule,
        NgxMyDatePickerModule.forRoot(),
        FormsModule,
        CommonModule
    ],
    declarations: [
        CalculatorComponent
    ]

})

export class CalculatorModule { }