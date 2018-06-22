import { Routes } from "@angular/router";
import { PageNotFoundComponent } from './pageNotFound/pageNotFound.component';
import { PrivacyPolicyComponent, AboutComponent } from './footer/footer';
// // <a [routerLink]="['/parcha.net']">Parcha.net</a>
// // <a [routerLink]="['/privacypolicy']">Privacy Policy</a>
// // <a [routerLink]="['/privacypolicy']">
// //   <i class="fa fa-github"></i>&nbsp;GitHub
// export const rootRouterConfig: Routes = [
//   { path: '', redirectTo: 'calculator', pathMatch: 'full' },
//   { path: 'calculator', component: CalculatorComponent },
//   { path: 'eTaxXML', component: eTaxXMLComponent },
//   { path: 'privacypolicy', component: PrivacyPolicyComponent },
//   { path: 'about', component: AboutComponent },
//   { path: 'eTaxXML', component: eTaxXMLComponent },
//   { path: '', component: CalculatorComponent },
//   { path: '**', component: PageNotFoundComponent }
// ];

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
    { path: '**', component: PageNotFoundComponent },

  ]