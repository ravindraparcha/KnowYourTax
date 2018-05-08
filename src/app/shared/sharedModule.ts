import { NgModule } from '@angular/core';
import {IndianCurrency} from './pipe/indianCurrency';
import { CommonModule } from '@angular/common';
@NgModule({
    imports: [CommonModule],
    providers : [],
    declarations : [IndianCurrency],
    exports : [IndianCurrency]
})
 

export class sharedModule{}

 