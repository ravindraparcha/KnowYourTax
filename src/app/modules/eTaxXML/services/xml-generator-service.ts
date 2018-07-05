import { Injectable } from "@angular/core";
import { saveAs } from 'file-saver';
import { FormatDateService } from '../services/formatDateService';


declare var require: any;

@Injectable()
export class XmlGeneratorService {
    private xmlWriterRequire;
    private xmlWriter;
    private agricultureIncome: number;

    constructor(private _formatDateService: FormatDateService) { }

    public generateXML(xmlDataArray) {
        this.addPredefinedXmlNodes();
        let panNo: string;
        //call user data node methods
        xmlDataArray.forEach(element => {
            if (element.infoType === "personalInfo") {
                this.addPersonalInfoNode(element.data);
                this.addFillingStatusNode(element.data);
                panNo = element.data.panNo;
            }
            else if (element.infoType === "incomeDetails")
                this.addIncomeDeductionNode(element.data);

            else if (element.infoType === "taxPaid") {
                this.addTaxPaid(element.data);
                this.addRefundNode(element.data);
            }
            else if (element.infoType === "80g")
                this.add80GNode(element.data);

            else if (element.infoType === "taxCollectedDeducted")
                this.addTaxDeductedCollected(element.data);

            else if (element.infoType === "verification")
                this.addVerificationNode(element.data);
        });

        this.xmlWriter.endDocument();
        let xmlData = this.xmlWriter.toString().replace(/&quot;/g, '"');
        console.log(xmlData);

        var blob = new Blob([xmlData], { type: "text/xml" });
        if (panNo == undefined || panNo == "") {
            let currentDate = new Date();
            panNo = currentDate.getFullYear().toString() + (currentDate.getMonth() + 1).toString() + currentDate.getDate().toString();
        }
        //saveAs(blob, 'ITR1_' + panNo + ".xml");
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
        let dateString = this._formatDateService.formatDate(date.getDate(), date.getMonth() + 1, date.getFullYear(), "yyyy-mm-dd", "-");
        this.xmlWriter.startElement("ITRForm:CreationInfo");
        this.xmlWriter.writeElement("ITRForm:SWVersionNo", "R1");
        this.xmlWriter.writeElement("ITRForm:SWCreatedBy", "KnowYourTax");
        this.xmlWriter.writeElement("ITRForm:XMLCreatedBy", "KnowYourTax");
        this.xmlWriter.writeElement("ITRForm:XMLCreationDate", dateString);
        this.xmlWriter.writeElement("ITRForm:IntermediaryCity", "DELHI");
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
            this.xmlWriter.writeElement("ITRForm:FirstName", personalInfo.firstName.toUpperCase());
        if (personalInfo.middleName !== undefined && personalInfo.middleName !== "")
            this.xmlWriter.writeElement("ITRForm:MiddleName", personalInfo.middleName.toUpperCase());
        if (personalInfo.lastName !== undefined && personalInfo.lastName !== "")
            this.xmlWriter.writeElement("ITRForm:SurNameOrOrgName", personalInfo.lastName.toUpperCase());

        this.xmlWriter.endElement();

        if (personalInfo.panNo !== undefined && personalInfo.panNo !== "")
            this.xmlWriter.writeElement("ITRForm:PAN", personalInfo.panNo.toUpperCase());
        this.xmlWriter.startElement("ITRForm:Address");
        if (personalInfo.flatDoorBlockNo !== undefined && personalInfo.flatDoorBlockNo !== '')
            this.xmlWriter.writeElement("ITRForm:ResidenceNo", personalInfo.flatDoorBlockNo.toUpperCase());
        if (personalInfo.premisesBldgVillage !== undefined && personalInfo.premisesBldgVillage !== '')
            this.xmlWriter.writeElement("ITRForm:ResidenceName", personalInfo.premisesBldgVillage.toUpperCase());
        if (personalInfo.roadStreetPostOffice !== undefined && personalInfo.roadStreetPostOffice !== '')
            this.xmlWriter.writeElement("ITRForm:RoadOrStreet", personalInfo.roadStreetPostOffice.toUpperCase());
        if (personalInfo.areaLocality !== undefined && personalInfo.areaLocality !== '')
            this.xmlWriter.writeElement("ITRForm:LocalityOrArea", personalInfo.areaLocality.toUpperCase());
        if (personalInfo.townCityDistrict !== undefined && personalInfo.townCityDistrict !== '')
            this.xmlWriter.writeElement("ITRForm:CityOrTownOrDistrict", personalInfo.townCityDistrict.toUpperCase());
        if (personalInfo.selectedState !== null && personalInfo.selectedState !== '')
            this.xmlWriter.writeElement("ITRForm:StateCode", personalInfo.selectedState.toUpperCase());
        if (personalInfo.country !== undefined && personalInfo.country !== '')
            this.xmlWriter.writeElement("ITRForm:CountryCode", personalInfo.country.toUpperCase());
        if (personalInfo.zipCode !== undefined && personalInfo.zipCode !== '')
            this.xmlWriter.writeElement("ITRForm:PinCode", personalInfo.zipCode);
        if (personalInfo.mobileNo !== undefined && personalInfo.mobileNo !== '')
            this.xmlWriter.writeElement("ITRForm:MobileNo", personalInfo.mobileNo);
        if (personalInfo.email !== undefined && personalInfo.email !== '')
            this.xmlWriter.writeElement("ITRForm:EmailAddress", personalInfo.email);

        this.xmlWriter.endElement();

        if (personalInfo.birthDateXml !== undefined && personalInfo.birthDateXml !== '')
            this.xmlWriter.writeElement("ITRForm:DOB", personalInfo.birthDateXml);
        if (personalInfo.selectedEmployerCategory !== null && personalInfo.selectedEmployerCategory !== '0')
            this.xmlWriter.writeElement("ITRForm:EmployerCategory", personalInfo.selectedEmployerCategory);
        if (personalInfo.aadharCardNo !== undefined && personalInfo.aadharCardNo !== '0')
            this.xmlWriter.writeElement("ITRForm:AadhaarCardNo", personalInfo.aadharCardNo);
        if (personalInfo.aadharEnrollmentId !== undefined && personalInfo.aadharEnrollmentId !== '0')
            this.xmlWriter.writeElement("ITRForm:AadhaarEnrolmentId", personalInfo.aadharEnrollmentId);

        this.xmlWriter.endElement();
    }

