import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { rootRouterConfig } from './app.routes';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import {SlimLoadingBarModule} from 'ng2-slim-loading-bar';
import {ToastModule} from 'ng2-toastr/ng2-toastr';
import {HashLocationStrategy, LocationStrategy} from '@angular/common';
import { NgxSpinnerModule } from 'ngx-spinner';


import {CalculatorService} from '../app/modules/shared/services/calculator.service'
// import { CalculatorComponent } from './modules/calculator/old/calculator.component';
//import {CalculatorComponent} from './modules/calculator/calculator.component';
import {PageNotFoundComponent} from './pageNotFound/pageNotFound.component';
import { ConfigurationService } from '../app/modules/shared/services/ConfigurationService';
import {slimLoaderBarService} from '../app/modules/shared/services/slimLoaderBarService';
import {PrivacyPolicyComponent,AboutComponent} from './footer/footer'; 
import {sharedModule} from  '../app/modules/shared/sharedModule';
//import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [     
    AppComponent,
    //CalculatorComponent,
    PageNotFoundComponent,
    PrivacyPolicyComponent,
    AboutComponent  
  ],
  imports: [
  //ToastrModule,
    NgxSpinnerModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(rootRouterConfig, { useHash: true }),
    HttpClientModule,    
    SlimLoadingBarModule.forRoot(),
    BrowserAnimationsModule,
    ToastModule.forRoot(),     
    sharedModule
  ],
  providers: [
    {provide: LocationStrategy,useClass:HashLocationStrategy},
    HttpClientModule,
    ConfigurationService,
    CalculatorService,
    slimLoaderBarService,
    
  ],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule { }
