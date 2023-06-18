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

    if (document.getElementById('imageLoad')) {
        setImageUrl();
    }

    /*** Call Sly on frame */
    $('.slyslider__wrapper').each(function(i, l) {

    	var $sly_frame = $(this),
    	    $slide = $sly_frame.children('.slyslider').eq(0),
    	    $sly_wrap  = $sly_frame.parent();

    	    console.log($sly_wrap.find('.prev'));

    	$(this).sly({
    		smart: 1,
    		speed: 300,
    		horizontal: 1,
    		mouseDragging: 1,
    		releaseSwing: 1,
    		touchDragging: 1,
    		itemNav: 'basic',
    		scrollBy: 1,
    		clickBar: 1,
    		swingSpeed: 0.2,
    		elasticBounds: 1,
    		dragHandle: 1,
    		dynamicHandle: 1,
    		sbSize: 80,
    		activateMiddle: 1,
    		easing: 'easeOutExpo',
    		pagesBar: $sly_wrap.find('.slyslider__pages'),
    		scrollBar: $sly_wrap.find('.slyslider__scrollbar'),
    		prev: $sly_wrap.find('.prev'),
    		next: $sly_wrap.find('.next'),
    	});
    });

    /*** wow js */
    function wowjs() {
    	wow = new WOW({
    		boxClass: 'wow',
    		animateClass: 'animate__animated',
    		offset: 0,
    		mobile: true,
    		live: true,
    	});
    	wow.init();
    }

    wowjs();

    /*** mixitup load for search */
	var notMatching = $('.notmatching');
	var containerEl = $('.protfolioFilter');

	if ( containerEl.length > 0 ) {

		var conv = function(str) {
			if (!str) {
				str = 'none';
			}

			return str.replace(/[!\"#$%&'\(\)\*\+,\.\/:;<=>\?\@\[\\\]\^`\{\|\}~]/g, '')
				.replace(/ /g, "-")
				.toLowerCase()
				.trim();
		};

		// Creating dynamic elements classes from its categories:
		var catArray = $('.portfolio__item');

		catArray.each(function (index, elem) {
		    var text = $(elem).text();
		    var className = conv(text);

		    if (/^[0-9]/.test(className)) {
		      //className = "m" + className;
		      console.log("GOT IT");
		    }

		    $(elem).parent().addClass(className);
		});


		var filterGroups = document.querySelectorAll('.filter-group');
			filterGroups.forEach(function(group) {
			group.setAttribute('data-filter-group', '');
		});

		var mixer = mixitup(containerEl, {
			multifilter: {
	          	enable: true // enable the multifilter extension for the mixer
	        },
			animation: {
				enable: false,
				duration: 350,
				queueLimit: 5,
			},
			controls: {
				toggleLogic: 'and',
			},
			selectors: {
				target: '.mix'
			},
			callbacks: {
				onMixStart: function(state, futureState) {
	   	        	wowjs();
	                notMatching.fadeOut();
	   	        	jQuery.LoadingOverlay("show");
	   	        },
	   	        onMixEnd: function(state, futureState) {
	   	        	wowjs();

	                notMatching.fadeOut();
	   	        	jQuery.LoadingOverlay("hide");
	   	        },
	   	        onMixFail: function(state) {
	                notMatching.fadeIn();
	            }
			}
		});
	}

}(jQuery));