    private addFillingStatusNode(personalInfo) {

        this.xmlWriter.startElement("ITRForm:FilingStatus");

        if (personalInfo.selectedReturnFiledSection !== null && personalInfo.selectedReturnFiledSection !== 0)
            this.xmlWriter.writeElement("ITRForm:ReturnFileSec", personalInfo.selectedReturnFiledSection);
        if (personalInfo.receiptNumber !== undefined && personalInfo.receiptNumber !== "")
            this.xmlWriter.writeElement("ITRForm:AckNoOriginalReturn", personalInfo.receiptNumber);
        if (personalInfo.noticeNumber !== undefined && personalInfo.noticeNumber !== "")
            this.xmlWriter.writeElement("ITRForm:NoticeNo", personalInfo.noticeNumber);
        if (personalInfo.filingOriginalReturnDateXml !== undefined && personalInfo.filingOriginalReturnDateXml !== "")
            this.xmlWriter.writeElement("ITRForm:DefRetOrigRetFiledDate", personalInfo.filingOriginalReturnDateXml);
        if (personalInfo.selectedOriginalRevisedFile !== null && personalInfo.selectedOriginalRevisedFile !== "0")
            this.xmlWriter.writeElement("ITRForm:ReturnType", personalInfo.selectedOriginalRevisedFile);
        if (personalInfo.selectedGovernedByPortugueseCivil !== null && personalInfo.selectedGovernedByPortugueseCivil !== "0")
            this.xmlWriter.writeElement("ITRForm:PortugeseCC5A", personalInfo.selectedGovernedByPortugueseCivil);
        if (personalInfo.spousePanNo !== undefined && personalInfo.spousePanNo !== "")
            this.xmlWriter.writeElement("ITRForm:PANOfSpouse", personalInfo.spousePanNo);
        if (personalInfo.filedAgainstNoticeXml !== undefined && personalInfo.filedAgainstNoticeXml !== "")
            this.xmlWriter.writeElement("ITRForm:NoticeDateUnderSec", personalInfo.filedAgainstNoticeXml);

        this.xmlWriter.endElement();
    }

