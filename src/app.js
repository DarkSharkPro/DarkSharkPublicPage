import slick from 'slick-carousel';
import validate from 'jquery-validation';
import debounce from 'lodash.debounce';
import throttle from 'lodash.throttle';
import Tooltip from 'tooltip.js';
import workspaceCarousel from './components/carousel-workspace/script';
import simpleCarousel from './components/carousel-simple/script';
import carouselCentered from './components/carousel-centered/script';
import fileInputMask from './components/input-file/script';


workspaceCarousel();
simpleCarousel();
carouselCentered();
fileInputMask();


const $navigationLinks = $('.nav__list-link');
const $sections = $($('.js-scroll-to').get().reverse());
const sectionId = {};
const $header = $('.header');
const $hamburger = $('.hamburger');
const $body = $('body');
const $document = $(document);
const $window = $(window);


$navigationLinks.on('click', scrollTo);
$window.on('scroll', throttle(addFixedHeader, 200));
$window.on('scroll', throttle(highlightNavigation, 100));
$window.on('resize', debounce(closeMobileNav, 200));
$hamburger.on('click', function() {
    $(this).toggleClass('is-active');
    $body.toggleClass('nav-is-open');
});


function scrollTo(event) {
    const $this = $(this);
    event.preventDefault();

    if ($body.hasClass('nav-is-open')) {
        $body.removeClass('nav-is-open');
        $hamburger.removeClass('is-active');
    }

    const currentBlock = $this.attr('href');
    const offsetTop = $(currentBlock).offset().top;
    $('html, body').stop().animate({
        scrollTop: offsetTop - 55
    }, 800);
}

function addFixedHeader() {
    if ($(this).scrollTop() > $('.about').offset().top - 56) {
        $header.addClass('is-fixed');
    } else {
        $header.removeClass('is-fixed');
    }
}

function closeMobileNav() {
    if ($(this).width() >= 992)
        $body.removeClass('nav-is-open');
        $hamburger.removeClass('is-active');
}


$sections.each(function() {
    const id = $(this).attr('id');
    sectionId[id] = $('.nav__list-link[href="#' + id + '"]');
});

function highlightNavigation() {
    const scrollPosition = $(window).scrollTop();

    $sections.each(function() {
        const currentSection = $(this);
        const sectionTop = currentSection.offset().top;

        if (scrollPosition >= sectionTop - 55) {
            const id = currentSection.attr('id');
            const $navigationLink = sectionId[id];
            if (!$navigationLink.parent().hasClass('is-active') && $navigationLinks.closest('.nav').hasClass('header__nav')) {
                $navigationLinks.parent().siblings().removeClass('is-active');
                $navigationLink.parent().addClass('is-active');
            }
            return false;
        }

        if (scrollPosition <= $('.about').offset().top - 200) {
            $navigationLinks.parent().siblings().removeClass('is-active');
            return false;
        }

        if (scrollPosition + $window.height() >= $document.height()) {
            $navigationLinks.parent().siblings().removeClass('is-active');
            sectionId['contact'].parent().addClass('is-active');
            return false;
        }
    });
}

// $('.form').validate({
//     rules: {
//         username: {
//             required: true
//         },
//         email: {
//             required: true,
//             email: true
//         },
//         message: {
//             required: true
//         }
//     },
//     messages {
//
//     }
// });

$('.form').submit(function(e) {
    e.preventDefault();
    const $form = $(this);
    const data = new FormData($form[0]);
    const $inputs = $('.form__input');
    const $loader = $('.form__loader');
    const $success = $('.form__success');
    const $fail = $('.form__fail');
    const $file = $('.file__name');

    if ( $inputs.hasClass('is-error') ) {
        $inputs.removeClass('is-error');
        $inputs.next('.form__error').remove();
    }

    $form.addClass('is-blur');
    $loader.addClass('is-visible');

    $.ajax({
        type: 'POST',
        url: 'http://localhost:3012/mail',
        data: data,
        cache: false,
        contentType: false,
        processData: false
    }).done(response => {

        $loader.removeClass('is-visible');

        if (response.errors) {
            $form.removeClass('is-blur');
            response.errors.forEach(item => {
                const $input = $(`[name=${item.param}]`);
                $input.addClass('is-error');
                $input.after(`<span class="form__error">${item.msg}</span>`);
            })
        } else {
            $success.addClass('is-visible');

            setTimeout(function () {
                $form.removeClass('is-blur');
                $success.removeClass('is-visible');
                $form[0].reset();
                $file.text('Upload your resume (Optional)');

                $inputs.siblings('.form__label').removeClass('is-focus')
            }, 3000);

        }
    }).fail(error => {
        $loader.removeClass('is-visible');
        $fail.addClass('is-visible');
        setTimeout(function () {
            $form.removeClass('is-blur');
            $fail.removeClass('is-visible');
        }, 2000);
    });
});

const $inputs = $('.form__input');
$inputs.on('input', function () {
    const $this = $(this);
    $this.removeClass('is-error');
    $this.siblings('.form__error').remove();
    $this.siblings('.form__label').addClass('is-focus');
});

$inputs.on('focus', function () {
    const $this = $(this);
    $this.siblings('.form__label').addClass('is-focus');
});

$inputs.on('blur', function () {
    const $this = $(this);
    if ($this.val() === '')
        $this.siblings('.form__label').removeClass('is-focus');
});
