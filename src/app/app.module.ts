import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { rootRouterConfig } from './app.routes';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import {SlimLoadingBarModule} from 'ng2-slim-loading-bar';
import {ToastModule} from 'ng2-toastr/ng2-toastr';
import {HashLocationStrategy, LocationStrategy} from '@angular/common';
 

import {CalculatorDataService} from '../app/dataServices/calculator.dataservice'
import { CalculatorComponent } from './modules/calculator/calculator.component';
import {PageNotFoundComponent} from './modules/pageNotFound/pageNotFound.component';
import { Configuration } from "../app/shared/constants";
import {slimLoaderBarService} from '../app/shared/services/slimLoaderBarService';
import {IndianCurrency} from '../app/shared/misc/indianCurrency';
import {PrivacyPolicyComponent,AboutComponent} from './modules/footer/footer';

import {eTaxXMLComponent} from './modules/eTaxXML/eTaxXML.component';
import {ToasterService} from '../app/shared/services/toasterService';
import {eTaxXMLModule}  from './modules/eTaxXML/eTaxXMLModule';


@NgModule({
  declarations: [
    IndianCurrency,
    AppComponent,
    CalculatorComponent,
    PageNotFoundComponent,
    PrivacyPolicyComponent,
    AboutComponent  
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(rootRouterConfig, { useHash: true }),
    HttpClientModule,    
    SlimLoadingBarModule.forRoot(),
    BrowserAnimationsModule,
    ToastModule.forRoot(),     
    eTaxXMLModule
  ],
  providers: [
    {provide: LocationStrategy,useClass:HashLocationStrategy},
    HttpClientModule,
    Configuration,
    CalculatorDataService,
    slimLoaderBarService],
  bootstrap: [AppComponent]
})
export class AppModule { }