    private addIncomeDeductionNode(incomeDetail) {
         
        let incomeDetails = incomeDetail.incomeDetailsModel;
        this.xmlWriter.startElement("ITRForm:ITR1_IncomeDeductions");

        this.xmlWriter.writeElement("ITRForm:Salary", incomeDetails.salary == undefined ? 0 : incomeDetails.salary);
        this.xmlWriter.writeElement("ITRForm:AlwnsNotExempt", incomeDetails.allowance == undefined ? 0 : incomeDetails.allowance);
        this.xmlWriter.writeElement("ITRForm:PerquisitesValue", incomeDetails.perquisites == undefined ? 0 : incomeDetails.perquisites);
        this.xmlWriter.writeElement("ITRForm:ProfitsInSalary", incomeDetails.profitLieuOfSalary == undefined ? 0 : incomeDetails.profitLieuOfSalary);

        this.xmlWriter.writeElement("ITRForm:DeductionUs16", incomeDetails.deductionUS16 == undefined ? 0 : incomeDetails.deductionUS16);

        this.xmlWriter.writeElement("ITRForm:IncomeFromSal", incomeDetails.salaryPensionSum == undefined ? 0 : incomeDetails.salaryPensionSum);
        if (incomeDetails.selectedHousePropertyType !== null && incomeDetails.selectedHousePropertyType !== "0")
            this.xmlWriter.writeElement("ITRForm:TypeOfHP", incomeDetails.selectedHousePropertyType.toUpperCase());

        this.xmlWriter.writeElement("ITRForm:GrossRentReceived", incomeDetails.rent == undefined ? 0 : incomeDetails.rent);

        this.xmlWriter.writeElement("ITRForm:TaxPaidlocalAuth", incomeDetails.taxPaidToLocalAuthority == undefined ? 0 : incomeDetails.taxPaidToLocalAuthority);

        this.xmlWriter.writeElement("ITRForm:AnnualValue", incomeDetails.annualValue == undefined ? 0 : incomeDetails.annualValue);

        this.xmlWriter.writeElement("ITRForm:StandardDeduction", incomeDetails.annualValuePercentageAmount == undefined ? 0 : incomeDetails.annualValuePercentageAmount);

        this.xmlWriter.writeElement("ITRForm:InterestPayable", incomeDetails.interestOnBorrowedCapital == undefined ? 0 : incomeDetails.interestOnBorrowedCapital);

        this.xmlWriter.writeElement("ITRForm:TotalIncomeOfHP", incomeDetails.housePropertySum == undefined ? 0 : incomeDetails.housePropertySum);

        this.xmlWriter.writeElement("ITRForm:IncomeOthSrc", incomeDetails.incomeFromOtherSources == undefined ? 0 : incomeDetails.incomeFromOtherSources);

        this.xmlWriter.writeElement("ITRForm:GrossTotIncome", incomeDetails.grossTotalIncome == undefined ? 0 : incomeDetails.grossTotalIncome);

        // if (incomeDetails.salary !== undefined && incomeDetails.salary !== null)
        //     this.xmlWriter.writeElement("ITRForm:Salary", incomeDetails.salary);
        // if (incomeDetails.allowance !== undefined && incomeDetails.allowance !== null)
        //     this.xmlWriter.writeElement("ITRForm:AlwnsNotExempt", incomeDetails.allowance);
        // if (incomeDetails.perquisites !== undefined && incomeDetails.perquisites !== null)
        //     this.xmlWriter.writeElement("ITRForm:PerquisitesValue", incomeDetails.perquisites);
        // if (incomeDetails.profitLieuOfSalary !== undefined && incomeDetails.profitLieuOfSalary !== null)
        //     this.xmlWriter.writeElement("ITRForm:ProfitsInSalary", incomeDetails.profitLieuOfSalary);
        // if (incomeDetails.deductionUS16 !== undefined && incomeDetails.deductionUS16 !== null)
        //     this.xmlWriter.writeElement("ITRForm:DeductionUs16", incomeDetails.deductionUS16);
        // if (incomeDetails.salaryPensionSum !== undefined && incomeDetails.salaryPensionSum !== null)
        //     this.xmlWriter.writeElement("ITRForm:IncomeFromSal", incomeDetails.salaryPensionSum);
        // if (incomeDetails.selectedHousePropertyType !== null && incomeDetails.selectedHousePropertyType !== "0")
        //     this.xmlWriter.writeElement("ITRForm:TypeOfHP", incomeDetails.selectedHousePropertyType.toUpperCase());
        // if (incomeDetails.rent !== undefined && incomeDetails.rent !== null)
        //     this.xmlWriter.writeElement("ITRForm:GrossRentReceived", incomeDetails.rent);
        // if (incomeDetails.taxPaidToLocalAuthority !== undefined && incomeDetails.taxPaidToLocalAuthority !== null)
        //     this.xmlWriter.writeElement("ITRForm:TaxPaidlocalAuth", incomeDetails.taxPaidToLocalAuthority);            
        // if (incomeDetails.annualValue !== undefined && incomeDetails.annualValue !== null)
        //     this.xmlWriter.writeElement("ITRForm:AnnualValue", incomeDetails.annualValue);
        // if (incomeDetails.annualValuePercentageAmount !== undefined && incomeDetails.annualValuePercentageAmount !== null)
        //     this.xmlWriter.writeElement("ITRForm:StandardDeduction", incomeDetails.annualValuePercentageAmount);
        // if (incomeDetails.interestOnBorrowedCapital !== undefined && incomeDetails.interestOnBorrowedCapital !== null)
        //     this.xmlWriter.writeElement("ITRForm:InterestPayable", incomeDetails.interestOnBorrowedCapital);
        // if (incomeDetails.housePropertySum !== undefined && incomeDetails.housePropertySum !== null)
        //     this.xmlWriter.writeElement("ITRForm:TotalIncomeOfHP", incomeDetails.housePropertySum);
        // if (incomeDetails.incomeFromOtherSources !== undefined && incomeDetails.incomeFromOtherSources !== null)
        //     this.xmlWriter.writeElement("ITRForm:IncomeOthSrc", incomeDetails.incomeFromOtherSources);
        // if (incomeDetails.grossTotalIncome !== undefined && incomeDetails.grossTotalIncome !== null)
        //     this.xmlWriter.writeElement("ITRForm:GrossTotIncome", incomeDetails.grossTotalIncome);

        this.xmlWriter.endElement();
        let incomeTaxModel = incomeDetail.incomeTaxModel;
        this.addUserDeductionNode(incomeTaxModel.userTaxModel);
        this.addSysCalculatedDeductionNode(incomeTaxModel.systemTaxModel,incomeTaxModel.taxComputationModel.totalTaxFeeInterest);
        this.addTaxComputationNode(incomeTaxModel.taxComputationModel);
    }

    private addUserDeductionNode(userDeductions) {
        this.xmlWriter.startElement("ITRForm:UsrDeductUndChapVIA");
        this.addDeductionNode(userDeductions, true);
        this.xmlWriter.endElement();
    }

    private addSysCalculatedDeductionNode(sysDeductions,totalIncome : number) {
        this.xmlWriter.startElement("ITRForm:DeductUndChapVIA");
        this.addDeductionNode(sysDeductions, false);        
        this.xmlWriter.endElement();
        this.xmlWriter.writeElement('ITRForm:TotalIncome',totalIncome);
    }

