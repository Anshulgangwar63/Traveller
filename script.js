$(function() {
    //caches a jQuery object containing the header element
    var header = $("#nav");
    var liColor = $(".nav_links");
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