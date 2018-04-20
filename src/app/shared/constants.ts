import { Injectable } from '@angular/core';

@Injectable()
export class Configuration {
    public Server = 'http://localhost/ITApplication.Web/';
    public ApiUrl = 'api/';
    public ServerWithApiUrl = this.Server + this.ApiUrl;    
    public customOptions = {
        positionClass: "toast-top-center", newestOnTop: true, showCloseButton: true,toastLife : 2000
    }

}