    private addDeductionNode(deductions, isUsrNode: boolean) {
        let total: number = 0;
        deductions.forEach(element => {
            total += parseInt(element.amount);
            if (element.name == "80C")
                this.xmlWriter.writeElement("ITRForm:Section80C", parseInt(element.amount));
            else if (element.name == "80CCC")
                this.xmlWriter.writeElement("ITRForm:Section80CCC", parseInt(element.amount));
            else if (element.name == "80CCD1")
                this.xmlWriter.writeElement("ITRForm:Section80CCDEmployeeOrSE", parseInt(element.amount));
            else if (element.name == "80CCD1B")
                this.xmlWriter.writeElement("ITRForm:Section80CCD1B", parseInt(element.amount));
            else if (element.name == "80CCD2")
                this.xmlWriter.writeElement("ITRForm:Section80CCDEmployer", parseInt(element.amount));
            else if (element.name == "80D") {
                if (isUsrNode)
                    this.xmlWriter.writeElement("ITRForm:Section80DUsrType", element.option);
                this.xmlWriter.writeElement("ITRForm:Section80D", parseInt(element.amount));
            }

            else if (element.name == "80DD") {
                if (isUsrNode)
                    this.xmlWriter.writeElement("ITRForm:Section80DDUsrType", element.option);
                this.xmlWriter.writeElement("ITRForm:Section80DD", parseInt(element.amount));
            }
            else if (element.name == "80DDB") {
                if (isUsrNode)
                    this.xmlWriter.writeElement("ITRForm:Section80DDBUsrType", element.option);
                this.xmlWriter.writeElement("ITRForm:Section80DDB", parseInt(element.amount));
            }
            else if (element.name == "80E")
                this.xmlWriter.writeElement("ITRForm:Section80E", parseInt(element.amount));
            else if (element.name == "80EE")
                this.xmlWriter.writeElement("ITRForm:Section80EE", parseInt(element.amount));
            else if (element.name == "80G")
                this.xmlWriter.writeElement("ITRForm:Section80G", parseInt(element.amount));

            else if (element.name == "80GG")
                this.xmlWriter.writeElement("ITRForm:Section80GG", parseInt(element.amount));
            else if (element.name == "80GGA")
                this.xmlWriter.writeElement("ITRForm:Section80GGA", parseInt(element.amount));
            else if (element.name == "80GGC")
                this.xmlWriter.writeElement("ITRForm:Section80GGC", parseInt(element.amount));


            else if (element.name == "80U") {
                if (isUsrNode)
                    this.xmlWriter.writeElement("ITRForm:Section80UUsrType", element.option);
                this.xmlWriter.writeElement("ITRForm:Section80U", parseInt(element.amount));
            }

            else if (element.name == "80RRB")
                this.xmlWriter.writeElement("ITRForm:Section80RRB", parseInt(element.amount));

            else if (element.name == "80QQB")
                this.xmlWriter.writeElement("ITRForm:Section80QQB", parseInt(element.amount));

            else if (element.name == "80CCG")
                this.xmlWriter.writeElement("ITRForm:Section80CCG", parseInt(element.amount));
            else if (element.name == "80TTA")
                this.xmlWriter.writeElement("ITRForm:Section80TTA", parseInt(element.amount));
        });
        this.xmlWriter.writeElement("ITRForm:TotalChapVIADeductions", total);
    }

    private addTaxComputationNode(incomeDetails) {
        this.xmlWriter.startElement("ITRForm:ITR1_TaxComputation");

        if (incomeDetails.taxPayableOnTotalIncome !== undefined && incomeDetails.taxPayableOnTotalIncome !== null)
            this.xmlWriter.writeElement("ITRForm:TotalTaxPayable", incomeDetails.taxPayableOnTotalIncome);
        if (incomeDetails.rebateAmt !== undefined && incomeDetails.rebateAmt !== null)
            this.xmlWriter.writeElement("ITRForm:Rebate87A", incomeDetails.rebateAmt);
        if (incomeDetails.taxPayableAfterRebate !== undefined && incomeDetails.taxPayableAfterRebate !== null)
            this.xmlWriter.writeElement("ITRForm:TaxPayableOnRebate", incomeDetails.taxPayableAfterRebate);
        if (incomeDetails.cessTax !== undefined && incomeDetails.cessTax !== null)
            this.xmlWriter.writeElement("ITRForm:EducationCess", incomeDetails.cessTax);
        if (incomeDetails.totalTaxAndCess !== undefined && incomeDetails.totalTaxAndCess !== null)
            this.xmlWriter.writeElement("ITRForm:GrossTaxLiability", incomeDetails.totalTaxAndCess);
        if (incomeDetails.reliefUnder89 !== undefined && incomeDetails.reliefUnder89 !== null)
            this.xmlWriter.writeElement("ITRForm:Section89", incomeDetails.reliefUnder89);
        if (incomeDetails.balanceTaxAfterRelief !== undefined && incomeDetails.balanceTaxAfterRelief !== null)
            this.xmlWriter.writeElement("ITRForm:NetTaxLiability", incomeDetails.balanceTaxAfterRelief);
        if (incomeDetails.totalInterestPayable !== undefined && incomeDetails.totalInterestPayable !== null)
            this.xmlWriter.writeElement("ITRForm:TotalIntrstPay", incomeDetails.totalInterestPayable);

        this.xmlWriter.endElement();
        this.xmlWriter.startElement("ITRForm:IntrstPay");

        if (incomeDetails.interest234A !== undefined && incomeDetails.interest234A !== null)
            this.xmlWriter.writeElement("ITRForm:IntrstPayUs234A", incomeDetails.interest234A);
        if (incomeDetails.interest234B !== undefined && incomeDetails.interest234B !== null)
            this.xmlWriter.writeElement("ITRForm:IntrstPayUs234B", incomeDetails.interest234B);
        if (incomeDetails.interest234C !== undefined && incomeDetails.interest234C !== null)
            this.xmlWriter.writeElement("ITRForm:IntrstPayUs234C", incomeDetails.interest234C);
        if (incomeDetails.feeUnder234F !== undefined && incomeDetails.feeUnder234F !== null)
            this.xmlWriter.writeElement("ITRForm:LateFilingFee234F", incomeDetails.feeUnder234F);
        if (incomeDetails.totalTaxFeeInterest !== undefined && incomeDetails.totalTaxFeeInterest !== null)
            this.xmlWriter.writeElement("ITRForm:TotTaxPlusIntrstPay", incomeDetails.totalTaxFeeInterest);

        this.xmlWriter.endElement();
    }

