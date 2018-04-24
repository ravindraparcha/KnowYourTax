import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch'; 
import { HttpClient, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Configuration } from "../shared/constants";
import { Injectable } from '@angular/core';
import {slimLoaderBarService} from '../shared/services/slimLoaderBarService';

@Injectable()
export class CalculatorDataService {    
   
    private actionUrl: string;

    constructor(private http: HttpClient, private _configuration: Configuration,private _slimLoader : slimLoaderBarService) {        
        this.actionUrl = _configuration.ServerWithApiUrl + 'TaxCalculator/';
    }
 
    public getAssessmentYears<T>() : Observable<T>{        
        this._slimLoader.startLoading();
        const input = "?m=GetAssessmentYears";
        return this.http.get<T>(this.actionUrl+input)
                        .catch(this.handleError);
    }

    public getSections<T>(assessmentYearId:number,category:number) : Observable<T>{
        this._slimLoader.startLoading();
        const input = "?m=GetSections&assessmentYearId="+assessmentYearId+"&category="+category;
        return this.http.get<T>(this.actionUrl+input)
                        .catch(this.handleError); ;
    }

    public calculateTax<T>(model: any): Observable<T> {
        this._slimLoader.startLoading();
        const methodQueryStringUrl=this.actionUrl+ "?m=CalculateTax";        
        return this.http.post<T>(methodQueryStringUrl,JSON.stringify(model))
                        .catch(this.handleError); 
    }

    handleError(error : Response) {
        return Observable.throw(error);
    }

}
