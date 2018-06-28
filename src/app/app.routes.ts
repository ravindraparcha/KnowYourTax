import { Routes } from "@angular/router";
import { PageNotFoundComponent } from './pageNotFound/pageNotFound.component';
import { PrivacyPolicyComponent, AboutComponent } from './footer/footer';

export const rootRouterConfig: Routes =
  [
    {
      path: 'calculator', loadChildren: './modules/calculator/calculator.module#CalculatorModule'      
    },
    {
      path: 'eTaxXML', loadChildren: './modules/eTaxXML/eTaxXML.module#eTaxXMLModule'      
    },
    { path: '', redirectTo: 'calculator', pathMatch: 'full' },
    { path: 'privacypolicy', component: PrivacyPolicyComponent },
    { path: 'about', component: AboutComponent },
    { path: '**', component: PageNotFoundComponent }

  ]