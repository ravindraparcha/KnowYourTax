import { Routes } from '@angular/router';
import {CalculatorComponent} from './services/calculator/calculator.component'
// import { AboutComponent } from './about/about.component';
// import { HomeComponent } from './home/home.component';
// import { RepoBrowserComponent } from './github/repo-browser/repo-browser.component';
// import { RepoListComponent } from './github/repo-list/repo-list.component';
// import { RepoDetailComponent } from './github/repo-detail/repo-detail.component';
// import { ContactComponent } from './contact/contact.component';
// import {ServiceComponent} from './service/service.component';

// { path: '',
//     redirectTo: '/heroes',
//     pathMatch: 'full'
//   },
//   { path: '**', component: PageNotFoundComponent }  


export const rootRouterConfig: Routes = [
  { path: '', redirectTo: 'calculator', pathMatch: 'full' },
  {path: 'calculator', component : CalculatorComponent}
   

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

