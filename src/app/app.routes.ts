import { Routes } from '@angular/router';
import {CalculatorComponent} from './services/calculator/calculator.component';
import{PageNotFoundComponent} from './services/pageNotFound/pageNotFound.component';
import {PrivacyPolicyComponent,AboutComponent} from './services/footer/footer';
import {eTaxXMLComponent} from './services/eTaxXML/eTaxXML.component';
// <a [routerLink]="['/parcha.net']">Parcha.net</a>
// <a [routerLink]="['/privacypolicy']">Privacy Policy</a>
// <a [routerLink]="['/privacypolicy']">
//   <i class="fa fa-github"></i>&nbsp;GitHub
export const rootRouterConfig: Routes = [
  { path: '', redirectTo: 'calculator', pathMatch: 'full' },
  {path: 'calculator', component : CalculatorComponent},
  {path:'privacypolicy',component :PrivacyPolicyComponent },
  {path: 'about', component: AboutComponent},
  {path: 'eTaxXML',component:eTaxXMLComponent},
  {path: '', component:CalculatorComponent},
  { path: '**', component: PageNotFoundComponent }    
];

