
import { Component } from '@angular/core';
import { ConfigurationService } from '../../modules/shared/services/configurationService';

@Component({
    selector: 'assessment-year',
    templateUrl: './ay.component.html'
})
export class AYComponent implements OnInit {
    public assessmentYearList;
    public selectedAssessmentYear;
    constructor(private _configurationService: ConfigurationService) {
        this.assessmentYearList = [];
        this.selectedAssessmentYear = '';
    }
    ngOnInit() {
        this._configurationService.masterSec.forEach(element => {
            this.assessmentYearList.push({ 'value': element.ayYear, 'text': element.ayYear });
        });
        let currentDate = new Date();
        let currentYear = currentDate.getFullYear();
        let nextYear = new Date(currentDate.getFullYear() + 1, 1, 1).getFullYear();
        this.selectedAssessmentYear = currentYear + '-' + nextYear;
        this.changeAssessmentYearData(this.selectedAssessmentYear);
    }
    public resetAssessmentYear(): void {
        this.selectedAssessmentYear = '';
    }

    public changeAssessmentYearData(selectedAYYear: string): void {

        this._configurationService.selectedMasterSec = [];
        this._configurationService.selectedSlabs = [];
        if (selectedAYYear == null)
            return;

        this._configurationService.masterSec.forEach(element => {
            if (element.ayYear === selectedAYYear) {
                this._configurationService.selectedMasterSec.push(element);
                return false;
            }
        });
        this._configurationService.slabs.forEach(element => {
            if (element.ayYear === selectedAYYear) {
                this._configurationService.selectedSlabs.push(element);
                return false;
            }
        });
    }
}