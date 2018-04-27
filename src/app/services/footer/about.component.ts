import { Component } from "@angular/core";
  
@Component({
    selector: 'about',
    templateUrl : 'about.component.html' 

})
export class AboutComponent  {
    ngOnInit() {        
        window.scrollTo(0, 0);        
    }
}