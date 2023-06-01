(function ($) {
	var ua = window.navigator.userAgent;
	var isIE = /MSIE|Trident/.test(ua);

	if ( !isIE ) {
		//IE specific code goes here
		"use strict";
	}

	/** Adobe typekit font */
	try{Typekit.load({ async: true });}catch(e){};

	/*** Sticky header */
	$(window).scroll(function(){
		if($("body").scrollTop() > 0 || $("html").scrollTop() > 0) {
			$(".header").addClass("stop");
		} else {
			$(".header").removeClass("stop");
		}
	});

	/*** Sticky header */
	const body = document.body;
	const scrollUp = "scroll-up";
	const scrollDown = "scroll-down";
	let lastScroll = 100;

	window.addEventListener("scroll", () => {
	  	const currentScroll = window.pageYOffset;
	  	if (currentScroll <= 0) 
	  	{
	    	body.classList.remove(scrollUp);
	    	return;
	  	}

	  	if (currentScroll > lastScroll && !body.classList.contains(scrollDown)) 
	  	{
	    	// down
	    	body.classList.remove(scrollUp);
	    	body.classList.add(scrollDown);
	  	} 
	  	else if ( currentScroll < lastScroll && body.classList.contains(scrollDown) ) 
	  	{
	    	// up
	    	body.classList.remove(scrollDown);
	    	body.classList.add(scrollUp);
	  	}

	  	lastScroll = currentScroll;
	});

    /*** Navbar Menu */
	$('.navbar-toggle').sidr({
		name: 'sidr-main',
		side: 'right',
		source: '#sidr',
		displace: true,
		renaming: false,
		onOpen: function() {
			$('.header').css({
				'left': 'auto', 
				'right': '300px', 
				'transition' : 'right 0.2s ease 0s'
			});

			$('.navbar-toggle').addClass('in');
		},
		onClose: function() {
			$('.header').css({
				'right': '', 
				'transition' : 'right 0.2s ease 0s'
			});

			$('.navbar-toggle').removeClass('in');
		},
		onCloseEnd: function() {
			$('.header').css({
				'right': '', 
				'left': '',
				'transition' : ''
			});

			$('.navbar-toggle').removeClass('in');
		}
	});

	$('body').swipe( {
        swipeLeft: function () {
            $.sidr('open', 'sidr-main');
        },
        swipeRight: function () {
            $.sidr('close', 'sidr-main');
        },
        threshold: 45
    });

	$(window).scroll(function(){
		if($("body").scrollTop() > 0 || $("html").scrollTop() > 0) {
			$.sidr('close', 'sidr-main');
		}
	});

	function goingClearMobileMenu() {
	    var $nav = $(".navbar-mobile"),
	        $back_btn = $nav.find(" > li.dropdown > ul.dropdown-menu").prepend("<li class='dropdown-back'><div class='control'>Back<span class='icon-arrow-right'></span></div></li>");

	    // For Title
	    $('.navbar-mobile li.dropdown > a').each(function(){
	        $(this).siblings("ul").find("li.dropdown-back").prepend("<div class='title'><a>" + $(this).text() +"</a></div>");
	    });

	    // open sub-level
	    $('.navbar-mobile li.dropdown > a .dropdown-toggle').on("click", function(e) {
	        e.preventDefault();
	        e.stopPropagation();

	        $(this).parent().parent().addClass("is-open");
	        $(this).parents().find( '.navbar-mobile' ).addClass("is-parent");

	        var header = $(this).parent().parent().find('ul.dropdown-menu').height(),
	            gutter = $('.gc-mobile-nav');

	        if ( gutter ) 
	        {
	            gutter.height(header);
	        }
	    });

	    // go back
	    $back_btn.on("click", ".dropdown-back", function(e) {
	        e.stopPropagation();
	        $(this)
	        .parents(".is-open")
	        .first()
	        .removeClass("is-open");

	        var header = $(this).parents(".is-parent").first().height();

	        $(this)
	        .parents(".is-parent")
	        .first()
	        .removeClass("is-parent");

	        var gutter = $('.gc-mobile-nav');

	        setTimeout(function() {
	            if (gutter) {
	                gutter.height(header);
	            } 
	        }, 200);
	    });
	}

	goingClearMobileMenu();

	/*** Header height = gutter height */
	function setGutterHeight() {
		var header = document.querySelector('.header'),
			  gutter = document.querySelector('.header-gutter');
		if (gutter) {
			gutter.style.height = header.offsetHeight + 'px';
		}
	}
	window.onload = setGutterHeight;
	window.onresize = setGutterHeight;

	/*** lastNobullet */
	function lastNobullet() {
	    var lastElement = false;
	    $(".lb-none li").each(function() {
	        if (lastElement && lastElement.offset().top != $(this).offset().top) {
	            $(lastElement).addClass("nb");
	        } else {
	            $(lastElement).removeClass("nb");
	        }
	        lastElement = $(this);
	    }).last().addClass("nb");
	};
	lastNobullet();

	$(window).resize(function(){
	    lastNobullet();
	});

}(jQuery));