import debounce from 'lodash.debounce';

export default () => {
    $('.carousel').on('destroy', function(ev, slick) {
        let carousel = $(this),
            reinit = debounce(function() {
                if (slick.activeBreakpoint < window.innerWidth) return;
                carousel.slick(slick.options);
                window.removeEventListener('resize', reinit);
            }, 100);
        window.addEventListener('resize', reinit);
    }).slick({
        slidesToShow: 1,
        arrows: false,
        dots: true,
        mobileFirst: true,
        customPaging: function(slider, i) {
            return '<button class="slick-dot"></button>';
        },
        responsive: [
            {
                breakpoint: 479,
                settings: {
                    slidesToShow: 2
                }
            },
            {
                breakpoint: 767,
                settings: "unslick"
            }
        ]
    });
}