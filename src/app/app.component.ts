import { Component, ViewContainerRef, OnInit } from '@angular/core';

declare var $: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'//,
  //styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';

  ngOnInit() {
    $("document").ready(function () {
      setTimeout(function () {
        let navItemClass = window.location.href.substr(window.location.href.indexOf('#') + 2);
        $('.' + navItemClass).trigger('click');
      }, 10);
    });
    $('.nav li, .homeLink').on('click', function () {      
      $('.nav li').removeClass('active');
      if ($(this).attr('href') == '#' || $(this).attr('href')=='#/calculator') {
        $('.homeLink').addClass('active');
      }
      else
        $(this).addClass('active');
    });
  }
}
