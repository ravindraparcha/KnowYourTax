import { Injectable } from '@angular/core';

@Injectable()
export class Configuration {
    public Server = 'http://localhost/ITApplication.Web/';
    public ApiUrl = 'api/';
    public ServerWithApiUrl = this.Server + this.ApiUrl;    
    public CustomOptions = {
        positionClass: 'toast-top-center', newestOnTop: true, showCloseButton: true,toastLife : 2000
    }
    public ErrorOccurred="Some error occurred. Try refreshing page or contact administrator";

}