import { NgModule } from '@angular/core';
import {IndianCurrency} from './misc/indianCurrency';
import { CommonModule } from '@angular/common';
@NgModule({
    imports: [CommonModule],
    providers : [],
    declarations : [IndianCurrency],
    exports : [IndianCurrency]
})
 

export class sharedModule{}

 