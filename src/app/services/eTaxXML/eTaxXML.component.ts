import { Component } from "@angular/core";
  
@Component({
    selector: 'eTaxXML',
    templateUrl : './eTaxXML.component.html' 

})
export class eTaxXMLComponent  {
    cars = [
        { "id": 1 ,"name" :"Mahindra","disabled":true },
        { "id": 2 ,"name" :"Mahindra","disabled":false }
    ];
}