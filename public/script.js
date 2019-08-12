$(window).on('load', function() {
    $('.preloader').fadeOut('slow');
     })
 

$(function() {
    var header = $("#nav");
    var liColor = $(".nav_links");
    liColor.addClass("nav_link_white");
    $(window).scroll(function() {
        var scroll = $(window).scrollTop();

        if (scroll >= 100) {
            header.removeClass('nav-transparent').addClass("nav-colored");
            liColor.removeClass('nav_link_white').addClass("nav_link_black");
        } else {
            header.removeClass("nav-colored").addClass('nav-transparent');
            liColor.removeClass('nav_link_black').addClass("nav_link_white");
        }
    });
});