    private addTaxPaid(taxPaid) {
        this.agricultureIncome = taxPaid.agricultureIncome;
        this.xmlWriter.startElement("ITRForm:TaxPaid");
        this.xmlWriter.startElement("ITRForm:TaxesPaid");

        if (taxPaid.totalAdvanceTaxPaid !== undefined && taxPaid.totalAdvanceTaxPaid !== null)
            this.xmlWriter.writeElement("ITRForm:AdvanceTax", taxPaid.totalAdvanceTaxPaid);
        if (taxPaid.totalTDSClaimed !== undefined && taxPaid.totalTDSClaimed !== null)
            this.xmlWriter.writeElement("ITRForm:TDS", taxPaid.totalTDSClaimed);
        if (taxPaid.totalTCSClaimed !== undefined && taxPaid.totalTCSClaimed !== null)
            this.xmlWriter.writeElement("ITRForm:TCS", taxPaid.totalTCSClaimed);
        if (taxPaid.totalSelfAssessmentTaxPaid !== undefined && taxPaid.totalSelfAssessmentTaxPaid !== null)
            this.xmlWriter.writeElement("ITRForm:SelfAssessmentTax", taxPaid.totalSelfAssessmentTaxPaid);
        if (taxPaid.totalTaxesPaid !== undefined && taxPaid.totalTaxesPaid !== null)
            this.xmlWriter.writeElement("ITRForm:TotalTaxesPaid", taxPaid.totalTaxesPaid);
        if (taxPaid.exemptedLongTermCapitalGain !== undefined && taxPaid.exemptedLongTermCapitalGain !== null)
            this.xmlWriter.writeElement("ITRForm:ExcIncSec1038", taxPaid.exemptedLongTermCapitalGain);
        if (taxPaid.exemptedDividendIncome !== undefined && taxPaid.exemptedDividendIncome !== null)
            this.xmlWriter.writeElement("ITRForm:ExcIncSec1034", taxPaid.exemptedDividendIncome);

        if (taxPaid.otherExemptionModels.length > 0)
            this.xmlWriter.startElement("ITRForm:OthersInc");

        let amountSum = 0;
        for (let otherExemptModel of taxPaid.otherExemptionModels) {
            //if (otherExemptModel.selectedIncomeNature != "") {
            this.xmlWriter.startElement("ITRForm:OthersIncDtls");
            this.xmlWriter.writeElement("ITRForm:NatureDesc", otherExemptModel.selectedIncomeNature);
            this.xmlWriter.writeElement("ITRForm:OthNatOfInc", otherExemptModel.descriptionIfAnyOtherSelected);
            this.xmlWriter.writeElement("ITRForm:OthAmount", otherExemptModel.amount);
            this.xmlWriter.endElement();
            amountSum += parseInt(otherExemptModel.amount);
            //}
        }
        if (taxPaid.otherExemptionModels.length > 0) {
            this.xmlWriter.writeElement("ITRForm:OthersIncTotal", amountSum);
            this.xmlWriter.endElement();
        }
        this.xmlWriter.endElement();
        this.xmlWriter.writeElement("ITRForm:BalTaxPayable", taxPaid.amountPayable == undefined ? 0 : taxPaid.amountPayable);
        this.xmlWriter.endElement();
    }

    private addRefundNode(taxPaid) {
        this.xmlWriter.startElement("ITRForm:Refund");
        if (taxPaid.refund !== undefined && taxPaid.refund !== null)
            this.xmlWriter.writeElement("ITRForm:RefundDue", taxPaid.refund);

        this.xmlWriter.startElement("ITRForm:BankAccountDtls");
        this.xmlWriter.startElement("ITRForm:PriBankDetails");
        if (taxPaid.accountDetail.ifscCode !== undefined && taxPaid.accountDetail.ifscCode !== null)
            this.xmlWriter.writeElement("ITRForm:IFSCCode", taxPaid.accountDetail.ifscCode);
        if (taxPaid.accountDetail.bankName !== undefined && taxPaid.accountDetail.bankName !== null)
            this.xmlWriter.writeElement("ITRForm:BankName", taxPaid.accountDetail.bankName);
        if (taxPaid.accountDetail.accountNo !== undefined && taxPaid.accountDetail.accountNo !== null)
            this.xmlWriter.writeElement("ITRForm:BankAccountNo", taxPaid.accountDetail.accountNo);
        this.xmlWriter.endElement();

        if (taxPaid.otherAccountDetails.length > 0) {
            for (let otherAccountDetails of taxPaid.otherAccountDetails) {
                this.xmlWriter.startElement("ITRForm:AddtnlBankDetails");
                if (otherAccountDetails.ifscCode !== undefined && otherAccountDetails.ifscCode !== null)
                    this.xmlWriter.writeElement("ITRForm:IFSCCode", otherAccountDetails.ifscCode);
                if (otherAccountDetails.bankName !== undefined && otherAccountDetails.bankName !== null)
                    this.xmlWriter.writeElement("ITRForm:BankName", otherAccountDetails.bankName);
                if (otherAccountDetails.accountNo !== undefined && otherAccountDetails.accountNo !== null)
                    this.xmlWriter.writeElement("ITRForm:BankAccountNo", otherAccountDetails.accountNo);
                this.xmlWriter.endElement();
            }
        }
        this.xmlWriter.endElement();
        this.xmlWriter.endElement();
    }

