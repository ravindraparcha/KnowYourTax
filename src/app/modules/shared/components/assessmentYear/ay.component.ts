
import { Component,OnInit } from '@angular/core';
import { ConfigurationService } from '../../../shared/services/configurationService';
import { ToastrService } from 'ngx-toastr';
@Component({
    selector: 'assessment-year',
    templateUrl: './ay.component.html'
})
export class AYComponent implements OnInit {
    public assessmentYearList;
    public selectedAssessmentYear;
    constructor(private _configurationService: ConfigurationService,private _toastr: ToastrService) {
        this.assessmentYearList = [];
        this.selectedAssessmentYear = '';
    }
    ngOnInit() {
        this._configurationService.masterSec.forEach(element => {
            this.assessmentYearList.push({ 'value': element.ayYear, 'text': element.ayYear });
        });
        this.selectedAssessmentYear =this.getCurrentAssessmentYear()
        this.changeAssessmentYearData( this.selectedAssessmentYear,true);
    }    
    public resetAssessmentYear(): void {
        this.selectedAssessmentYear = '';
    }

    private getCurrentAssessmentYear() : string {
        let currentDate = new Date();
        let currentYear = currentDate.getFullYear();
        let nextYear = new Date(currentDate.getFullYear() + 1, 1, 1).getFullYear();
        return (currentYear + '-' + nextYear);
    }

    public changeAssessmentYearData(selectedAYYear: string,isTriggered:boolean =false): void {
        let isDone:boolean = false;
        this._configurationService.selectedMasterSec = [];
        this._configurationService.selectedSlabs = [];
        if (selectedAYYear == null)
            return;

        this._configurationService.masterSec.forEach(element => {
            if (element.ayYear === selectedAYYear) {
                this._configurationService.selectedMasterSec.push(element);
                isDone = true;
                return false;
            }
        });
        this._configurationService.slabs.forEach(element => {
            if (element.ayYear === selectedAYYear) {
                this._configurationService.selectedSlabs.push(element);
                isDone=true;
                return false;
            }
        });
        if(isDone && !isTriggered)
            this._toastr.success('Assessment year changed successfully', 'Success', this._configurationService.CustomToastOptions);
        else if(!isDone){
            this._toastr.error('Oops! Some error has occurred', 'Error', this._configurationService.CustomToastOptions);
            this.selectedAssessmentYear = this.getCurrentAssessmentYear();
        }        
    }
}