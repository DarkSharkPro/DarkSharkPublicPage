export default () => {
    $('.carousel').slick({
        slidesToShow: 1,
        arrows: false,
        dots: true,
        mobileFirst: true,
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
        ],
        customPaging: function(slider, i) {
            return '<button class="slick-dot"></button>';
        }
    });
}