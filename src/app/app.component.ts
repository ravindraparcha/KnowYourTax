import { Component, ViewContainerRef, OnInit, NgZone, Renderer, ElementRef, ViewChild } from '@angular/core';
import { Router, RouterEvent, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';
import { slimLoaderBarService } from '../app/modules/shared/services/slimLoaderBarService';
import { NgxSpinnerService } from 'ngx-spinner';
declare var $: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'//,
  //styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  @ViewChild('spinnerElement') spinnerElement: ElementRef;

  constructor(private router: Router,
    private ngZone: NgZone,
    private renderer: Renderer, private _slimLoaderBarService: slimLoaderBarService,
    private spinner: NgxSpinnerService) {
    router.events.subscribe((event: RouterEvent) => {
      this._navigationInterceptor(event);
    });
   
  } 
  ngAfterViewInit() {
    $("document").ready(function () {
      setTimeout(function () {
        $('.' + window.location.href.substr(window.location.href.indexOf('#') + 2)).trigger('click');
      }, 1000);
    });
    $('.navbar-nav li, .homeLink, .otherLink').on('click', function () {
      debugger;
      $('.navbar-nav li').removeClass('active');
      if ($(this).hasClass('otherLink'))
        return;
      if ($(this).hasClass('homeLink')) {
        $('.homeLink').addClass('active');
      }
      else
        $(this).addClass('active');
    });
  }
  // Shows and hides the loading spinner during RouterEvent changes
  private _navigationInterceptor(event: RouterEvent): void {
    debugger;
    this._slimLoaderBarService.completeLoading();
    if (event instanceof NavigationStart) {
      // Run this function outside of Angular's zone to
      // bypass change detection
      this.ngZone.runOutsideAngular(() => {
        this._slimLoaderBarService.startLoading();
        this.spinner.show();
      })
    }
    if (event instanceof NavigationEnd) {
      this._hideLoadingBar();
    }
    if (event instanceof NavigationCancel) {
      this._hideLoadingBar();
    }
    if (event instanceof NavigationError) {
      this._hideLoadingBar();
    }
  }

  private _hideLoadingBar(): void {
    //Run this function outside of Angular's zone to
    //bypass change detection,
    this.ngZone.runOutsideAngular(() => {
      this._slimLoaderBarService.completeLoading();
      this.spinner.hide();
    })
  }

}
