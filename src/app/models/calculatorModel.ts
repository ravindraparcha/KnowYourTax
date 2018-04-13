export class CalculatorModel
{
    public assesstmenYearId : number;
    public Category : number;
    public GrossTaxableSalary : number;
    public SalaryIncome : number;
    public OtherSourceIncome : number;
    public HRAAllowance : number;
    public TransportAllowance : number;
    public  SectionValues : any;    
}

export class SectionValue
{
    public  SectionName : string;
    public  Amount :number;
}