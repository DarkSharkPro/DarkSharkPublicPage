import slick from 'slick-carousel';

export default () => {
    $('.rewards__carousel').slick({
        slidesToShow: 3,
        centerMode: true,
        centerPadding: 0,
        arrows: false,
        dots: true,
        asNavFor: '.rewards__text'
    });

    $('.rewards__text').slick({
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        dots: false,
        asNavFor: '.rewards__carousel'
    });
}

