import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { rootRouterConfig } from './app.routes';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';


import {CalculatorDataService} from '../app/dataServices/calculator.dataservice'
import { CalculatorComponent } from './services/calculator/calculator.component';
import { Configuration } from "../app/shared/constants";

@NgModule({
  declarations: [
    AppComponent,
    CalculatorComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(rootRouterConfig, { useHash: true }),
    HttpClientModule

  ],
  providers: [HttpClientModule ,Configuration,CalculatorDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
