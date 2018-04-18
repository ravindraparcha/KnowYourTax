import 'rxjs/add/operator/map';
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

    public getAll<T>(): Observable<T> {        
        this._slimLoader.startLoading();
        return this.http.get<T>(this.actionUrl);
    }

    public getAssessmentYearData<T>(assessmentYearId : number,category:number) : Observable<T>{        
        //const input = JSON.stringify({ assessmentYearId :assessmentYearId, category :category });
        this._slimLoader.startLoading();
        const input = "?m=GetAssessmentYearData&assessmentYearId="+assessmentYearId+"&category="+category;    
        return this.http.get<T>(this.actionUrl+input);
    }

    public getAssessmentYears<T>() : Observable<T>{
        this._slimLoader.startLoading();
        const input = "?m=GetAssessmentYears";
        return this.http.get<T>(this.actionUrl+input);
    }

    public getSections<T>(assessmentYearId:number,category:number) : Observable<T>{
        this._slimLoader.startLoading();
        const input = "?m=GetSections&assessmentYearId="+assessmentYearId+"&category="+category;
        return this.http.get<T>(this.actionUrl+input);
    }

    public calculateTax<T>(model: any): Observable<T> {
        this._slimLoader.startLoading();
        const methodQueryStringUrl=this.actionUrl+ "?m=CalculateTax";        
        return this.http.post<T>(methodQueryStringUrl,JSON.stringify(model)); 
    }

}
