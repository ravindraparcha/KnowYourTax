export class IncomeDetailsModel
{
    public salary : string ="0";
    public allowance : string ="0";
    public perquisites: string  ="0";
    public profitLieuOfSalary :string ="0";
    public deductionUS16 : string  ="0";
    public salaryPensionSum : number  =0;
    public housePropertySum : number =0;
    public selectedHousePropertyType : string=null;
    public rent : string ="0";
    public taxPaidToLocalAuthority : string ="0";
    public annualValue : number=0;
    public annualValuePercentageAmount : number =0;
    public interestOnBorrowedCapital : string ="0";
    public incomeFromOtherSources: string ="0";
    public grossTotalIncome : number = 0;   
    public totalDeductionSum : number=0;    
}

export class IncomeData {
    public incomeDetailsModel = {};
    public incomeTaxModel ={};
}