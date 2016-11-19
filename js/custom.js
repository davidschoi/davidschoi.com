(function($) {
  "use strict";

  (function($) {
    $(function() {
      $('#loopedSlider').prepend("<a href='#' class='previous'>&lt;</a><a href='#' class='next'>&gt;</a>");
      $('#loopedSlider').loopedSlider({
        autoHeight: 500
      });
    });
  });

  // for banner height js
  var windowWidth = $(window).width();
  var windowHeight =$(window).height();
  $('.banner').css({'width':windowWidth ,'height':windowHeight -"60" });

  // for portfolio filter jquery
  $(window).load(function(){
    var $container = $('.portfolioContainer');
    $container.isotope({
      filter: '*',
      animationOptions: {
        duration: 750,
        easing: 'linear',
        queue: false
      }
    });

    $('.portfolioFilter a').click(function(){
      $('.portfolioFilter .current').removeClass('current');
      $(this).addClass('current');

      var selector = $(this).attr('data-filter');
      $container.isotope({
        filter: selector,
        animationOptions: {
          duration: 750,
          easing: 'linear',
          queue: false
        }
      });
      return false;
    });
  });

  // for portfolio lightbox jquery
  jQuery(function($) {
    var $chosenSheet,
    $stylesheets = $( "a[id^=theme-]" );

    // run rlightbox
    $(".lb").rlightbox();
    $(".lb_title-overwritten").rlightbox({overwriteTitle: true});
  });

  // for skill chat jquery
  $(document).ready(function(e) {
    var index = 0;
    $(document).scroll(function(){
      var top = $('.technical').height()-$(window).scrollTop();
      if(top < $('.technical').offset().top) {
        if(index==0) {
          $('.chart').easyPieChart({
            easing: 'easeOutBounce',
            onStep: function(from, to, percent) {
              $(this.el).find('.percent').text(Math.round(percent));
            }
          });
        }
        index++;
      }
    })
  });

  // Smooth page scroll
  $(function() {
    $('a[href*=#]:not([href=#])').click(function() {
      if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
        if (target.length) {
          $('html,body').animate({
            scrollTop: target.offset().top -60
          }, 1000);
          return false;
        }
      }
    });
  });

  // chart loading
  $(window).load(function() {
    var chart = window.chart = $('.chart').data('easyPieChart');
    $('.js_update').on('click', function() {
      chart.update(Math.random()*100);
    });
  });

  //jQuery
  $(window).load(function() {
    var theWindow = $(window),
        $bg = $(".bannerImg");

    function resizeBg() {
      if (theWindow.width() < theWindow.height()) {
        $bg.removeClass().addClass('bgheight');
      } else {
        $bg.removeClass().addClass('bgwidth');
      }
    }
    theWindow.resize(resizeBg).trigger("resize");
  });
}(jQuery));