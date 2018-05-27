import { Injectable } from "@angular/core";
import { saveAs } from 'file-saver';
import { SharedXMLService } from '../shared/sharedXMLService';
declare var require: any;

@Injectable()
export class XmlGeneratorService {
    private xmlWriterRequire;
    private xmlWriter;
    private xmlDataArray = [];

    constructor(private _sharedXMLService: SharedXMLService) { }

    public generateXML(xmlDataArray) {
        this.addPredefinedXmlNodes();
        let panNo: string;
        //call user data node methods
        xmlDataArray.forEach(element => {
            if (element.infoType == "personalInfo") {
                this.addPersonalInfoNode(element.data);
                this.addFillingStatusNode(element.data);
                panNo=element.data.panNo;
            }
        });

        this.xmlWriter.endDocument();
        let xmlData = this.xmlWriter.toString().replace(/&quot;/g, '"');
        console.log(xmlData);

        var blob = new Blob([xmlData], { type: "text/xml" });
        saveAs(blob, panNo+".xml");
    }
    private addPredefinedXmlNodes() {
        this.xmlWriterRequire = require('xml-writer');
        this.xmlWriter = new this.xmlWriterRequire(true);

        this.xmlWriter.startDocument('1.0', 'ISO-8859-1');
        this.xmlWriter.startElement('ITRETURN:ITR');
        this.xmlWriter.writeAttribute('xmlns:ITRETURN', 'http://incometaxindiaefiling.gov.in/main" xmlns:ITR1FORM="http://incometaxindiaefiling.gov.in/ITR1" xmlns:ITRForm="http://incometaxindiaefiling.gov.in/master" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance');
        this.xmlWriter.startElement('ITR1FORM:ITR1');
        //calling pedefiend node methods
        this.addFormCreationInfo();
        this.addITR1();


    }
    private addFormCreationInfo() {        
        let date = new Date();
        let dateString = this._sharedXMLService.formatDateDDMMYYYY(date.getDate(), date.getMonth() + 1, date.getFullYear());
        this.xmlWriter.startElement("ITRForm:CreationInfo");
        this.xmlWriter.writeElement("ITRForm:SWVersionNo", "R1");
        this.xmlWriter.writeElement("ITRForm:SWCreatedBy", "KnowYourTax");
        this.xmlWriter.writeElement("ITRForm:XMLCreatedBy", "KnowYourTax");
        this.xmlWriter.writeElement("ITRForm:XMLCreationDate", dateString);
        this.xmlWriter.writeElement("ITRForm:IntermediaryCity", "Delhi");
        this.xmlWriter.endElement();
    }
    private addITR1() {
        this.xmlWriter.startElement("ITRForm:Form_ITR1");
        this.xmlWriter.writeElement("ITRForm:FormName", "ITR-1");
        this.xmlWriter.writeElement("ITRForm:Description", "For Indls having Income from Salary, Pension, family pension and Interest");
        this.xmlWriter.writeElement("ITRForm:AssessmentYear", new Date().getFullYear());
        this.xmlWriter.writeElement("ITRForm:SchemaVer", "Ver1.0");
        this.xmlWriter.writeElement("ITRForm:FormVer", "Ver1.0");
        this.xmlWriter.endElement();
    }

