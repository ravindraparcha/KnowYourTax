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
            else if (element.infoType === "taxCollectedDeducted")
                this.addTaxDeductedCollected(element.data);

            else if (element.infoType === "verification")
                this.addVerificationNode(element.data);

            else if (element.infoType === "80g")
                this.add80GNode(element.data);

        });

        this.xmlWriter.endDocument();
        let xmlData = this.xmlWriter.toString().replace(/&quot;/g, '"');
        console.log(xmlData);

        var blob = new Blob([xmlData], { type: "text/xml" });
        if (panNo == undefined || panNo == "") {
            let currentDate = new Date();
            panNo = currentDate.getFullYear().toString() + (currentDate.getMonth() + 1).toString() + currentDate.getDate().toString();
        }
        //saveAs(blob, panNo + ".xml");
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
        let dateString = this._sharedXMLService.formatDate(date.getDate(), date.getMonth() + 1, date.getFullYear(), "yyyy-mm-dd", "-");
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

    private addIncomeDeductionNode(incomeDetail) {
        let incomeDetails = incomeDetail.incomeDetailsModel;
        this.xmlWriter.startElement("ITRForm:ITR1_IncomeDeductions");

        if (incomeDetails.salary !== undefined && incomeDetails.salary !== null)
            this.xmlWriter.writeElement("ITRForm:Salary", incomeDetails.salary);
        if (incomeDetails.allowance !== undefined && incomeDetails.allowance !== null)
            this.xmlWriter.writeElement("ITRForm:AlwnsNotExempt", incomeDetails.allowance);
        if (incomeDetails.perquisites !== undefined && incomeDetails.perquisites !== null)
            this.xmlWriter.writeElement("ITRForm:PerquisitesValue", incomeDetails.perquisites);
        if (incomeDetails.profitLieuOfSalary !== undefined && incomeDetails.profitLieuOfSalary !== null)
            this.xmlWriter.writeElement("ITRForm:ProfitsInSalary", incomeDetails.profitLieuOfSalary);
        if (incomeDetails.deductionUS16 !== undefined && incomeDetails.deductionUS16 !== null)
            this.xmlWriter.writeElement("ITRForm:DeductionUs16", incomeDetails.deductionUS16);
        if (incomeDetails.salaryPensionSum !== undefined && incomeDetails.salaryPensionSum !== null)
            this.xmlWriter.writeElement("ITRForm:IncomeFromSal", incomeDetails.salaryPensionSum);
        if (incomeDetails.selectedHousePropertyType !== undefined && incomeDetails.selectedHousePropertyType !== "0")
            this.xmlWriter.writeElement("ITRForm:TypeOfHP", incomeDetails.selectedHousePropertyType);
        if (incomeDetails.annualValue !== undefined && incomeDetails.annualValue == null)
            this.xmlWriter.writeElement("ITRForm:AnnualValue", incomeDetails.annualValue);
        if (incomeDetails.annualValuePercentageAmount !== undefined && incomeDetails.annualValuePercentageAmount == null)
            this.xmlWriter.writeElement("ITRForm:StandardDeduction", incomeDetails.annualValuePercentageAmount);
        if (incomeDetails.interestOnBorrowedCapital !== undefined && incomeDetails.interestOnBorrowedCapital !== null)
            this.xmlWriter.writeElement("ITRForm:InterestPayable", incomeDetails.interestOnBorrowedCapital);
        if (incomeDetails.housePropertySum !== undefined && incomeDetails.housePropertySum !== null)
            this.xmlWriter.writeElement("ITRForm:TotalIncomeOfHP", incomeDetails.housePropertySum);
        if (incomeDetails.incomeFromOtherSources !== undefined && incomeDetails.incomeFromOtherSources !== null)
            this.xmlWriter.writeElement("ITRForm:IncomeOthSrc", incomeDetails.incomeFromOtherSources);
        if (incomeDetails.grossTotalIncome !== undefined && incomeDetails.grossTotalIncome !== null)
            this.xmlWriter.writeElement("ITRForm:GrossTotIncome", incomeDetails.grossTotalIncome);

        this.xmlWriter.endElement();
        let incomeTaxModel = incomeDetail.incomeTaxModel;
        this.addUserDeductionNode(incomeTaxModel.userTaxModel, incomeTaxModel.totalUsrDeductions);
        this.addSysCalculatedDeductionNode(incomeTaxModel.systemTaxModel, incomeTaxModel.totalSysDeductions);
        this.addTaxComputationNode(incomeTaxModel.taxComputationModel);
    }

    private addUserDeductionNode(userDeductions, totalDeductions) {
        this.xmlWriter.startElement("ITRForm:UsrDeductUndChapVIA");
        this.addDeductionNode(userDeductions, totalDeductions,true);
        this.xmlWriter.endElement();
    }

    private addSysCalculatedDeductionNode(sysDeductions, totalDeductions) {
        this.xmlWriter.startElement("ITRForm:DeductUndChapVIA");
        this.addDeductionNode(sysDeductions, totalDeductions,false);
        this.xmlWriter.endElement();
    }

    private addDeductionNode(deductions, totalDeductions, isUsrNode: boolean) {
        let total: number = 0;
        deductions.forEach(element => {
            total += element.amount;
            if (element.name == "80C")
                this.xmlWriter.writeElement("ITRForm:Section80C", element.amount);
            else if (element.name == "80CCC")
                this.xmlWriter.writeElement("ITRForm:Section80CCC", element.amount);
            else if (element.name == "80CCD1")
                this.xmlWriter.writeElement("ITRForm:Section80CCDEmployeeOrSE", element.amount);
            else if (element.name == "80C")
                this.xmlWriter.writeElement("ITRForm:Section80CCD1B", element.amount);
            else if (element.name == "80CCD2")
                this.xmlWriter.writeElement("ITRForm:Section80CCDEmployer", element.amount);
            else if (element.name == "80D") {
                if (isUsrNode)
                    this.xmlWriter.writeElement("ITRForm:Section80DUsrType", element.option);
                this.xmlWriter.writeElement("ITRForm:Section80D", element.amount);
            }

            else if (element.name == "80DD") {
                if (isUsrNode)
                    this.xmlWriter.writeElement("ITRForm:Section80DDUsrType", element.option);
                this.xmlWriter.writeElement("ITRForm:Section80DD", element.amount);

            }
            else if (element.name == "80DDB") {
                if (isUsrNode)
                    this.xmlWriter.writeElement("ITRForm:ITRForm:Section80DDBUsrType", element.option);
                this.xmlWriter.writeElement("ITRForm:Section80DDB", element.amount);

            }
            else if (element.name == "80E")
                this.xmlWriter.writeElement("ITRForm:Section80E", element.amount);
            else if (element.name == "80EE")
                this.xmlWriter.writeElement("ITRForm:Section80EE", element.amount);
            else if (element.name == "80G")
                this.xmlWriter.writeElement("ITRForm:Section80G", element.amount);

            else if (element.name == "80GG")
                this.xmlWriter.writeElement("ITRForm:Section80GG", element.amount);
            else if (element.name == "80GGA")
                this.xmlWriter.writeElement("ITRForm:Section80GGA", element.amount);
            else if (element.name == "80GGC")
                this.xmlWriter.writeElement("ITRForm:Section80GGC", element.amount);


            else if (element.name == "80U") {
                if (isUsrNode)
                    this.xmlWriter.writeElement("ITRForm:Section80UUsrType", element.option);
                this.xmlWriter.writeElement("ITRForm:Section80U", element.amount);
            }

            else if (element.name == "80RRB")
                this.xmlWriter.writeElement("ITRForm:Section80RRB", element.amount);

            else if (element.name == "80QQB")
                this.xmlWriter.writeElement("ITRForm:Section80QQB", element.amount);

            else if (element.name == "80CCG")
                this.xmlWriter.writeElement("ITRForm:Section80CCG", element.amount);
            else if (element.name == "80TTA")
                this.xmlWriter.writeElement("ITRForm:Section80TTA", element.amount);
        });
        this.xmlWriter.writeElement("ITRForm:TotalChapVIADeductions", total);   

        //         <ITRForm:Section80C>50000</ITRForm:Section80C>
        // <ITRForm:Section80CCC>1000</ITRForm:Section80CCC>
        // <ITRForm:Section80CCDEmployeeOrSE>2000</ITRForm:Section80CCDEmployeeOrSE>
        // <ITRForm:Section80CCD1B>3000</ITRForm:Section80CCD1B>
        // <ITRForm:Section80CCDEmployer>4000</ITRForm:Section80CCDEmployer>
        // <ITRForm:Section80DUsrType>1</ITRForm:Section80DUsrType>
        // <ITRForm:Section80D>6000</ITRForm:Section80D>
        // <ITRForm:Section80DDUsrType>1</ITRForm:Section80DDUsrType>
        // <ITRForm:Section80DD>7000</ITRForm:Section80DD>
        // <ITRForm:Section80DDBUsrType>1</ITRForm:Section80DDBUsrType>
        // <ITRForm:Section80DDB>8000</ITRForm:Section80DDB>
        // <ITRForm:Section80E>10000</ITRForm:Section80E>
        // <ITRForm:Section80EE>11000</ITRForm:Section80EE>
        // <ITRForm:Section80G>0</ITRForm:Section80G>
        // <ITRForm:Section80GG>8000</ITRForm:Section80GG>
        // <ITRForm:Section80GGA>9000</ITRForm:Section80GGA>
        // <ITRForm:Section80GGC>10000</ITRForm:Section80GGC>
        // <ITRForm:Section80UUsrType>1</ITRForm:Section80UUsrType>
        // <ITRForm:Section80U>64230</ITRForm:Section80U>
        // <ITRForm:Section80RRB>3333</ITRForm:Section80RRB>
        // <ITRForm:Section80QQB>11000</ITRForm:Section80QQB>
        // <ITRForm:Section80CCG>5000</ITRForm:Section80CCG>
        // <ITRForm:Section80TTA>11111</ITRForm:Section80TTA>
        // <ITRForm:TotalChapVIADeductions>223674</ITRForm:TotalChapVIADeductions>
    }

    private addTaxComputationNode(incomeDetails) {
        this.xmlWriter.startElement("ITRForm:ITR1_TaxComputation");

        if (incomeDetails.totalTaxableIncome !== undefined && incomeDetails.totalTaxableIncome !== null)
            this.xmlWriter.writeElement("ITRForm:TotalTaxPayable", incomeDetails.totalTaxableIncome);
        if (incomeDetails.rebate !== undefined && incomeDetails.rebate !== null)
            this.xmlWriter.writeElement("ITRForm:Rebate87A", incomeDetails.rebate);
        if (incomeDetails.taxAfterRebate !== undefined && incomeDetails.taxAfterRebate !== null)
            this.xmlWriter.writeElement("ITRForm:TaxPayableOnRebate", incomeDetails.taxAfterRebate);
        if (incomeDetails.cessCharges !== undefined && incomeDetails.cessCharges !== null)
            this.xmlWriter.writeElement("ITRForm:EducationCess", incomeDetails.cessCharges);
        if (incomeDetails.totalTaxWithCess !== undefined && incomeDetails.totalTaxWithCess !== null)
            this.xmlWriter.writeElement("ITRForm:GrossTaxLiability", incomeDetails.totalTaxWithCess);
        if (incomeDetails.relief !== undefined && incomeDetails.relief !== null)
            this.xmlWriter.writeElement("ITRForm:Section89", incomeDetails.relief);
        if (incomeDetails.balanceTaxAfterRelief !== undefined && incomeDetails.balanceTaxAfterRelief !== null)
            this.xmlWriter.writeElement("ITRForm:NetTaxLiability", incomeDetails.balanceTaxAfterRelief);
        if (incomeDetails.totalIntrstPay !== undefined && incomeDetails.totalIntrstPay !== null)
            this.xmlWriter.writeElement("ITRForm:TotalIntrstPay", incomeDetails.totalIntrstPay);

        this.xmlWriter.endElement();
        this.xmlWriter.startElement("ITRForm:IntrstPay");

        if (incomeDetails.intrstPayUs234A !== undefined && incomeDetails.intrstPayUs234A !== null)
            this.xmlWriter.writeElement("ITRForm:IntrstPayUs234A", incomeDetails.intrstPayUs234A);
        if (incomeDetails.intrstPayUs234B !== undefined && incomeDetails.intrstPayUs234B !== null)
            this.xmlWriter.writeElement("ITRForm:IntrstPayUs234B", incomeDetails.intrstPayUs234B);
        if (incomeDetails.intrstPayUs234C !== undefined && incomeDetails.intrstPayUs234C !== null)
            this.xmlWriter.writeElement("ITRForm:IntrstPayUs234C", incomeDetails.intrstPayUs234C);
        if (incomeDetails.lateFilingFee234F !== undefined && incomeDetails.lateFilingFee234F !== null)
            this.xmlWriter.writeElement("ITRForm:LateFilingFee234F", incomeDetails.lateFilingFee234F);
        if (incomeDetails.totTaxPlusIntrstPay !== undefined && incomeDetails.totTaxPlusIntrstPay !== null)
            this.xmlWriter.writeElement("ITRForm:TotTaxPlusIntrstPay", incomeDetails.totTaxPlusIntrstPay);

        this.xmlWriter.endElement();
    }

    private addTaxPaid(taxPaid) {

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
            amountSum += otherExemptModel.amount;
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

        this.xmlWriter.startElement("ITRFORM:PriBankDetails");
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
                    this.xmlWriter.writeElement("ITRForm:BankName", taxPaid.accountDetail.bankName);
                if (otherAccountDetails.accountNo !== undefined && otherAccountDetails.accountNo !== null)
                    this.xmlWriter.writeElement("ITRForm:BankAccountNo", otherAccountDetails.accountNo);
                this.xmlWriter.endElement();
            }
        }
        this.xmlWriter.endElement();
        //         ITRForm:AddtnlBankDetails>
        // <ITRForm:IFSCCode>KKBK0000960</ITRForm:IFSCCode>
        // <ITRForm:BankName>KOTAK MAHINDRA BANK LIMITED</ITRForm:BankName>
        // <ITRForm:BankAccountNo>5411448108</ITRForm:BankAccountNo>
        // </ITRForm:AddtnlBankDetails>

    }

    private addTaxDeductedCollected(taxDeductedCollected) {

        //Tax deducted on salary
        if (taxDeductedCollected.taxDeductedSalaryModels.length > 0) {
            let deductedSum = 0;
            this.xmlWriter.startElement("ITRForm:TDSonSalaries");
            for (let deducted of taxDeductedCollected.taxDeductedSalaryModels) {
                this.xmlWriter.startElement("ITRForm:TDSonSalary");

                this.xmlWriter.startElement("ITRForm:EmployerOrDeductorOrCollectDetl");
                this.xmlWriter.writeElement("ITRForm:TAN", deducted.TAN);
                this.xmlWriter.writeElement("ITRForm:EmployerOrDeductorOrCollecterName", deducted.name);
                this.xmlWriter.endElement();

                this.xmlWriter.writeElement("ITRForm:IncChrgSal", deducted.incomeChargeableForDeduction);
                this.xmlWriter.writeElement("ITRForm:TotalTDSSal", deducted.taxDeducted);

                this.xmlWriter.endElement();
                deductedSum += deducted.taxDeducted;
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
                this.xmlWriter.writeElement("ITRForm:TAN", deducted.TAN);
                this.xmlWriter.writeElement("ITRForm:EmployerOrDeductorOrCollecterName", deducted.name);
                this.xmlWriter.endElement();

                this.xmlWriter.writeElement("ITRForm:AmtForTaxDeduct", deducted.amountForTaxDeduction);
                this.xmlWriter.writeElement("ITRForm:DeductedYr", deducted.selectedOtherThanSalaryYear);
                this.xmlWriter.writeElement("ITRForm:TotTDSOnAmtPaid", deducted.taxDeducted);
                this.xmlWriter.writeElement("ITRForm:ClaimOutOfTotTDSOnAmtPaid", deducted.amountClaimedThisYear);

                this.xmlWriter.endElement();
                deductedSum += deducted.taxDeducted;
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

                this.xmlWriter.writeElement("ITRForm:PANofTenant", deducted.PAN);
                this.xmlWriter.writeElement("ITRForm:NameOfTenant", deducted.name);
                this.xmlWriter.writeElement("ITRForm:AmtForTaxDeduct", deducted.amountForTaxDeduction);

                this.xmlWriter.writeElement("ITRForm:DeductedYr", deducted.selectedTenantDeductionYear);
                this.xmlWriter.writeElement("ITRForm:TaxDeducted", deducted.taxDeducted);
                this.xmlWriter.writeElement("ITRForm:ClaimOutOfTotTDSOnAmtPaid", deducted.amountClaimedThisYear);

                this.xmlWriter.endElement();
                deductedSum += deducted.taxDeducted;
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
                this.xmlWriter.writeElement("ITRForm:TAN", collected.taxCollectionAccountNo);
                this.xmlWriter.writeElement("ITRForm:EmployerOrDeductorOrCollecterName", collected.name);
                this.xmlWriter.endElement();

                this.xmlWriter.writeElement("ITRForm:AmtTaxCollected", collected.amountForTaxDeduction);
                this.xmlWriter.writeElement("ITRForm:CollectedYr", collected.selectedTaxCollectionYear);
                this.xmlWriter.writeElement("ITRForm:TotalTCS", collected.taxCollected);
                this.xmlWriter.writeElement("ITRForm:AmtTCSClaimedThisYear", collected.amountClaimedThisYear);

                this.xmlWriter.endElement();
                collectedSum += collected.taxDeducted;
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

                this.xmlWriter.writeElement("ITRForm:BSRCode", advanceTax.BSRCode);
                this.xmlWriter.writeElement("ITRForm:DateDep", advanceTax.depositDateXml);
                this.xmlWriter.writeElement("ITRForm:SrlNoOfChaln", advanceTax.challanSerialNumber);
                this.xmlWriter.writeElement("ITRForm:Amt", advanceTax.taxPaid);

                this.xmlWriter.endElement();
                advanceTaxSum += advanceTax.taxPaid;
            }
            this.xmlWriter.writeElement("ITRForm:TotalTaxPayments", advanceTaxSum);
            this.xmlWriter.endElement();
        }

    }

    private addVerificationNode(verification) {
        this.xmlWriter.startElement("ITRForm:Verification");
        this.xmlWriter.startElement("ITRForm:Declaration");
        if (verification.fullName !== undefined && verification.fullName !== "")
            this.xmlWriter.writeElement("ITRForm:AssesseeVerName", verification.fullName);
        if (verification.sonDaughterOf !== undefined && verification.sonDaughterOf !== "")
            this.xmlWriter.writeElement("ITRForm:FatherName", verification.sonDaughterOf);
        if (verification.PAN !== undefined && verification.PAN !== "")
            this.xmlWriter.writeElement("ITRForm:AssesseeVerPAN", verification.PAN);

        this.xmlWriter.endElement();

        if (verification.capacity !== undefined && verification.capacity !== "")
            this.xmlWriter.writeElement("ITRForm:Capacity", verification.capacity);
        if (verification.place !== undefined && verification.place !== "")
            this.xmlWriter.writeElement("ITRForm:Place", verification.place);
        if (verification.verificationDateXml !== undefined && verification.verificationDateXml !== "")
            this.xmlWriter.writeElement("ITRForm:Date", verification.verificationDateXml);

        this.xmlWriter.endElement();

        //tax return preparer
        this.xmlWriter.startElement("ITRForm:TaxReturnPreparer");
        if (verification.TRPIdentificationNo !== undefined && verification.TRPIdentificationNo !== "")
            this.xmlWriter.writeElement("ITRForm:IdentificationNoOfTRP", verification.TRPIdentificationNo);
        if (verification.TRPName !== undefined && verification.TRPName !== "")
            this.xmlWriter.writeElement("ITRForm:NameOfTRP", verification.TRPName);
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
        this.donationAmt += donationAmount.donationAmount;
        this.eligibleAmt += donationAmount.eligibleAmount;
    }
    private add80gDonee50PercentWithoutQualifyingLimit(section80g) {
        if (section80g.donation50DeductionWithoutQualifyingLimit.length == 0)
            return;
        this.xmlWriter.startElement("ITRForm:Don50PercentNoApprReqd");
        let donationAmount = this.addDoneeNodes(section80g.donation50DeductionWithoutQualifyingLimit);
        this.xmlWriter.writeElement("ITRForm:TotDon50PercentNoApprReqd", donationAmount.donationAmount);
        this.xmlWriter.writeElement("ITRForm:TotEligibleDon50Percent", donationAmount.eligibleAmount);
        this.xmlWriter.endElement();
        this.donationAmt += donationAmount.donationAmount;
        this.eligibleAmt += donationAmount.eligibleAmount;
    }
    private add80gDonee100PercentWithQualifyingLimit(section80g) {
        if (section80g.donation100DeductionWithQualifyingLimit.length == 0)
            return;
        this.xmlWriter.startElement("ITRForm:Don100PercentApprReqd");
        let donationAmount = this.addDoneeNodes(section80g.donation100DeductionWithQualifyingLimit);
        this.xmlWriter.writeElement("ITRForm:TotDon100PercentApprReqd", donationAmount.donationAmount);
        this.xmlWriter.writeElement("ITRForm:TotEligibleDon100PercentApprReqd", donationAmount.eligibleAmount);
        this.xmlWriter.endElement();
        this.donationAmt += donationAmount.donationAmount;
        this.eligibleAmt += donationAmount.eligibleAmount;
    }
    private add80gDonee50PercentWithQualifyingLimit(section80g) {
        if (section80g.donation50DeductionWithQualifyingLimit.length == 0)
            return;
        this.xmlWriter.startElement("ITRForm:Don50PercentApprReqd");
        let donationAmount = this.addDoneeNodes(section80g.donation50DeductionWithQualifyingLimit);
        this.xmlWriter.writeElement("ITRForm:TotDon50PercentApprReqd", donationAmount.donationAmount);
        this.xmlWriter.writeElement("ITRForm:TotEligibleDon50PercentApprReqd", donationAmount.eligibleAmount);
        this.xmlWriter.endElement();
        this.donationAmt += donationAmount.donationAmount;
        this.eligibleAmt += donationAmount.eligibleAmount;
    }
    private addDoneeNodes(doneeDonations): any {
        let eligibleAmount = 0;
        let donationAmount = 0;
        for (let doneeDonation of doneeDonations) {
            this.xmlWriter.startElement("ITRForm:DoneeWithPan");
            if (doneeDonation.doneeName !== undefined && doneeDonation.doneeName != "")
                this.xmlWriter.writeElement("ITRForm:DoneeWithPanName", doneeDonation.doneeName);
            if (doneeDonation.PAN !== undefined && doneeDonation.PAN != "")
                this.xmlWriter.writeElement("ITRForm:DoneePAN", doneeDonation.PAN);

            this.xmlWriter.startElement("ITRForm:AddressDetail");
            if (doneeDonation.address !== undefined && doneeDonation.address != "")
                this.xmlWriter.writeElement("ITRForm:AddrDetail", doneeDonation.address);
            if (doneeDonation.cityTownDistrict !== undefined && doneeDonation.cityTownDistrict != "")
                this.xmlWriter.writeElement("ITRForm:CityOrTownOrDistrict", doneeDonation.cityTownDistrict);
            if (doneeDonation.selectedStateCode !== undefined && doneeDonation.selectedStateCode != "")
                this.xmlWriter.writeElement("ITRForm:StateCode", doneeDonation.selectedStateCode);
            if (doneeDonation.pinCode !== undefined && doneeDonation.pinCode != "")
                this.xmlWriter.writeElement("ITRForm:PinCode", doneeDonation.pinCode);
            this.xmlWriter.endElement();
            if (doneeDonation.donationAmount !== undefined && doneeDonation.donationAmount != 0)
                this.xmlWriter.writeElement("ITRForm:DonationAmt", doneeDonation.donationAmount);
            if (doneeDonation.eligibleDonationAmount !== undefined && doneeDonation.eligibleDonationAmount != 0)
                this.xmlWriter.writeElement("ITRForm:EligibleDonationAmt", doneeDonation.eligibleDonationAmount);
            this.xmlWriter.endElement();
            donationAmount += doneeDonation.donationAmount;
            eligibleAmount += doneeDonation.eligibleDonationAmount;
        }
        return { donationAmount: donationAmount, eligibleAmount: eligibleAmount };
    }
}
