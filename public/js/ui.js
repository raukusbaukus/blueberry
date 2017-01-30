$(window).scroll(function() {
    var scroll = $(window).scrollTop();

    if (scroll >= 100) {
        $('header').addClass('zen');
    } else {
        $('header').removeClass('zen');
    }
});
