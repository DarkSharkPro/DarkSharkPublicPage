import slickLightbox from '../../libs/slick-lightbox/slick-lightbox.min';

export default () => {
    $('.workspace__carousel').slick({
        slidesToShow: 1,
        arrows: true,
        dots: false,
        mobileFirst: true,
        nextArrow: $('.workspace__arrow.next'),
        prevArrow: $('.workspace__arrow.prev'),
        responsive: [
            {
                breakpoint: 420,
                settings: {
                    slidesToShow: 2
                }
            },
            {
                breakpoint: 991,
                settings: {
                    slidesToShow: 4
                }
            }
        ]
    });

    $('.workspace__carousel').slickLightbox({
        src: 'src',
        itemSelector: '.workspace__inner img'
    });
}
