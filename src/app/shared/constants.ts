import { Injectable } from '@angular/core';

@Injectable()
export class Configuration {
    public Server = 'http://localhost/ITApplication.Web/';
    public ApiUrl = 'api/';
    public ServerWithApiUrl = this.Server + this.ApiUrl;    
}