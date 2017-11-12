export default () => {
    $('.hamburger').on('click', function() {
        $(this).toggleClass('is-active');
        $('body').toggleClass('nav-is-open');
    });
}