    private addTaxDeductedCollected(taxDeductedCollected) {

        //Tax deducted on salary
        if (taxDeductedCollected.taxDeductedSalaryModels.length > 0) {
            let deductedSum = 0;
            this.xmlWriter.startElement("ITRForm:TDSonSalaries");
            for (let deducted of taxDeductedCollected.taxDeductedSalaryModels) {
                this.xmlWriter.startElement("ITRForm:TDSonSalary");

                this.xmlWriter.startElement("ITRForm:EmployerOrDeductorOrCollectDetl");
                this.xmlWriter.writeElement("ITRForm:TAN", deducted.TAN.toUpperCase());
                this.xmlWriter.writeElement("ITRForm:EmployerOrDeductorOrCollecterName", deducted.name.toUpperCase());
                this.xmlWriter.endElement();

                this.xmlWriter.writeElement("ITRForm:IncChrgSal", deducted.incomeChargeableForDeduction);
                this.xmlWriter.writeElement("ITRForm:TotalTDSSal", deducted.taxDeducted);

                this.xmlWriter.endElement();
                deductedSum += parseInt(deducted.taxDeducted);
            }
            this.xmlWriter.writeElement("ITRForm:TotalTDSonSalaries", deductedSum);
            this.xmlWriter.endElement();
        }

        //Tax deducted on other salary
        if (taxDeductedCollected.taxDeductedOtherThanSalaryModels.length > 0) {
            let deductedSum = 0;
            this.xmlWriter.startElement("ITRForm:TDSonOthThanSals");
            for (let deducted of taxDeductedCollected.taxDeductedOtherThanSalaryModels) {
                this.xmlWriter.startElement("ITRForm:TDSonOthThanSal");

                this.xmlWriter.startElement("ITRForm:EmployerOrDeductorOrCollectDetl");
                this.xmlWriter.writeElement("ITRForm:TAN", deducted.TAN.toUpperCase());
                this.xmlWriter.writeElement("ITRForm:EmployerOrDeductorOrCollecterName", deducted.name.toUpperCase());
                this.xmlWriter.endElement();

                this.xmlWriter.writeElement("ITRForm:AmtForTaxDeduct", deducted.amountForTaxDeduction);
                this.xmlWriter.writeElement("ITRForm:DeductedYr", deducted.selectedOtherThanSalaryYear);
                this.xmlWriter.writeElement("ITRForm:TotTDSOnAmtPaid", deducted.taxDeducted);
                this.xmlWriter.writeElement("ITRForm:ClaimOutOfTotTDSOnAmtPaid", deducted.amountClaimedThisYear);

                this.xmlWriter.endElement();
                deductedSum += parseInt(deducted.taxDeducted);
            }
            this.xmlWriter.writeElement("ITRForm:TotalTDSonOthThanSals", deductedSum);
            this.xmlWriter.endElement();
        }

        //Tax deducted at source 26QC
        if (taxDeductedCollected.taxDeductedUnder26QCModels.length > 0) {
            let deductedSum = 0;
            this.xmlWriter.startElement("ITRForm:TDSDtls26QC");
            for (let deducted of taxDeductedCollected.taxDeductedUnder26QCModels) {
                this.xmlWriter.startElement("ITRForm:TDSDetails26QC");

                this.xmlWriter.writeElement("ITRForm:PANofTenant", deducted.PAN.toUpperCase());
                this.xmlWriter.writeElement("ITRForm:NameOfTenant", deducted.name.toUpperCase());
                this.xmlWriter.writeElement("ITRForm:AmtForTaxDeduct", deducted.amountForTaxDeduction);

                this.xmlWriter.writeElement("ITRForm:DeductedYr", deducted.selectedTenantDeductionYear);
                this.xmlWriter.writeElement("ITRForm:TaxDeducted", deducted.taxDeducted);
                this.xmlWriter.writeElement("ITRForm:ClaimOutOfTotTDSOnAmtPaid", deducted.amountClaimedThisYear);

                this.xmlWriter.endElement();
                deductedSum += parseInt(deducted.taxDeducted);
            }
            this.xmlWriter.writeElement("ITRForm:TotalTDSDetails26QC", deductedSum);
            this.xmlWriter.endElement();
        }

        //tax collected
        if (taxDeductedCollected.taxCollectedModels.length > 0) {
            let collectedSum = 0;
            this.xmlWriter.startElement("ITRForm:ScheduleTCS");

            for (let collected of taxDeductedCollected.taxCollectedModels) {
                this.xmlWriter.startElement("ITRForm:TCS");

                this.xmlWriter.startElement("ITRForm:EmployerOrDeductorOrCollectDetl");
                this.xmlWriter.writeElement("ITRForm:TAN", collected.taxCollectionAccountNo.toUpperCase());
                this.xmlWriter.writeElement("ITRForm:EmployerOrDeductorOrCollecterName", collected.name.toUpperCase());
                this.xmlWriter.endElement();

                this.xmlWriter.writeElement("ITRForm:AmtTaxCollected", collected.amountForTaxDeduction);
                this.xmlWriter.writeElement("ITRForm:CollectedYr", collected.selectedTaxCollectionYear);
                this.xmlWriter.writeElement("ITRForm:TotalTCS", collected.taxCollected);
                this.xmlWriter.writeElement("ITRForm:AmtTCSClaimedThisYear", collected.amountClaimedThisYear);

                this.xmlWriter.endElement();
                collectedSum += parseInt(collected.taxDeducted);
            }
            this.xmlWriter.writeElement("ITRForm:TotalSchTCS", collectedSum);
            this.xmlWriter.endElement();
        }

        //advance tax 
        if (taxDeductedCollected.advanceTaxSelfAssessmentTaxModels.length > 0) {
            let advanceTaxSum = 0;
            this.xmlWriter.startElement("ITRForm:TaxPayments");

            for (let advanceTax of taxDeductedCollected.advanceTaxSelfAssessmentTaxModels) {
                this.xmlWriter.startElement("ITRForm:TaxPayment");

                this.xmlWriter.writeElement("ITRForm:BSRCode", advanceTax.BSRCode.toUpperCase());
                this.xmlWriter.writeElement("ITRForm:DateDep", advanceTax.depositDateXml);
                this.xmlWriter.writeElement("ITRForm:SrlNoOfChaln", advanceTax.challanSerialNumber.toString().toUpperCase());
                this.xmlWriter.writeElement("ITRForm:Amt", advanceTax.taxPaid);

                this.xmlWriter.endElement();
                advanceTaxSum += parseInt(advanceTax.taxPaid);
            }
            this.xmlWriter.writeElement("ITRForm:TotalTaxPayments", advanceTaxSum);
            this.xmlWriter.endElement();
        }
        //not sure how will it get set
        this.xmlWriter.writeElement("ITR1FORM:TaxExmpIntInc", this.agricultureIncome);
    }

