import { Component, OnInit, ChangeDetectorRef, Input, Output, EventEmitter, ViewContainerRef, ViewChild } from "@angular/core";
import { INgxMyDpOptions, IMyDateModel } from 'ngx-mydatepicker';
import { ConfigurationService } from '../../../shared/services/ConfigurationService';
import { PersonalInfoModel } from '../../models/personal-info.model';
import { FormatDateService } from '../../services/formatDateService';
import { SharedTaxService } from '../../../shared/services/sharedTaxService';
import { ToastrService } from 'ngx-toastr';

import { NgForm } from "@angular/forms";
import { Subscription } from "rxjs";

@Component({
    selector: 'personal-info',
    templateUrl: './personal-info.component.html'
})
export class PersonalInfoComponent implements OnInit {

    @Input()
    set personalInfoData(personalInfoData: PersonalInfoModel) {
        this.initialisePersonalModelObject();
        this.personalInfo.panNo = personalInfoData.panNo;
        this.personalInfo.firstName = personalInfoData.firstName;
        this.personalInfo.middleName = personalInfoData.middleName;
        this.personalInfo.lastName = personalInfoData.lastName;
        this.personalInfo.flatDoorBlockNo = personalInfoData.flatDoorBlockNo;
        this.personalInfo.premisesBldgVillage = personalInfoData.premisesBldgVillage;
        this.personalInfo.roadStreetPostOffice = personalInfoData.roadStreetPostOffice;
        this.personalInfo.areaLocality = personalInfoData.areaLocality;
        this.personalInfo.townCityDistrict = personalInfoData.townCityDistrict;
        this.personalInfo.selectedState = personalInfoData.selectedState;
        this.personalInfo.zipCode = personalInfoData.zipCode;
    }

    public personalInfo: PersonalInfoModel;
    @Output() isPersonalInfoComponentValid: EventEmitter<boolean> = new EventEmitter<boolean>();
    //@ViewChild('personalInfoFrm') personalInfoForm;   
    @ViewChild('personalInfoFrm') form: NgForm;

    public isReceiptNumber: boolean = true;
    public isFilingDate: boolean = true;
    public isNoticeNumber: boolean = true;
    public isNoticeDate: boolean = true;
    public model: any;
    private _subscription : Subscription;
    private tenantPANNumberList: string[];
    myOptions: INgxMyDpOptions = {
        dateFormat: this._configuration.dateTimeFormat,
        sunHighlight:true,        
        disableUntil: { year: new Date().getFullYear(), month: 3, day: 31 },     
         
    };
    filedAgainstNoticeOptions: INgxMyDpOptions = {
        dateFormat: this._configuration.dateTimeFormat,
        sunHighlight:true,
        openSelectorTopOfInput: true,
        disableUntil: { year: new Date().getFullYear(), month: 3, day: 31 },        
    };

    constructor(private cd: ChangeDetectorRef,
        public _configuration: ConfigurationService, private _formatDateService: FormatDateService,
        private _sharedTaxService: SharedTaxService, private _toastr: ToastrService) {
            this._subscription = this._sharedTaxService.getTenantPANNumberList().subscribe(item => this.tenantPANNumberList = item);

    }

    // when old value does not match with new value during expression evaluation for child component
    // angular throws ExpressionChangedAfterItHasBeenCheckedError error. 
    // To resolve this issue, run detectChanges method in ngAfterViewInit() to update the values
    ngAfterViewInit() {
        this.cd.detectChanges();
    }

