import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment'
@Injectable()
export class Configuration {
    public ServerWithApiUrl = environment.apiUrl;
    public CustomOptions = {
        positionClass: 'toast-top-center', newestOnTop: true, showCloseButton: true, toastLife: 2000
    }
    public ErrorOccurred = "Some error occurred. Try refreshing page or contact administrator";

}