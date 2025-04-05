/*----------------
  [JS Index]
------------------

  1. Navigation & Button Click Scroll
    1.0 Smooth Scroll
    1.1 Mobile Menu
    1.2 Back to Top Scroll & show/hide
  2. Sticky Header
  3. Food Menu Tab
*/

(function($) {
  "use strict";

  /*----------------------------------
    1. Navigation & Button Click Scroll
  -----------------------------------*/
  // 1.0 Smooth Scroll
  $('.js-scroll-btn').on('click', function(e) {
    e.preventDefault();
    $('html, body').animate({scrollTop: $( $.attr(this, 'href') ).offset().top - 71}, 1200, 'easeInOutExpo');
  });

  $(function(){
    var contentSection = $('section');
    var navigation = $('nav');
    
    navigation.on('click', 'a', function(event){
      event.preventDefault();
      smoothScroll($(this.hash));
    });
    
    $(window).on('scroll', function(){
      updateNavigation();
    })

    updateNavigation();
    
    function updateNavigation(){
      contentSection.each(function(){
        var sectionName = $(this).attr('id');
        var navigationMatch = $('a[href="#' + sectionName + '"]');
        if( ($(this).offset().top - $(window).height()/10 < $(window).scrollTop()) &&
            ($(this).offset().top + $(this).height() - $(window).height()/10 > $(window).scrollTop())){
            navigationMatch.addClass('current-menu-item');
          }else {
          navigationMatch.removeClass('current-menu-item');
        }
      });
    }
    function smoothScroll(target){
      $('body,html').animate({
        scrollTop: target.offset().top - 100
      }, 1200, 'easeInOutExpo');
    }
  });

  // 1.1 Mobile Menu
  function toggleHamburger() {
    $(".js-hamburger-trgr,.c-hamburger").toggleClass("opend");
  }

  $(".js-hamburger-trgr").on("click tap", function() {
    toggleHamburger();
  });

  $(".s-hamburger-menu li a").on("click tap", function() {
    $(".js-hamburger-trgr,.c-hamburger").removeClass("opend");
  });

  $(document).keyup(function(e) {
    if (e.keyCode === 27) {
      toggleHamburger();
    }
  });

  $('.js-hamburger-trgr,.c-search__wrap form,.js-search-trgr').on('click', function (e) {
    e.stopPropagation();
  });

  // 1.2 Back to Top Scroll & show/hide
  $(".u-back-top").hide();
  $('.u-back-top').on('click', function(event) {
    $('body,html').animate({scrollTop:0},800);
    return false;
  });

  $(window).on('scroll', function() {
    if($(this).scrollTop()>$('#hero').outerHeight()){
      $('.u-back-top').fadeIn();
    }
    else{
      $('.u-back-top').fadeOut();
    }
  });

  /*------------------------------
    3. Sticky Header
  ------------------------------*/
  var defaults = {
    topOffset: $('#hero').outerHeight(), 
    hideDuration: 600, 
    stickyClass: "is-fixed"
  };

  $.fn.stickyPanel = function(options) {
    if (this.length == 0) return this; 

    var self = this,
    settings,
    isFixed = false, 
    stickyClass,
    animation = {
      normal: self.css("animationDuration"), 
      reverse: "", 
      getStyle: function(type) {
        return {
          animationDirection: type,
          animationDuration: this[type]
        };
      }
    };

    function init() {
      settings = $.extend({}, defaults, options);
      animation.reverse = settings.hideDuration + "ms";
      stickyClass = settings.stickyClass;
      $(window)
        .on("scroll", onScroll)
        .trigger("scroll");
    }

    function onScroll() {
      // if(window.pageYOffset >$('#hero').outerHeight()){
      if (window.pageYOffset > settings.topOffset) {
        if (!isFixed) {
          isFixed = true;
          self.addClass(stickyClass).css(animation.getStyle("normal"));
        }
      } else {
        if (isFixed) {
          isFixed = false;

          self
            .removeClass(stickyClass)
            .each(function(index, e) {

              void e.offsetWidth;
            })
            .addClass(stickyClass)
            .css(animation.getStyle("reverse"));

          setTimeout(function() {
            self.removeClass(stickyClass);
          }, settings.hideDuration);
        }
      }
    }

    init();

    return this;
  };

  jQuery(function() {
    jQuery("#header,.c-hamburger__trgrs").stickyPanel();
  });

  /*------------------------------
    Food Menu Tab
  ------------------------------*/
  $('.c-menu-tabs__nav a').click(function() {
    // Check for active
    $('.c-menu-tabs__nav a, .c-menu-tabs__content-box').removeClass('active');
    $(this).addClass('active');

    // Display active tab
    let currentTab = $(this).attr('href');
    $('.c-menu-tabs__content-box').hide();
    $(currentTab).show();

    return false;
  });

  /*------------------------------
    Lightcase/lightbox
  ------------------------------*/
  jQuery('a[data-rel^=lightcase]').lightcase({
    maxWidth: '1500px'
  });

  /*------------------------------
    Slick Slider
  ------------------------------*/
  // Image Slider
  jQuery('.js-image-slider').slick({
    autoplay: false,
    dots: false,
    arrows: true,
    infinite: false,
    pauseOnHover: true,
    pauseOnFocus: false,
    speed: 900,
    rows: 0,
    autoplaySpeed: 5000,
    prevArrow: jQuery('#image-slider-prev'),
    nextArrow: jQuery('#image-slider-next')
    // easing: 'easeOutBounce',
  });

  // Testimonial Carousel
  jQuery('.js-testimonials-slider').slick({
    autoplay: false,
    dots: false,
    arrows: true,
    infinite: false,
    pauseOnHover: true,
    pauseOnFocus: false,
    speed: 900,
    autoplaySpeed: 5000,
    slidesToShow: 3,
    slidesToScroll: 1,
    rows: 0,
    prevArrow: jQuery('#testimonials-prev'),
		nextArrow: jQuery('#testimonials-next'),
    // easing: 'easeOutBounce',
    responsive: [
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 1
        }
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2
        }
      }
    ]
  });

  // Blog Modal Image Carousel
  jQuery('.js-blog-modal-slider').slick({
    autoplay: false,
    dots: false,
    arrows: true,
    infinite: true,
    pauseOnHover: true,
    pauseOnFocus: false,
    speed: 900,
    rows: 0,
    autoplaySpeed: 5000,
    slidesToShow: 2,
    slidesToScroll: 1,
    prevArrow: jQuery('#blog-modal-slider-prev'),
    nextArrow: jQuery('#blog-modal-slider-next'),
    // easing: 'easeOutBounce',
    responsive: [
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 1
        }
      }
    ]
  });

 /*------------------------------
    Food Counter
  ------------------------------*/
  var stop = $("#our-story").offset().top;
  
  $(window).on('scroll', function() {
    if ($(window).scrollTop() > stop ) {
      $(window).off("scroll");
      $('.c-food-counter__item strong').each(function () {
          var $this = $(this);
          jQuery({ Counter: 0 }).animate({ Counter: $this.attr("data") }, {
              duration: 1200,
              easing: 'swing',
              step: function () {
                  $this.text(Math.ceil(this.Counter));
              }
          });
      });
    }
  });

 /*------------------------------
    Owl Carousel
  ------------------------------*/
  // Menu Carousel
  jQuery('.js-owl-menu-carousel').owlCarousel({
    animateIn: 'slideIntRight',
    animateOut: 'slideOutLeft',
    autoplay: false,
    loop:true,
    autoplayTimeout:5000,
    autoplaySpeed: 2000,
    margin:0,
    items:3,
    slideBy: 1,
    dots: false,
    nav:true,
    responsiveClass:true,
    autoplayHoverPause:true,
    responsive:{
      0:{
        animateOut: 'flipOutY',
        animateIn: 'flipInY',
        items: 1
      },
      767:{
        items: 2
      },
      1024:{
          items: 2
      },
      1025:{
          items: 3
      }
    }
  });

  // Team Members Carousel
  jQuery('.js-owl-members-carousel').owlCarousel({
    animateIn: 'slideInRight',
    animateOut: 'slideOutLeft',
    autoplay: false,
    loop:true,
    autoplayTimeout:5000,
    autoplaySpeed: 1500,
    margin:0,
    items:3,
    slideBy: 1,
    dots: false,
    nav:true,
    responsiveClass:true,
    autoplayHoverPause:true,
    responsive:{
      0:{
        animateIn: 'flipInY',
        animateOut: 'flipOutY',
        items:1
      },
      767:{
        items:2
      },
      1024:{
        items:2
      },
      1025:{
        items:3
      }
    }
  });

 /*------------------------------
    Photo Gallery Isotop
  ------------------------------*/
  $('.c-food-gallery__grid').isotope({
    itemSelector: '.c-food-gallery__grid-item',
    percentPosition: true,
    masonry: {
      columnWidth: '.grid-sizer'
    }
  }); 

 /*------------------------------
    Blog Modal
  ------------------------------*/
  $('.js-modal-trigger,.js-modal-close-trigger').on('click', function(e) {
    e.preventDefault();
    $('body,.c-blog-modal').toggleClass('is-visible');

    return false;
  });

  /*------------------------------
    Load Animation
  ------------------------------*/
  var controller = new ScrollMagic.Controller();
  var $animationElements = jQuery('.wow.wow-visible');
    
  TweenMax.set($animationElements, {y:60});
  TweenMax.set($animationElements, {opacity:0});

  jQuery(window).on('load', function($){
    // jQuery('.u-tweenmax-image').each(function(){
    //   var $tweenMaxImage = jQuery(this);
    //   var tweenMaxImageWidth = $tweenMaxImage.outerWidth();
    //   var tweenMaxImageHeight = $tweenMaxImage.outerHeight();
      
    //   TweenMax.set($tweenMaxImage,{clip:"rect("+tweenMaxImageHeight+"px "+Math.round(tweenMaxImageWidth)+"px "+tweenMaxImageHeight+"px 0px)"});
      
    //   var currentScreen = this;
    //   var featuredPostScene = new ScrollMagic.Scene({
    //     triggerElement: currentScreen,
    //     triggerHook: 0.9,
    //     reverse: false
    //   })
    //   .on('start', function(){
    //     var $handler = jQuery(this.triggerElement());
        
    //     TweenMax.to($tweenMaxImage,0.9,{clip:"rect(0px "+tweenMaxImageWidth+"px "+tweenMaxImageHeight+"px 0px)",delay:0.3, ease:Power3.easeOut,clearProps:"clip"});
    //   })
    //   .addTo(controller);
    // }); 

    jQuery('.wow.wow-visible').each(function(){
      var currentScreen = this;
      var animationScene = new ScrollMagic.Scene({
        triggerElement: currentScreen,
        triggerHook: 1,
        reverse: false
      })
      .on('start', function(){
        var $handler = jQuery(this.triggerElement());
        var itemDelay = 0.2;
        
        itemDelay = $handler.data('delay');
        
        TweenMax.to($handler, 0.8, {y:0, ease:Power2.easeOut, delay: itemDelay});
        TweenMax.to($handler, 0.9, {opacity:1, ease:Power2.easeOut, delay: itemDelay});
      })
      .addTo(controller);
    }); 

    // preloader
    jQuery('.u-preloader').delay(2000).addClass('loaded');
  });	


/* -- End JS -- */
})(jQuery);