    ngOnInit() {
        this.initialisePersonalModelObject();
    }
    initialisePersonalModelObject() {
        this.personalInfo = new PersonalInfoModel();
        this.personalInfo.birthDate = "";
        //this.personalInfo.selectedState = "";
        // this.personalInfo.selectedEmployerCategory = "";
        //this.personalInfo.selectedReturnFiledSection = 0;
        //this.personalInfo.filingOriginalReturnDate = "";
        //this.personalInfo.selectedGovernedByPortugueseCivil = "";
        //this.personalInfo.selectedOriginalRevisedFile = "";
        this.personalInfo.filedAgainstNotice = "";
        this.personalInfo.premisesBldgVillage = "";
        this.personalInfo.country = "91";

    }
    onBirthDateChanged(event: IMyDateModel) {
        // console.log('onDateChanged(): ', event.date, ' - jsdate: ', new Date(event.jsdate).toLocaleDateString(), ' - formatted: ', event.formatted, ' - epoc timestamp: ', event.epoc);
        if (event.date.day != 0) {
            this.personalInfo.birthDate = event.date.day + "/" + event.date.month + "/" + event.date.year;
            this.personalInfo.birthDateXml = this._formatDateService.formatDate(event.date.day, event.date.month, event.date.year, "yyyy-mm-dd", "-");
        }
        else {
            this.personalInfo.birthDate = "";
            this.personalInfo.birthDateXml = "";
        }
    }
    onOriginalFilingReturnDateChanged(event: IMyDateModel) {
        if (event.date.day != 0) {
            this.personalInfo.filingOriginalReturnDate = event.date.day + "/" + event.date.month + "/" + event.date.year;
            this.personalInfo.filingOriginalReturnDateXml = this._formatDateService.formatDate(event.date.day, event.date.month, event.date.year, "yyyy-mm-dd", "-");
        }
        else {
            this.personalInfo.filingOriginalReturnDate = "";
            this.personalInfo.filingOriginalReturnDateXml = "";

        }
    }
    onfiledAgainstNoticeDateChanged(event: IMyDateModel) {
        if (event.date.day != 0) {
            this.personalInfo.filedAgainstNotice = event.date.day + "/" + event.date.month + "/" + event.date.year;
            this.personalInfo.filedAgainstNoticeXml = this._formatDateService.formatDate(event.date.day, event.date.month, event.date.year, "yyyy-mm-dd", "-");
        }
        else {
            this.personalInfo.filedAgainstNotice = "";
            this.personalInfo.filedAgainstNoticeXml = "";
        }
    }
    changeReturnFileSection() {
        this.onChangeReturnFileSectionReturnType();
        this._sharedTaxService.changeReturnFiledSection(this.personalInfo.selectedReturnFiledSection);

        this.isReceiptNumber = true;
        this.isFilingDate = true;
        this.isNoticeNumber = true;
        this.isNoticeDate = true;
        if (this.personalInfo.selectedReturnFiledSection == 11) {
            this.isReceiptNumber = false;
            this.isFilingDate = false;
            this.isNoticeNumber = false;
            this.isNoticeDate = false;
        }
        else if (this.personalInfo.selectedReturnFiledSection == 12) {
            this.isReceiptNumber = false;
            this.isFilingDate = false;
            this.isNoticeNumber = false;
            this.isNoticeDate = false;
        }
        else if (this.personalInfo.selectedReturnFiledSection == 13 || this.personalInfo.selectedReturnFiledSection == 14
            || this.personalInfo.selectedReturnFiledSection == 15 || this.personalInfo.selectedReturnFiledSection == 16) {
            this.isReceiptNumber = false;
            this.isFilingDate = false;
            this.isNoticeNumber = false;
            this.isNoticeDate = true;
        }
        else if (this.personalInfo.selectedReturnFiledSection == 17) {
            this.isReceiptNumber = true;
            this.isFilingDate = true;
            this.isNoticeNumber = false;
            this.isNoticeDate = false;
        }
        else if (this.personalInfo.selectedReturnFiledSection == 20) {
            this.isReceiptNumber = false;
            this.isFilingDate = false;
            this.isNoticeNumber = false;
            this.isNoticeDate = false;
        }

    }
    onChangeGovernedByPortuguesesCivil() {
        if (this.personalInfo.selectedGovernedByPortugueseCivil != 'Y')
            this.personalInfo.spousePanNo = "";
    }
    onChangeOrginalRevisedFile() {
        this.onChangeReturnFileSectionReturnType();
    }

    private onChangeReturnFileSectionReturnType() {
        if (this.personalInfo.selectedReturnFiledSection != 17 && this.personalInfo.selectedReturnFiledSection != 0 && this.personalInfo.selectedOriginalRevisedFile == "R") {
            this._toastr.warning("Return type cannot be revised if return not filed under section 139(5)", "Warning", this._configuration.CustomToastOptions);
            // {
            //     positionClass: 'toast-top-full-width', closeButton: true, timeOut: 5000, progressBar: true, progressAnimation: 'decreasing'
            // });
            this.personalInfo.selectedOriginalRevisedFile = "O";
            this.personalInfo.selectedReturnFiledSection = null;
        }
        if (this.personalInfo.selectedOriginalRevisedFile == "R") {
            this.personalInfo.noticeNumber = "";
            this.personalInfo.filedAgainstNotice = "";
            this.personalInfo.filedAgainstNoticeXml = "";
        }
    }

    public validatePersonalInfoComponentForm() {
        //this.personalInfoForm.valueChanges.subscribe(data =>console.log('Form changes', data));
        console.log(this.tenantPANNumberList);
        if (this.form.valid)
            this.isPersonalInfoComponentValid.emit(true);
        else
            this.isPersonalInfoComponentValid.emit(false);
    }

    public onChangeUserPanCardNumber() {
        this._sharedTaxService.changeUserPANNumber(this.personalInfo.panNo);
    }

    public onChangeSpousePanCardNumber(panNumber:string) {
        this._sharedTaxService.changeSpousePANNumber(this.personalInfo.spousePanNo);
    }

}