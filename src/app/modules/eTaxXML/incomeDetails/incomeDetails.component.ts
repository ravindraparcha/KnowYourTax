import {Component, OnInit} from '@angular/core';
import {IncomeDetailsModel} from '../models/incomeDetails.model';

@Component({
    selector: 'income-details',
    templateUrl: './incomeDetails.component.html'
})

export class IncomeDetailsComponent  implements OnInit {

    public incomeDetailsModel : IncomeDetailsModel;
    ngOnInit(){
        this.incomeDetailsModel = new IncomeDetailsModel();
        
    }
}
