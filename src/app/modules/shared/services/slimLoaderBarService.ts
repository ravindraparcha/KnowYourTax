import { Injectable} from '@angular/core';
import {SlimLoadingBarService} from 'ng2-slim-loading-bar';

 @Injectable()
export class slimLoaderBarService {    
    constructor(private _slimLoadingBarService: SlimLoadingBarService) { }    
    startLoading() {        
        this._slimLoadingBarService.start();
    } 
    stopLoading() {
        this._slimLoadingBarService.stop();
    } 
    completeLoading() {
        this._slimLoadingBarService.complete();
    }
}