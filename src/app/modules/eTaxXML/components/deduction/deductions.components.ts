import { Component, OnInit } from "@angular/core";
import { Configuration } from '../../../../shared/constants';
import {DeductionModel} from '../../models/deduction.model';


declare var $: any;

@Component({    
selector : 'deductions',
templateUrl : './deductions-component.html'
})



export class DeductionsComponent implements OnInit {
    selectedSectionValue;
    public deductions=[];
    constructor(private _configuration: Configuration) { }
    
    ngOnInit(){
    
        // this.sections.push(1);
        // this.sections.push(1);
        // this.sections.push(1);
    }
    addNewSection(){
        var section = this.selectedSectionValue;
        $.each(this._configuration.deductionList, function(i, v) {
            if (v.value == section) {
                alert(v.text);
                return;
            }
        });
        this.deductions.push(new DeductionModel("",0));
    }
    onSectionChange(){
        debugger;
        this.addNewSection();
    }
    // onSectionChange(value){
    //     //var ddSection = document.getElementById("selectedSection");
    //     //var selectedText = ddSection.options[ddSection.selectedIndex].text;
    //     console.log($($('#selectedSection')[0]).find('span.ng-value-label').text().trim());
    //     console.log($($('#selectedSection')[0]).find('.ng-has-value').find('.ng-value-container').find('.ng-value').find('.ng-value-label').text().trim());
    // }
}