    private addVerificationNode(verification) {
        this.xmlWriter.startElement("ITRForm:Verification");
        this.xmlWriter.startElement("ITRForm:Declaration");
        if (verification.fullName !== undefined && verification.fullName !== "")
            this.xmlWriter.writeElement("ITRForm:AssesseeVerName", verification.fullName.toUpperCase());
        if (verification.sonDaughterOf !== undefined && verification.sonDaughterOf !== "")
            this.xmlWriter.writeElement("ITRForm:FatherName", verification.sonDaughterOf.toUpperCase());
        if (verification.PAN !== undefined && verification.PAN !== "")
            this.xmlWriter.writeElement("ITRForm:AssesseeVerPAN", verification.PAN);

        this.xmlWriter.endElement();

        if (verification.capacity !== undefined && verification.capacity !== "")
            this.xmlWriter.writeElement("ITRForm:Capacity", verification.capacity);
        if (verification.place !== undefined && verification.place !== "")
            this.xmlWriter.writeElement("ITRForm:Place", verification.place.toUpperCase());
        if (verification.verificationDateXml !== undefined && verification.verificationDateXml !== "")
            this.xmlWriter.writeElement("ITRForm:Date", verification.verificationDateXml);

        this.xmlWriter.endElement();

        //tax return preparer
        this.xmlWriter.startElement("ITRForm:TaxReturnPreparer");
        if (verification.TRPIdentificationNo !== undefined && verification.TRPIdentificationNo !== "")
            this.xmlWriter.writeElement("ITRForm:IdentificationNoOfTRP", verification.TRPIdentificationNo);
        if (verification.TRPName !== undefined && verification.TRPName !== "")
            this.xmlWriter.writeElement("ITRForm:NameOfTRP", verification.TRPName.toUpperCase());
        if (verification.TRPReimbursementAmount !== undefined && verification.TRPReimbursementAmount !== "")
            this.xmlWriter.writeElement("ITRForm:ReImbFrmGov", verification.TRPReimbursementAmount);

        this.xmlWriter.endElement();
    }

