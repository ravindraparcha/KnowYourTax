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
    public annualValuePercentageAmount : number;
    public interestOnBorrowedCapital : number;
    public incomeFromOtherSources: number;
    public grossTotalIncome : number;
    public selectedSection : string;
    public totalDeduction : number;
    public totalTaxableIncome : number;
    public taxPayable : number;
    public rebate :number;
    public cessPercentage : number;
    public cessCharges : number;
    public netTax : number;
    public relief :  number;
    

}