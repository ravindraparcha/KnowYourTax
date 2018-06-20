import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { eTaxXMLComponent } from './eTaxXML.component';

const routes: Routes = [
    { path: '', component: eTaxXMLComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class eTaxXMLRoutingModule { }