    private donationAmt: number = 0;
    private eligibleAmt: number = 0;
    private add80GNode(section80g) {

        if (section80g.donation100DeductionWithoutQualifyingLimit.length == 0 &&
            section80g.donation50DeductionWithoutQualifyingLimit.length == 0 &&
            section80g.donation100DeductionWithQualifyingLimit.length == 0 &&
            section80g.donation50DeductionWithQualifyingLimit.length == 0
        ) { return; }
        this.donationAmt = 0;
        this.eligibleAmt = 0;
        if (section80g.donation100DeductionWithoutQualifyingLimit.length > 0 ||
            section80g.donation50DeductionWithoutQualifyingLimit.length > 0 ||
            section80g.donation100DeductionWithQualifyingLimit.length > 0 ||
            section80g.donation50DeductionWithQualifyingLimit.length > 0
        ) {
            this.xmlWriter.startElement("ITRForm:Schedule80G");
            this.add80gDonee100PercentWithoutQualifyingLimit(section80g);
            this.add80gDonee50PercentWithoutQualifyingLimit(section80g);
            this.add80gDonee100PercentWithQualifyingLimit(section80g);
            this.add80gDonee50PercentWithQualifyingLimit(section80g);

            this.xmlWriter.writeElement("ITRForm:TotalDonationsUs80G", this.donationAmt);
            this.xmlWriter.writeElement("ITRForm:TotalEligibleDonationsUs80G", this.eligibleAmt);
            this.xmlWriter.endElement();
        }

    }
    private add80gDonee100PercentWithoutQualifyingLimit(section80g) {
        if (section80g.donation100DeductionWithoutQualifyingLimit.length == 0)
            return;
        this.xmlWriter.startElement("ITRForm:Don100Percent");
        let donationAmount = this.addDoneeNodes(section80g.donation100DeductionWithoutQualifyingLimit);
        this.xmlWriter.writeElement("ITRForm:TotDon100Percent", donationAmount.donationAmount);
        this.xmlWriter.writeElement("ITRForm:TotEligibleDon100Percent", donationAmount.eligibleAmount);
        this.xmlWriter.endElement();
        this.donationAmt += parseInt(donationAmount.donationAmount);
        this.eligibleAmt += parseInt(donationAmount.donationAmount);
    }
    private add80gDonee50PercentWithoutQualifyingLimit(section80g) {
        if (section80g.donation50DeductionWithoutQualifyingLimit.length == 0)
            return;
        this.xmlWriter.startElement("ITRForm:Don50PercentNoApprReqd");
        let donationAmount = this.addDoneeNodes(section80g.donation50DeductionWithoutQualifyingLimit);
        this.xmlWriter.writeElement("ITRForm:TotDon50PercentNoApprReqd", donationAmount.donationAmount);
        this.xmlWriter.writeElement("ITRForm:TotEligibleDon50Percent", donationAmount.eligibleAmount);
        this.xmlWriter.endElement();
        this.donationAmt += parseInt(donationAmount.donationAmount);
        this.eligibleAmt += parseInt(donationAmount.donationAmount);
    }
    private add80gDonee100PercentWithQualifyingLimit(section80g) {
        if (section80g.donation100DeductionWithQualifyingLimit.length == 0)
            return;
        this.xmlWriter.startElement("ITRForm:Don100PercentApprReqd");
        let donationAmount = this.addDoneeNodes(section80g.donation100DeductionWithQualifyingLimit);
        this.xmlWriter.writeElement("ITRForm:TotDon100PercentApprReqd", donationAmount.donationAmount);
        this.xmlWriter.writeElement("ITRForm:TotEligibleDon100PercentApprReqd", donationAmount.eligibleAmount);
        this.xmlWriter.endElement();
        this.donationAmt += parseInt(donationAmount.donationAmount);
        this.eligibleAmt += parseInt(donationAmount.donationAmount);
    }
    private add80gDonee50PercentWithQualifyingLimit(section80g) {
        if (section80g.donation50DeductionWithQualifyingLimit.length == 0)
            return;
        this.xmlWriter.startElement("ITRForm:Don50PercentApprReqd");
        let donationAmount = this.addDoneeNodes(section80g.donation50DeductionWithQualifyingLimit);
        this.xmlWriter.writeElement("ITRForm:TotDon50PercentApprReqd", donationAmount.donationAmount);
        this.xmlWriter.writeElement("ITRForm:TotEligibleDon50PercentApprReqd", donationAmount.eligibleAmount);
        this.xmlWriter.endElement();
        this.donationAmt += parseInt(donationAmount.donationAmount);
        this.eligibleAmt += parseInt(donationAmount.donationAmount);
    }
    private addDoneeNodes(doneeDonations): any {
        let eligibleAmount = 0;
        let donationAmount = 0;
        for (let doneeDonation of doneeDonations) {
            this.xmlWriter.startElement("ITRForm:DoneeWithPan");
            if (doneeDonation.doneeName !== undefined && doneeDonation.doneeName != "")
                this.xmlWriter.writeElement("ITRForm:DoneeWithPanName", doneeDonation.doneeName.toUpperCase());
            if (doneeDonation.PAN !== undefined && doneeDonation.PAN != "")
                this.xmlWriter.writeElement("ITRForm:DoneePAN", doneeDonation.PAN.toUpperCase());

            this.xmlWriter.startElement("ITRForm:AddressDetail");
            if (doneeDonation.address !== undefined && doneeDonation.address != "")
                this.xmlWriter.writeElement("ITRForm:AddrDetail", doneeDonation.address.toUpperCase());
            if (doneeDonation.cityTownDistrict !== undefined && doneeDonation.cityTownDistrict != "")
                this.xmlWriter.writeElement("ITRForm:CityOrTownOrDistrict", doneeDonation.cityTownDistrict.toUpperCase());
            if (doneeDonation.selectedStateCode !== null && doneeDonation.selectedStateCode != "")
                this.xmlWriter.writeElement("ITRForm:StateCode", doneeDonation.selectedStateCode);
            if (doneeDonation.pinCode !== undefined && doneeDonation.pinCode != "")
                this.xmlWriter.writeElement("ITRForm:PinCode", doneeDonation.pinCode);
            this.xmlWriter.endElement();
            if (doneeDonation.donationAmount !== undefined && doneeDonation.donationAmount != 0) {
                this.xmlWriter.writeElement("ITRForm:DonationAmt", doneeDonation.donationAmount);
                this.xmlWriter.writeElement("ITRForm:EligibleDonationAmt", doneeDonation.donationAmount);
            }
            if (doneeDonation.eligibleDonationAmount !== undefined && doneeDonation.eligibleDonationAmount != 0)
                this.xmlWriter.writeElement("ITRForm:EligibleDonationAmt", doneeDonation.eligibleDonationAmount);
            this.xmlWriter.endElement();
            donationAmount += parseInt(doneeDonation.donationAmount);
            eligibleAmount += parseInt(doneeDonation.donationAmount);
        }
        return { donationAmount: donationAmount, eligibleAmount: eligibleAmount };
    }
}
