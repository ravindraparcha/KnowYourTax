import 'rxjs/add/operator/map';
import { HttpClient, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Configuration } from "../shared/constants";
import { Injectable } from '@angular/core';

@Injectable()
export class CalculatorDataService {    
   
    private actionUrl: string;

    constructor(private http: HttpClient, private _configuration: Configuration) {        
        this.actionUrl = _configuration.ServerWithApiUrl + 'TaxCalculator/';
    }

    public getAll<T>(): Observable<T> {        
        return this.http.get<T>(this.actionUrl);
    }

    public getAssessmentYearData<T>(assessmentYearId : number,category:number) : Observable<T>{        
        //const input = JSON.stringify({ assessmentYearId :assessmentYearId, category :category });
        const input = "?m=GetAssessmentYearData&assessmentYearId="+assessmentYearId+"&category="+category;
        return this.http.get<T>(this.actionUrl+input);
    }
}

@Injectable()
export class CustomInterceptor implements HttpInterceptor {

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (!req.headers.has('Content-Type')) {
            req = req.clone({ headers: req.headers.set('Content-Type', 'application/json') });
        }

        req = req.clone({ headers: req.headers.set('Accept', 'application/json') });
        console.log(JSON.stringify(req.headers));
        return next.handle(req);
    }
}