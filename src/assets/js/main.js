$(document).ready(function() {

  // Portfolio
  var grid = $('.grid').imagesLoaded(function() {
    grid.isotope({
      itemSelector: '.grid-item',
      fitColumns: {
        columnWidth: '.grid-sizer'
      }
    });

    // change .active class on buttons
    $('.button-group').each(function(i, buttonGroup) {

      var $buttonGroup = $(buttonGroup);

      $('.button-group').on('click', '.button', function() {
        
        $buttonGroup.find('.active').removeClass('active');
        $(this).addClass('active');
      });
    });

    // Fix for portfolio item text
    $('.portfolio-text-holder').each(function() {
      var $projectInfo = $(this).find('.project-info');

      $projectInfo.css('margin-top', ($(this).outerHeight() - $projectInfo.outerHeight()) / 2);
    });

    // Fix for portfolio hover text fade in/out
    $('.grid-item a').hover(function() {

      $(this).find('.portfolio-text-holder').fadeIn('fast');
    }, function() {

      $(this).find('.portfolio-text-holder').fadeOut('fast');
    });
  });

  // Fix for default menu
  $('.default-menu ul').addClass('main-menu sm sm-clean');

  // Closing open collapsed navbar when clicking outside in mobile
  $('footer, #content').click(function (e) {

    navbarIconToggle(e);
  });

  $('footer, #content').on('touchstart', function (e) {

    navbarIconToggle(e);
  });  

  // Go top
  var $goTop = $('#gotop');

  $goTop.click(function(){
    $('html, body').animate({ scrollTop: 0 }, 'slow');
  });

  $(window).scroll(function() {

    if ( $(this).scrollTop() > 800){

      $goTop.fadeIn('slow');

    } else {

      $goTop.fadeOut('slow');
    }
  });
});


$(window).on('load', function() {

  // Fix for header menu
  $('.header-menu-mobile').css('margin-top', 0 - $('.header-menu-mobile').innerHeight());

  // Set menu
  $('.main-menu').smartmenus({
    subMenusSubOffsetX: 1,
    subMenusSubOffsetY: -8,
    markCurrentItem: true
  });

  var $mainMenu = $('.main-menu').on('click', 'span.sub-arrow', function(e) {
    var obj = $mainMenu.data('smartmenus');
    if (obj.isCollapsible()) {
      var $item = $(this).parent(),
        $sub = $item.parent().dataSM('sub');
      $sub.dataSM('arrowClicked', true);
    }
  }).bind({
    'beforeshow.smapi': function(e, menu) {
      var obj = $mainMenu.data('smartmenus');
      if (obj.isCollapsible()) {
        var $menu = $(menu);
        if (!$menu.dataSM('arrowClicked')) {
          return false;
        }
        $menu.removeDataSM('arrowClicked');
      }
    }
  });

  // Show-Hide header sidebar
  $('#toggle, .header-hidden-search a').on("click", multiClickFunctionStop);

  // init Isotope (filter button)
  var $grid = $('#projects').isotope();

  // filter items on button click
  $('.filters-button-group').on( 'click', '.filter-button', function() {

    var filterValue = $(this).attr('data-filter');
    $grid.isotope({ filter: filterValue });
  });

  // Fix for post opacity
  $(".blog-item-holder, .post-border").css({ opacity: 1 });

  // loader
  // $('.loader').fadeOut(1000);
});


$(window).resize(function() {

  // Fix for header menu
  if (!$('.header-menu-mobile').hasClass('open')) {

    $(this).css('margin-top', 0 - $('.header-menu-mobile').innerHeight());    
  }

  // Hide header menu when mobile to desktop
  if ($(window).width() > 992) {    

    $('#toggle').removeClass('on');
    $('.header-menu-mobile').css('margin-top', -1000); // -1000 is temporary
  }

  // Fix for portfolio item text
  $('.portfolio-text-holder').each(function() {
    var $projectInfo = $(this).find('.project-info');

    $projectInfo.css('margin-top', ($(this).outerHeight() - $projectInfo.outerHeight()) / 2);
  });
});


// Mobile Header Menu Icon Toggle
var navbarIconToggle = function(e) {

  var $clickTarget = $(e.target);
  var opened = $('#toggle').hasClass('on');

  if (opened === true && !$clickTarget.hasClass('navbar-toggler')) {
    $('.navbar-toggler').click();
    $('#toggle').removeClass('on'); 
  }
}

// Mobile Header Menu Displacement
var multiClickFunctionStop = function(e) {

  var $mobileMenu = $('.header-menu-mobile');
  var $mobileMenuLink = $('#toggle, .header-hidden-search a');
  var displacement = 65;

  e.preventDefault();

  $mobileMenu.css('margin-top', displacement - $mobileMenu.innerHeight());

  $mobileMenuLink.off('click');
  $mobileMenuLink.toggleClass('on');

  if ($mobileMenuLink.hasClass('on')) {
    // $('html, body').animate({ scrollTop: 0 }, 200);

    $mobileMenu.addClass('open').animate({ 'marginTop': displacement }, function() {
      $mobileMenuLink.on('click', multiClickFunctionStop);
    });

  } else {
    $mobileMenu.removeClass('open').animate({ 'marginTop': displacement - $mobileMenu.innerHeight() }, function() {
      $mobileMenuLink.on('click', multiClickFunctionStop);
    });
  }
};
