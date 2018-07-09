import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {AYComponent} from './components/ay.component';

@NgModule({
    imports: [CommonModule,FormsModule,ReactiveFormsModule],    
    declarations : [AYComponent],
    exports : [AYComponent]
})
 

export class coreSharedModule{}

 