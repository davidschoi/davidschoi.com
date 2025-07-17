(function($) {
  "use strict";

  // initialize loopedSlider on page load
  $(function() {
    $('#loopedSlider').prepend("<a href='#' class='previous'>&lt;</a><a href='#' class='next'>&gt;</a>");
    $('#loopedSlider').loopedSlider({
      autoHeight: 500
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
  // $(function($) {
  //   var $chosenSheet,
  //   $stylesheets = $( "a[id^=theme-]" );

  //   // run rlightbox
  //   $(".lb").rlightbox();
  //   $(".lb_title-overwritten").rlightbox({overwriteTitle: true});
  // });

  // for skill chart jquery
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

  //Experience
  function getExperienceMessage(startYear) {
    const currentYear = new Date().getFullYear();
    const years = currentYear - startYear;
    return `${years} year${years !== 1 ? 's' : ''}`;
  }

  const skills = [
    { name: 'JavaScript', startYear: 2012, proficiency: 90 },
    { name: 'CSS/Sass', startYear: 2012, proficiency: 90 },
    { name: 'HTML', startYear: 2012, proficiency: 90 },
    { name: 'React.js', startYear: 2017, proficiency: 90 },
    { name: 'TypeScript', startYear: 2016, proficiency: 80 },
    { name: 'Next.js', startYear: 2018, proficiency: 80 },
    { name: 'Styled Components', startYear: 2016, proficiency: 80 },
    { name: 'Node.js', startYear: 2016, proficiency: 70 },
    { name: 'GraphQL', startYear: 2017, proficiency: 60 }
  ];

  $(document).ready(function() {
    const $skillsContainer = $('#skillsContainer');

    skills.forEach(skill => {
      const experienceMessage = getExperienceMessage(skill.startYear);
      const skillHTML = `
        <div class="col-sm-4 skillsArea">
          <div class="skills"> 
            <span class="chart skillBg" data-percent="${skill.proficiency}"> 
              <span class="percent"></span> 
            </span>
            <h4>${skill.name}</h4>
            <p>${experienceMessage}</p>
          </div>
        </div>
      `;
      $skillsContainer.append(skillHTML);
    });
  });
}(jQuery));
