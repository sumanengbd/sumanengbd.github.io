// VARS
// =================================================
var pageSlider, canvas, context, canvasWidth, canvasHeight, $days, $hours, $minutes, $seconds, defaultTitle;
var screenW = $(window).width();
var screenH = $(window).height();
var mobileMax = 767;
var pageIndex = 0;
var isMobile = function() { return (screenW <= mobileMax)};
var launchDate = new Date("12/01/2016 5:00 PM");

// FUNCTIONS 
// =================================================
function showPageLoader() {
  $('.page-loader').show(); 
  $('.page-loader .anim').show();
}
function hidePageLoader() {
  $('.page-loader .anim').fadeOut(); 
  $('.page-loader').delay(350).fadeOut();
}
function getHashOnly(str) {
  if(stringHas(str, "?")) {
    return str.split("?")[0]; // default format
  } else if(stringHas(str, "/")) {
    return str.split("/")[0]; // alternative format
  }
  else {
    return str;
  }
}
function setActivePage() {
  if(window.location.hash) {
    var hash = getHashOnly(window.location.hash);
    var $page = $(hash);
    var title;
    
    if($page.length > 0) {
      pageIndex = $page.index();
      title = $page.data("title") || defaultTitle;    
    }
  }
}

var units = { d:86400000, h:3600000, m:60000, s:1000 };	

function countDown() {
  var now = new Date();
  var diff = launchDate - now;

  if(diff < 0) {
    clearInterval(timer);
  } else {
    var days = Math.floor(diff / units.d);
    var hours = Math.floor(diff % units.d / units.h);
    var mins = Math.floor(diff % units.h / units.m);
    var secs = Math.floor(diff % units.m / units.s);
    $days.html(days);
    $hours.html(hours);
    $minutes.html(mins);
    $seconds.html(secs);
  }
}

function getUrlParams(url) {
  var str  = url.split("?")[1];
  var search = /([^&=]+)=?([^&]*)/g;
  var match;
  var params = {};
  
  while(match = search.exec(str)) {
    params[match[1]] = match[2];
  }
  return params;    
}

// WIN LOAD
// =================================================
$(window).load(function() {
  initCanvas();
  defaultTitle = $("title").html(); 
})

// INIT CANVAS
// =================================================
function initCanvas() {
  canvas = document.getElementById('homeCanvas');
  context = canvas.getContext('2d');
  canvas.width = canvasWidth = pageSlider.options.width;
  canvas.height = canvasHeight = pageSlider.options.height;
  if(typeof renderCanvas != "undefined") renderCanvas(canvas, context);
}

// WIN RESIZE
// =================================================
$(window).resize(function(e) {
  screenW = $(window).width();
  screenH = $(window).height();
});

// DOC READY
// ================================================= 
$(document).ready(function() {

  // SET ACTIVE PAGE
  // -------------------------------------------------
  setActivePage();

  // PAGE SLIDER
  // -------------------------------------------------  
  pageSlider = $("#pages").polySlider({
    userNS:'page-', 
    // ^^ we change the class name space to avoid conflicts with nested sliders
    // thus .poly-layer becomes .page-layer etc
    showLoader:false, 
    nav:false, 
    activeIndex:pageIndex, 
    width:'100%', 
    height:'100%', 
    keyNav:false, 
    swipeNav:false,
    pager:false, 
    nav: false,
    onLoad: afterLoad,
  });
  
  function afterLoad() {
    hidePageLoader();
    if(pageSlider) {
      canvas.width = canvasWidth = pageSlider.options.width;
      canvas.height = canvasHeight = pageSlider.options.height; 
      if(typeof renderCanvas != "undefined") renderCanvas(canvas, context);
      
    }
  }

 
  // PAGE LINKS
  // -------------------------------------------------
  $("[data-page]").on("click", function(e) {
    e.preventDefault();
    
    // Init vars
    var $page, pageIndex,pageHash, pageTitle;
    // Grab page vars
    var href = $(this).attr("href");
    var dataPage = $(this).attr("data-page");
    var dataEffect = $(this).attr("data-effect");

    // Grab page hash
    if(dataPage == "href") {
      pageHash = href;
    } else {
      pageHash = dataPage;
    }

    // Slide page
    $page = $(pageHash);
    pageTitle = $page.data("title") || defaultTitle;
    pageIndex = $page.index();
    console.log(pageIndex);
    if(pageIndex == -1) return;
    pageIndex = pageIndex;
    pageSlider.goToSlide(pageIndex, dataEffect);
    // Update history
    window.location.hash = pageHash;    
    $("title").html(pageTitle);
  });
  
  // TIMER
  // -------------------------------------------------
  $days = $("#days");
  $hours = $("#hours");
  $minutes = $("#minutes");
  $seconds = $("#seconds");
  
  var timer = setInterval(countDown, 1000);
  
  // CANVAS 
  initCanvas();
});




  
