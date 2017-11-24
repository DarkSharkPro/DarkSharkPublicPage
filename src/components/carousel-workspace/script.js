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
                breakpoint: 1023,
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
        spinnerTpl : '<div class="spinner-holder"><div class="spinner"><div class="spinner__bounce1"></div><div class="spinner__bounce2"></div></div></div>',
        mobile : {
            clickContent : function( current, event ) {
                return current.type === 'image' ? 'close' : false;
            },
            clickSlide : function( current, event ) {
                return current.type === 'image' ? 'close' : false;
            }
        }
    })
}
