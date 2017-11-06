export default () => {
    $('.carousel-centered__for').each(function(key) {

        const sliderIdName = 'slider' + key;
        const sliderNavIdName = 'sliderNav' + key;

        this.id = sliderIdName;
        $('.carousel-centered__nav')[key].id = sliderNavIdName;

        const sliderId = '#' + sliderIdName;
        const sliderNavId = '#' + sliderNavIdName;

        $(sliderId).slick({
            slidesToShow: 3,
            centerMode: true,
            centerPadding: 0,
            arrows: false,
            dots: true,
            asNavFor: sliderNavId,
            customPaging: function(slider, i) {
                return '<span class="slick-dot"></span>';
            }
        });

        $(sliderNavId).slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
            dots: false,
            asNavFor: sliderId
        });
    });
}
