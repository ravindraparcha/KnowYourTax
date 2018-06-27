import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { eTaxXMLComponent } from './eTaxXML.component';
import {CanDeactivateGuard} from '../../routeGuard/can-deactivate-guard.service';
const routes: Routes = [
    { path: '', component: eTaxXMLComponent,canDeactivate : [CanDeactivateGuard] }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class eTaxXMLRoutingModule { }