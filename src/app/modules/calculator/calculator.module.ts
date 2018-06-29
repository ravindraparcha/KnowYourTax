import { CalculatorComponent } from './calculator.component';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {CalculatorRoutingModule} from './calculator.routing';
import {sharedModule} from '../shared/sharedModule';
import { NgxMyDatePickerModule } from 'ngx-mydatepicker';

@NgModule({
    imports: [              
        CalculatorRoutingModule,
        sharedModule,
        FormsModule,
        NgxMyDatePickerModule.forRoot(),
        FormsModule
    ],
    declarations: [
        CalculatorComponent
    ]

})

export class CalculatorModule { }