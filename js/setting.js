$(document).ready(function() {

	"use strict";

	$(window).scroll(function() {

		if ($(window).scrollTop() > 50) {
			$(".main_menu").addClass("tiny");
		} 
		else {
			$(".main_menu").removeClass("tiny");
		}
	});

	/* Smooth scroll */
	$(function() {
	  $('.smoothScroll, .smoothScroll>a').click(function() {
	    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
	      var target = $(this.hash);
	      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
	      if (target.length) {
	        $('html,body').animate({
	          scrollTop: target.offset().top
	        }, 1000);
	        return false;
	      }
	    }
	  });
	});

});	
