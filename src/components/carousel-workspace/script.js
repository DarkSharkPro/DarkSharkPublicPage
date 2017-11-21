window.jQuery = $;
require("@fancyapps/fancybox");

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

    $('.workspace__carousel').fancybox({
        loop : true,
        selector: '.workspace__inner',
        buttons: [
            'close'
        ],
        infobar : false,
        spinnerTpl : '<div class="spinner-holder"><div class="spinner"><div class="spinner__bounce1"></div><div class="spinner__bounce2"></div></div></div>'
    })

    // $('.workspace__carousel').lightGallery({
    //     selector: '.workspace__inner',
    //     height: '800px',s
    //     download: false,
    //     counter: false,
    //     thumbnail:false,
    //     nextHtml: '<svg class="icon icon-arrow-r" preserveAspectRatio="xMinYMin"><use xlink:href="#arrow-r"></use></svg>',
    //     prevHtml: '<svg class="icon icon-arrow-l" preserveAspectRatio="xMinYMin"><use xlink:href="#arrow-l"></use></svg>'
    // });
}
