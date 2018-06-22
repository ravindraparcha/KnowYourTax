import { Injectable, ViewContainerRef } from "@angular/core";
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Injectable()
export class ToasterService{
    constructor(public toastr: ToastsManager, vcr: ViewContainerRef) {      
        this.toastr.setRootViewContainerRef(vcr);
     }
 
     showSuccess(msg : string) {
        this.toastr.success(msg, 'Success');
      }
    
      showError(msg : string) {
        this.toastr.error(msg, 'Oops');
      }
    
      showWarning(msg : string) {
        this.toastr.warning(msg, 'Alert');
      }
    
      showInfo(msg : string) {
        this.toastr.info(msg,'Information');
      }
      
      showCustom() {
        this.toastr.custom('<span style="color: red">Message in red.</span>', null, {enableHTML: true});
      }
}
