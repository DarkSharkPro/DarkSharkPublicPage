export default () => {
    $('.line__button').on('click', function(event) {
        event.preventDefault();
        const $form = $('.form');
        const offsetTop = $form.offset().top;
        $('html, body').stop().animate({
            scrollTop: offsetTop - 55
        }, 800);
        $form.find('[name=username]').focus();
    });
}