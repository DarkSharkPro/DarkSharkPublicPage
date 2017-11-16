export default () => {
    $('.carousel-centered__for').each(function(key) {
        const sliderIdName = 'slider' + key;
        const sliderNavIdName = 'sliderNav' + key;
        const sliderArrowNextName = 'arrowNext' + key;
        const sliderArrowPrevName = 'arrowPrev' + key;

        this.id = sliderIdName;
        $('.carousel-centered__nav')[key].id = sliderNavIdName;

        $(this)
            .siblings('.carousel-centered__arrow.next')
            .attr('id', sliderArrowNextName);

        $(this)
            .siblings('.carousel-centered__arrow.prev')
            .attr('id', sliderArrowPrevName);

        const sliderId = '#' + sliderIdName;
        const sliderNavId = '#' + sliderNavIdName;
        const sliderArrowNext = '#' + sliderArrowNextName;
        const sliderArrowPrev = '#' + sliderArrowPrevName;

        $(sliderId).slick({
            slidesToShow: 3,
            centerMode: true,
            centerPadding: 0,
            arrows: true,
            dots: true,
            asNavFor: sliderNavId,
            infinite: true,
            customPaging: function(slider, i) {
                return '<button class="slick-dot"></button>';
            },
            nextArrow: sliderArrowNext,
            prevArrow: sliderArrowPrev,
            mobileFirst: true,
            responsive: [
                {
                    breakpoint: 767,
                    settings: {
                        centerMode: true,
                        dots: false,
                        arrows: true,
                        nextArrow: sliderArrowNext,
                        prevArrow: sliderArrowPrev
                    }
                }
            ]
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