import { Injectable } from "@angular/core"; 

@Injectable()
export class SharedXMLService {
    public formatDateDDMMYYYY(day: number, month: number, year: number) {
        let dayStr: string; let monthStr: string, yearStr: string;
        if (day < 10)
            dayStr = "0" + day;
        else
            dayStr = day.toString();
        if (month < 10)
            monthStr = "0" + month;
        else
            monthStr = month.toString();
        return  year+"-"+monthStr+"-"+dayStr;
    }
}