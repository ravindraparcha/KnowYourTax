import { Component, OnInit, ChangeDetectorRef } from "@angular/core";
import { INgxMyDpOptions, IMyDateModel } from 'ngx-mydatepicker';
import { Configuration } from '../../../../shared/constants';
import { PersonalInfoModel } from '../../models/personal-info.model';

@Component({
    selector: 'personal-info',
    templateUrl: './personal-info.component.html'

})
export class personalInfoComponent implements OnInit {
    public personalInfo: PersonalInfoModel;
    private file: File;
    myOptions: INgxMyDpOptions = {
        dateFormat: this._configuration.dateTimeFormat,
        disableSince: { year: new Date().getFullYear(), month: 4, day: 1 }
    };
    filedAgainstNoticeOptions: INgxMyDpOptions = {
        dateFormat: this._configuration.dateTimeFormat,
        openSelectorTopOfInput: true
    };

    constructor(private cd: ChangeDetectorRef, public _configuration: Configuration) { }

    // when old value does not match with new value during expression evaluation for child component
    // angular throws ExpressionChangedAfterItHasBeenCheckedError error. 
    // To resolve this issue, run detectChanges method in ngAfterViewInit() to update the values
    ngAfterViewInit() {
        this.cd.detectChanges();
    }

    ngOnInit() {
        this.personalInfo = new PersonalInfoModel();
        this.personalInfo.birthDate = "";
        this.personalInfo.selectedState = 0;
        this.personalInfo.selectedEmployerCategory = "0";
        this.personalInfo.selectedReturnFiledSection = 0;
        this.personalInfo.filingOriginalReturnDate = "";
        this.personalInfo.selectedGovernedByPortugueseCivil = "0";
        this.personalInfo.selectedOriginalRevisedFile = "0";
        this.personalInfo.filedAgainstNotice = "";
    }
    onBirthDateChanged(event: IMyDateModel) {
        // console.log('onDateChanged(): ', event.date, ' - jsdate: ', new Date(event.jsdate).toLocaleDateString(), ' - formatted: ', event.formatted, ' - epoc timestamp: ', event.epoc);
        if (event.date.day != 0)
            this.personalInfo.birthDate = event.date.day + "/" + event.date.month + "/" + event.date.year;
        else
            this.personalInfo.birthDate = "";
        //console.log(this.personalInfo.birthDate);
    }
    onOriginalFilingReturnDateChanged(event: IMyDateModel) {
        if (event.date.day != 0)
            this.personalInfo.filingOriginalReturnDate = event.date.day + "/" + event.date.month + "/" + event.date.year;
        else
            this.personalInfo.filingOriginalReturnDate = "";
    }
    onfiledAgainstNoticeDateChanged(event: IMyDateModel) {
        if (event.date.day != 0)
            this.personalInfo.filedAgainstNotice = event.date.day + "/" + event.date.month + "/" + event.date.year;
        else
            this.personalInfo.filedAgainstNotice = "";
    }


    onChange(event: EventTarget) {
        let eventObj: MSInputMethodContext = <MSInputMethodContext>event;
        let target: HTMLInputElement = <HTMLInputElement>eventObj.target;
        let files: FileList = target.files;
        this.file = files[0];
        console.log(this.file);

        var reader = new FileReader();
        reader.readAsText(this.file);
        console.log(reader.result);
        var me = this;
        reader.onload = function () {
            console.log(reader.result);
        }
    }

}