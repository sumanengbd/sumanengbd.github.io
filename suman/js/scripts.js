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
	const body = document.body;
	const scrollUp = "scroll-up";
	const scrollDown = "scroll-down";
	let lastScroll = 100;

	window.addEventListener("scroll", () => {
		// Header addClass
		if (document.body.scrollTop > 0 || document.documentElement.scrollTop > 0) {
		  document.querySelector(".header").classList.add("stop");
		} else {
		  document.querySelector(".header").classList.remove("stop");
		}

		// Body addClass
	  	const currentScroll = window.pageYOffset;

	  	if (currentScroll <= 0) {
	    	body.classList.remove(scrollUp);
	    	return;
	  	}

	  	if (currentScroll > lastScroll && !body.classList.contains(scrollDown)) {
	    	body.classList.remove(scrollUp);
	    	body.classList.add(scrollDown);
	  	} else if ( currentScroll < lastScroll && body.classList.contains(scrollDown) ) {
	    	body.classList.remove(scrollDown);
	    	body.classList.add(scrollUp);
	  	}

	  	lastScroll = currentScroll;

	  	// Sidr Menu Close Scroll
	  	if (document.body.scrollTop > 0 || document.documentElement.scrollTop > 0) {
	  	  	$.sidr('close', 'sidr-main');
	  	}
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

	function addSwipeFunctionality() {
	    var screenWidth = window.innerWidth || document.documentElement.clientWidth;
	  
	    if (screenWidth < 768) {
	        $('body').swipe({
	            swipeLeft: function() {
	                $.sidr('open', 'sidr-main');
	            },
	            swipeRight: function() {
	                $.sidr('close', 'sidr-main');
	            },
	            threshold: 45
	        });
	    }
	}

	window.addEventListener('load', addSwipeFunctionality);
	window.addEventListener('resize', addSwipeFunctionality);


	/*** Dropdown */
	function sumanMobileMenu() {
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

	sumanMobileMenu();

	/*** Header height = gutter height */
	function setGutterHeight() {
	    var header = document.querySelector('.header');
	    var gutter = document.querySelector('.header-gutter');
	    
	    if (gutter) {
	        gutter.style.height = header.offsetHeight + 'px';
	    }
	}

	window.addEventListener('load', setGutterHeight);
	window.addEventListener('resize', setGutterHeight);

	/*** lastNobullet */
	function lastNobullet() {
	    var lastElement = null;
	    var lbNoneList = document.querySelectorAll(".lb-none li");

	    lbNoneList.forEach(function(item) {
	        if (lastElement && lastElement.offsetTop !== item.offsetTop) {
	            if (lastElement.classList) {
	                lastElement.classList.add("nb");
	            }
	        } else {
	            if (lastElement) {
	                lastElement.classList.remove("nb");
	            }
	        }
	        lastElement = item;
	    });

	    if (lbNoneList.length > 0 && lbNoneList[lbNoneList.length - 1].classList) {
	        lbNoneList[lbNoneList.length - 1].classList.add("nb");
	    }
	}

	window.addEventListener("load", function() {
	    lastNobullet();

	    window.addEventListener("resize", function() {
	        lastNobullet();
	    });
	});

	// Banner Image Load
	const albumID = '9tUzkubVAE7jNH1w9';
    const getImageUrl = async () => {
        const response = await axios.get(
            `https://google-photos-album-demo2.glitch.me/${albumID}`
        );
        const photos = response.data;
        const randomPhotoIndex = Math.floor(Math.random() * photos.length);
        return photos[randomPhotoIndex] + "=w1200";
    };

    const setImageUrl = async () => {
        const imageLoad = document.getElementById("imageLoad");
        const imgElement = imageLoad.getElementsByTagName("img")[0];
        const imageUrl = await getImageUrl();

        console.log(imageUrl);

        if ( imageUrl !== 'undefined=w1200' ) {

	        $(imageLoad).LoadingOverlay("show"); // Show loading overlay

	        const img = document.createElement('img');
	        imageLoad.appendChild(img);

	        imgElement.addEventListener("load", () => {
	            $(imageLoad).LoadingOverlay("hide"); // Hide loading overlay

	            // Set the image's alt text once it has fully loaded
	            imgElement.alt = "Suman Ali - Full Stack Web Developer";
	        });

	        imgElement.src = imageUrl;
        }
    };

    setImageUrl();


}(jQuery));