import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CalculatorComponent } from './calculator.component';
import {CanDeactivateGuard} from '../../routeGuard/can-deactivate-guard.service';
const routes: Routes = [
    {
        path: '',
        component: CalculatorComponent,
        canDeactivate : [CanDeactivateGuard]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CalculatorRoutingModule { }