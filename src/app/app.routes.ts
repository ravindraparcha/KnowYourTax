import { Routes } from '@angular/router';
import { CalculatorComponent } from './modules/calculator/calculator.component';
import { PageNotFoundComponent } from './modules/pageNotFound/pageNotFound.component';
import { PrivacyPolicyComponent, AboutComponent } from './modules/footer/footer';
import { eTaxXMLComponent } from './modules/eTaxXML/components/eTaxXML.component';
// <a [routerLink]="['/parcha.net']">Parcha.net</a>
// <a [routerLink]="['/privacypolicy']">Privacy Policy</a>
// <a [routerLink]="['/privacypolicy']">
//   <i class="fa fa-github"></i>&nbsp;GitHub
export const rootRouterConfig: Routes = [
  { path: '', redirectTo: 'calculator', pathMatch: 'full' },
  { path: 'calculator', component: CalculatorComponent },
  { path: 'eTaxXML', component: eTaxXMLComponent },
  { path: 'privacypolicy', component: PrivacyPolicyComponent },
  { path: 'about', component: AboutComponent },
  { path: 'eTaxXML', component: eTaxXMLComponent },
  { path: '', component: CalculatorComponent },
  { path: '**', component: PageNotFoundComponent }
];

