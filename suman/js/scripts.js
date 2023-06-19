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
		var portfolioItem = document.querySelectorAll('.portfolio__item');

		portfolioItem.forEach(function(elem, index) {
			var text = elem.textContent;
			var className = conv(text);

			if (className.match(/[0-9]/)) {
				console.log("GOT IT");
			}

			// Replace spaces, numbers, new lines, and hyphens with spaces
			className = className.replace(/[\s0-9\n-]/g, ' ').trim().replace(/\s+/g, ' ');

			var words = className.split(' ');

			// Add each word as a separate class
			words.forEach(function(word) {
				elem.parentNode.classList.add(word);
			});
		});

		var mixer = mixitup(containerEl, {
			multifilter: {
	          	enable: true,
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
				target: '.mix',
			},
			callbacks: {
				onMixStart: function(state, futureState) {
	   	        	wowjs();
	                notMatching.fadeOut();
	   	        	jQuery.LoadingOverlay("show");

	   	        	console.log('onMixStart: '+ futureState.activeFilter.selector);
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

		// Function to append list items
		const appendListItems = () => {
			const selectValue = document.getElementById('type');
			const inputValue = document.getElementById('search');
			const ul = document.getElementById('currentFilters');

			ul.innerHTML = '';

			if (inputValue.value) {
				const li = document.createElement('li');

				li.setAttribute('data-value', inputValue.value);
				li.classList.add('current-filters__item');

				li.textContent = 'Key: ' + inputValue.value;
				ul.appendChild(li);
			}

			if (selectValue.value) {
				const selectedOption = document.querySelector('#type option:checked');
				const li = document.createElement('li');

				li.setAttribute('data-value', selectedOption.value);
				li.classList.add('current-filters__item');

				li.textContent = 'Type: ' + selectedOption.textContent;
				ul.appendChild(li);
			}

			updateListVisibility();
		};

		// Function to update list visibility
		const updateListVisibility = () => {
			const ul = document.getElementById('currentFilters');
			const resetButton = document.getElementById('resetButton');

			ul.style.display = ul.children.length > 0 ? 'block' : 'none';
			resetButton.style.display = ul.children.length > 0 ? 'block' : 'none';
		};

		document.getElementById('type').addEventListener('change', appendListItems);
		document.getElementById('search').addEventListener('input', appendListItems);

		document.getElementById('resetButton').addEventListener('click', () => {
			document.getElementById('currentFilters').innerHTML = '';
			updateListVisibility();
		});

		document.getElementById('currentFilters').addEventListener('click', function(event) {
			if (event.target && event.target.nodeName === 'LI') {
				const state = mixer.getState();
			    const activeFilter = state.activeFilter;
				const listItemValue = event.target.getAttribute('data-value');

				event.target.remove();

				if (document.querySelector('#type option:checked').value === listItemValue) {
					// Remove mixer filter value
					mixer.setFilterGroupSelectors('type', []);

					// Remove Select Value
					document.getElementById('type').value = '';
				}

				if (document.getElementById('search').value === listItemValue) {
					// Remove mixer filter value
					mixer.setFilterGroupSelectors('key', []);

					// Remove Input Value
					document.getElementById('search').value = '';
				}

				// Refresh mixitup
			    mixer.parseFilterGroups();

				updateListVisibility();
			}
		});
	}

    $('.gallery-popup').magnificPopup({
 		delegate: 'a.popup',
 		type: 'image',
 		midClick: true,
 		preloader: false,
 		fixedBgPos: true,
 		removalDelay: 500,
 		fixedContentPos: true,
 		closeBtnInside: false,
 		gallery: {
	        enabled: true,
	        navigateByImgClick: true,
	        preload: [0,1]
	    },
	    image: {
	    	titleSrc: function(item) {
	    		var title = item.el.attr('title') ? '<h5 class="title">' + item.el.attr('title') + '</h5>' : '';
	    		var description = item.el.attr('description') ? item.el.attr('description') : '';

	    	    return title + description;
	    	}
	    },
 		callbacks: {
 		    beforeOpen: function() {
 		        this.st.image.markup = this.st.image.markup.replace('mfp-figure', 'mfp-figure mfp-with-anim');
 		        this.st.mainClass = this.st.el.attr('data-effect');
 		    },
 		    buildControls: function() {
      // re-appends controls inside the main container
      this.contentContainer.append(this.arrowLeft.add(this.arrowRight));
    }
 		},
 		closeMarkup: '<button title="Close (Esc)" type="button" class="mfp-close">Close<span class="icon-cance"></span></button>',
    });

}(jQuery));