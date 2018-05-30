export class IncomeDetailsModel
{
    public salary : number ;
    public allowance : number;
    public perquisites: number ;
    public profitLieuOfSalary :number;
    public deductionUS16 : number ;
    public salaryPensionSum : number  =0;
    public housePropertySum : number =0;
    public selectedHousePropertyType : string="0";
    public rent : number;
    public taxPaidToLocalAuthority : number;
    public annualValue : number=0;
    public annualValuePercentageAmount : number =0;
    public interestOnBorrowedCapital : number;
    public incomeFromOtherSources: number;
    public grossTotalIncome : number;
    public selectedSection : string;    
    public totalTaxableIncome : number;
    public taxPayable : number;
    public rebate :number;
    public taxAfterRebate : number;
    public cessPercentage : number;
    public cessCharges : number;
    public totalTaxWithCess :number;
    public balanceTaxAfterRelief : number;
    public totalIntrstPay: number;
    public intrstPayUs234A : number;
    public intrstPayUs234B : number;
    public intrstPayUs234C : number;
    public lateFilingFee234F : number;
    public totTaxPlusIntrstPay:number;
    public netTax : number;
    public relief :  number;
    public totalDeductionSum : number=0;

}