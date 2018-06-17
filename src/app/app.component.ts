import { Component, ViewContainerRef, OnInit } from '@angular/core';
declare var $:any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'//,
  //styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit {
  title = 'app';

   
  ngOnInit() {
    
    

    $(window).scroll(function () {
      var stickyNavTop = $('#navbar-header').offset().top;
      if ($(window).scrollTop() > stickyNavTop) {
        $('#navbar-header').addClass('fixed');
      }
      else {
        $('#navbar-header').removeClass('fixed');
      }
    });
  }
}
