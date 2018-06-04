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
    public grossTotalIncome : number = 0;
   
    public totalDeductionSum : number=0;    
}

export class IncomeData {
    public incomeDetailsModel = {};
    public incomeTaxModel ={};
}