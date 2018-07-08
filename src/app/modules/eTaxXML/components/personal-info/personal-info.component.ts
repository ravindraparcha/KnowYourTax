import { Component, OnInit, ChangeDetectorRef, Input, Output, EventEmitter, ViewContainerRef, ViewChild, OnDestroy } from "@angular/core";
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
export class PersonalInfoComponent implements OnInit,OnDestroy {

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
    @ViewChild('personalInfoFrm') form: NgForm;

    public isReceiptNumber: boolean;
    public isFilingDate: boolean;
    public isNoticeNumber: boolean;
    public isNoticeDate: boolean;
    public model: any;
    private _subscription: Subscription;
    private tenantPANNumberList: string[];
    public myOptions: INgxMyDpOptions;
    public filedAgainstNoticeOptions: INgxMyDpOptions;
    public dobOptions : INgxMyDpOptions;

    constructor(private cd: ChangeDetectorRef,
        public _configuration: ConfigurationService, private _formatDateService: FormatDateService,
        private _sharedTaxService: SharedTaxService, private _toastr: ToastrService) {

        this.isReceiptNumber = true;
        this.isFilingDate = true;
        this.isNoticeNumber = true;
        this.isNoticeDate = true;

        this.myOptions = {
            dateFormat: this._configuration.dateTimeFormat,
            sunHighlight: true,
            disableUntil: { year: new Date().getFullYear(), month: 3, day: 31 },

        };
        this.filedAgainstNoticeOptions = {
            dateFormat: this._configuration.dateTimeFormat,
            sunHighlight: true,
            openSelectorTopOfInput: true,
            disableUntil: { year: new Date().getFullYear(), month: 3, day: 31 },
        };
        this.dobOptions = {
            dateFormat: this._configuration.dateTimeFormat,
            sunHighlight: true,
            disableSince :{ year: new Date().getFullYear(), month: 4, day: 1 },
        };

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
    ngOnDestroy() {
        this._subscription.unsubscribe();
    }

    private initialisePersonalModelObject() {
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
    public onBirthDateChanged(event: IMyDateModel) {
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
    public onOriginalFilingReturnDateChanged(event: IMyDateModel) {
        if (event.date.day != 0) {
            this.personalInfo.filingOriginalReturnDate = event.date.day + "/" + event.date.month + "/" + event.date.year;
            this.personalInfo.filingOriginalReturnDateXml = this._formatDateService.formatDate(event.date.day, event.date.month, event.date.year, "yyyy-mm-dd", "-");
        }
        else {
            this.personalInfo.filingOriginalReturnDate = "";
            this.personalInfo.filingOriginalReturnDateXml = "";

        }
    }
    public onfiledAgainstNoticeDateChanged(event: IMyDateModel) {
        if (event.date.day != 0) {
            this.personalInfo.filedAgainstNotice = event.date.day + "/" + event.date.month + "/" + event.date.year;
            this.personalInfo.filedAgainstNoticeXml = this._formatDateService.formatDate(event.date.day, event.date.month, event.date.year, "yyyy-mm-dd", "-");
        }
        else {
            this.personalInfo.filedAgainstNotice = "";
            this.personalInfo.filedAgainstNoticeXml = "";
        }
    }
    public changeReturnFileSection() {
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
    public onChangeGovernedByPortuguesesCivil() {
        if (this.personalInfo.selectedGovernedByPortugueseCivil != 'Y')
            this.personalInfo.spousePanNo = "";
    }
    public onChangeOrginalRevisedFile() {
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
        let errorFound: boolean = false;
        if (this.tenantPANNumberList != undefined) {
            this.tenantPANNumberList.forEach(pan => {
                if (this.personalInfo.panNo == pan || this.personalInfo.spousePanNo == pan) {
                    this._toastr.error('<b>Personal Information Tab-</b>Any tenant PAN number could not be same as yours or your spouse PAN number', 'Error', this._configuration.CustomToastOptions);
                    this.isPersonalInfoComponentValid.emit(undefined);
                    errorFound = true;
                    return false;
                }
            });
        }
        if (errorFound)
            return;
        if (this.form.valid)
            this.isPersonalInfoComponentValid.emit(true);
        else
            this.isPersonalInfoComponentValid.emit(false);
    }

    public onChangeUserPanCardNumber() {
        this._sharedTaxService.changeUserPANNumber(this.personalInfo.panNo);
    }

    public onChangeSpousePanCardNumber() {
        this._sharedTaxService.changeSpousePANNumber(this.personalInfo.spousePanNo);
    }

}