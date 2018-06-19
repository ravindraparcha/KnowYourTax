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
        $('.' + window.location.href.substr(window.location.href.indexOf('#') + 2)).trigger('click');
      }, 10);
    });
    $('.nav li, .homeLink, .otherLink').on('click', function () {        
      $('.nav li').removeClass('active');
      if($(this).hasClass('otherLink'))
        return;
      if ($(this).hasClass('homeLink')) {
        $('.homeLink').addClass('active');
      }
      else
        $(this).addClass('active');
    });
  }
}
