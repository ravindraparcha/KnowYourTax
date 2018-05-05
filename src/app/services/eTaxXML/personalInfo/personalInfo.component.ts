import { Component, OnInit } from "@angular/core";
 
import { PersonalInfoModel } from './personalInfo.model';

@Component({
    selector: 'personal-info',
    templateUrl: './personalInfo.component.html'

})
export class personalInfoComponent implements OnInit {
    public personalInfo: PersonalInfoModel;

    ngOnInit() {
        
        this.personalInfo = new PersonalInfoModel();
    }
}