import { Routes } from '@angular/router';
import {CalculatorComponent} from './services/calculator/calculator.component';
import{PageNotFoundComponent} from './services/pageNotFound/pageNotFound.component';
 

// { path: '',
//     redirectTo: '/heroes',
//     pathMatch: 'full'
//   },
//   { path: '**', component: PageNotFoundComponent }  


export const rootRouterConfig: Routes = [
  { path: '', redirectTo: 'calculator', pathMatch: 'full' },
  {path: 'calculator', component : CalculatorComponent},
  {path: '', component:CalculatorComponent},
  { path: '**', component: PageNotFoundComponent }  

  // { path: 'home', component: HomeComponent },
  // { path: 'about', component: AboutComponent },
  // { path: 'github', component: RepoBrowserComponent,  
  //   children: [
  //     { path: '', component: RepoListComponent },
  //     { path: ':org', component: RepoListComponent,
  //       children: [
  //         { path: '', component: RepoDetailComponent },
  //         { path: ':repo', component: RepoDetailComponent }
  //       ]
  //     }]
  // },
  // { path: 'contact', component: ContactComponent },
  // {path: 'service',component :ServiceComponent}
];

