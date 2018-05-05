import { Component } from "@angular/core";
 
@Component({
    selector: 'privacyPolicy',
    templateUrl : 'privacyPolicy.component.html' 

})
export class PrivacyPolicyComponent  {
    ngOnInit() {
        window.scrollTo(0, 0);        
    }
}

@Component({
    selector: 'about',
    templateUrl : './about.component.html' 

})
export class AboutComponent  {
    ngOnInit() {        
        window.scrollTo(0, 0);        
    }
}