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
    public annualValue : number;
    public annualValuePercentageAmount : number;
    public interestOnBorrowedCapital : number;
}