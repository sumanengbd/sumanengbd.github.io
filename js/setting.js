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

	/* Testimonial */
	$('.testimonial_slider').slick({
		autoplay: true,
		arrows: true,
		dots: true,
		draggable: true,
		fade: false,
		infinite: true
	});


	$('.magnific_gallery').each(function(index , value){
	  var gallery = $(this);
	  var galleryImages = $(this).data('links').split(',');
	    var items = [];
	    for(var i=0;i<galleryImages.length; i++){
	      items.push({
	        src:galleryImages[i],
	        title:''
	      });
	    }
	    gallery.magnificPopup({
	      mainClass: 'mfp-fade',
	      items:items,
	      gallery:{
	        enabled:true,
	        tPrev: $(this).data('prev-text'),
	        tNext: $(this).data('next-text')
	      },
	      type: 'image'
	    });
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

	/* Portfolio masonary */
	var m = new Masonry($('.masonry-container').get()[0], {
        itemSelector: ".item"
    });

});	