    private addPersonalInfoNode(personalInfo) {       
        this.xmlWriter.startElement("ITRForm:PersonalInfo");
        this.xmlWriter.startElement("ITRForm:AssesseeName");
        if (personalInfo.firstName !== undefined && personalInfo.firstName !== "")
            this.xmlWriter.writeElement("ITRForm:FirstName", personalInfo.firstName);
        if (personalInfo.middleName !== undefined && personalInfo.middleName !== "")
            this.xmlWriter.writeElement("ITRForm:MiddleName", personalInfo.middleName);
        if (personalInfo.lastName !== undefined && personalInfo.lastName !== "")
            this.xmlWriter.writeElement("ITRForm:SurNameOrOrgName", personalInfo.lastName);

        this.xmlWriter.endElement();

        if (personalInfo.panNo !== undefined && personalInfo.panNo !== "")
            this.xmlWriter.writeElement("ITRForm:PAN", personalInfo.panNo);
        this.xmlWriter.startElement("ITRForm:Address");
        if (personalInfo.flatDoorBlockNo !== undefined && personalInfo.flatDoorBlockNo !== '')
            this.xmlWriter.writeElement("ITRForm:ResidenceNo", personalInfo.flatDoorBlockNo);
        if (personalInfo.premisesBldgVillage !== undefined && personalInfo.premisesBldgVillage !== '')
            this.xmlWriter.writeElement("ITRForm:ResidenceName", personalInfo.premisesBldgVillage);
        if (personalInfo.roadStreetPostOffice !== undefined && personalInfo.roadStreetPostOffice !== '')
            this.xmlWriter.writeElement("ITRForm:RoadOrStreet", personalInfo.roadStreetPostOffice);
        if (personalInfo.areaLocality !== undefined && personalInfo.areaLocality !== '')
            this.xmlWriter.writeElement("ITRForm:LocalityOrArea", personalInfo.areaLocality);
        if (personalInfo.townCityDistrict !== undefined && personalInfo.townCityDistrict !== '')
            this.xmlWriter.writeElement("ITRForm:CityOrTownOrDistrict", personalInfo.townCityDistrict);
        if (personalInfo.selectedState !== undefined && personalInfo.selectedState !== '')
            this.xmlWriter.writeElement("ITRForm:StateCode", personalInfo.selectedState);
        if (personalInfo.country !== undefined && personalInfo.country !== '')
            this.xmlWriter.writeElement("ITRForm:CountryCode", personalInfo.country);
        if (personalInfo.zipCode !== undefined && personalInfo.zipCode !== '')
            this.xmlWriter.writeElement("ITRForm:PinCode", personalInfo.zipCode);
        if (personalInfo.mobileNo !== undefined && personalInfo.mobileNo !== '')
            this.xmlWriter.writeElement("ITRForm:MobileNo", personalInfo.mobileNo);
        if (personalInfo.email !== undefined && personalInfo.email !== '')
            this.xmlWriter.writeElement("ITRForm:EmailAddress", personalInfo.email);

        this.xmlWriter.endElement();

        if (personalInfo.birthDateXml !== undefined && personalInfo.birthDateXml !== '')
            this.xmlWriter.writeElement("ITRForm:DOB", personalInfo.birthDateXml);
        if (personalInfo.selectedEmployerCategory !== undefined && personalInfo.selectedEmployerCategory !== '0')
            this.xmlWriter.writeElement("ITRForm:EmployerCategory", personalInfo.selectedEmployerCategory);
        if (personalInfo.aadharCardNo !== undefined && personalInfo.aadharCardNo !== '0')
            this.xmlWriter.writeElement("ITRForm:AadhaarCardNo", personalInfo.aadharCardNo);
        if (personalInfo.aadharEnrollmentId !== undefined && personalInfo.aadharEnrollmentId !== '0')
            this.xmlWriter.writeElement("ITRForm:AadhaarCardNo", personalInfo.aadharEnrollmentId);

        this.xmlWriter.endElement();
    }

    private addFillingStatusNode(personalInfo) {

        this.xmlWriter.startElement("ITRForm:FilingStatus");

        if (personalInfo.selectedReturnFiledSection !== undefined && personalInfo.selectedReturnFiledSection !== 0)
            this.xmlWriter.writeElement("ITRForm:ReturnFileSec", personalInfo.selectedReturnFiledSection);
        if (personalInfo.receiptNumber !== undefined && personalInfo.receiptNumber !== "")
            this.xmlWriter.writeElement("ITRForm:AckNoOriginalReturn", personalInfo.receiptNumber);
        if (personalInfo.noticeNumber !== undefined && personalInfo.noticeNumber !== "")
            this.xmlWriter.writeElement("ITRForm:NoticeNo", personalInfo.noticeNumber);
        if (personalInfo.filingOriginalReturnDateXml !== undefined && personalInfo.filingOriginalReturnDateXml !== "")
            this.xmlWriter.writeElement("ITRForm:DefRetOrigRetFiledDate", personalInfo.filingOriginalReturnDateXml);
        if (personalInfo.selectedOriginalRevisedFile !== undefined && personalInfo.selectedOriginalRevisedFile !== "0")
            this.xmlWriter.writeElement("ITRForm:ReturnType", personalInfo.selectedOriginalRevisedFile);
        if (personalInfo.selectedGovernedByPortugueseCivil !== undefined && personalInfo.selectedGovernedByPortugueseCivil !== "0")
            this.xmlWriter.writeElement("ITRForm:PortugeseCC5A", personalInfo.selectedGovernedByPortugueseCivil);
        if (personalInfo.spousePanNo !== undefined && personalInfo.spousePanNo !== "")
            this.xmlWriter.writeElement("ITRForm:PANOfSpouse", personalInfo.spousePanNo);
        if (personalInfo.filedAgainstNoticeXml !== undefined && personalInfo.filedAgainstNoticeXml !== "")
            this.xmlWriter.writeElement("ITRForm:NoticeDateUnderSec", personalInfo.filedAgainstNoticeXml);

        this.xmlWriter.endElement();
    }


}
