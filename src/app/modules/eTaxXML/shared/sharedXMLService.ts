import { Injectable } from "@angular/core";
import { first } from "rxjs/operator/first";

@Injectable()
export class SharedXMLService {
    public formatDate(day: number, month: number, year: number, format: string, delimiter: string) {
      
        let formatDateArr = [];
        let outputArr = [];
        let firstIndex = -1;
        let nextIndex = -1;
       
        let occurances = this.findOccurancesCount(delimiter, format);
        for (let i = 0; i <= occurances; i++) {
            if (i > 0)
                firstIndex = format.indexOf(delimiter, firstIndex);
            firstIndex += 1;
            nextIndex = firstIndex + format.substr(firstIndex).indexOf(delimiter);
            if (nextIndex <= firstIndex)
                formatDateArr.push(format.substr(firstIndex));
            else
                formatDateArr.push(format.substr(firstIndex, (nextIndex - firstIndex)));
        }
        let dayStr: string; let monthStr: string, yearStr: string;
        if (day < 10)
            dayStr = "0" + day;
        else
            dayStr = day.toString();
        if (month < 10)
            monthStr = "0" + month;
        else
            monthStr = month.toString();

        let length = formatDateArr.length;
        for (let i = 0; i < length; i++) {
            if (formatDateArr[i].toLowerCase() == 'yyyy')
                outputArr.push(year);
            else if (formatDateArr[i].toLowerCase() == 'mm')
                outputArr.push(monthStr);
            else if (formatDateArr[i].toLowerCase() == 'dd')
                outputArr.push(dayStr);
        }      
        return outputArr.join(delimiter);
    }

    private findOccurancesCount(searchString, sourceString) {
        let count = 0; let pos = 0;
        pos = sourceString.indexOf(searchString);
        while (pos > -1) {
            ++count;
            pos = sourceString.indexOf(searchString, ++pos);
        }
        return count;
    }
}