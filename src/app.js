// Libraries
import slick from './libs/slick-carousel/slick';
import debounce from 'lodash.debounce';
import throttle from 'lodash.throttle';
import Tooltip from 'tooltip.js';

// Components
import setWorkspaceCarousel from './components/carousel-workspace/script';
import setUnslickCarousel from './components/carousel-simple/script';
import setCenterModeCarousel from './components/carousel-centered/script';
import fileInputMask from './components/input-file/script';
import formHandling from './components/contact-form/script';
import toggleReadMore from './components/vacancy/script';
import lineCVScrollTo from './components/line/script';


setWorkspaceCarousel();
setUnslickCarousel();
setCenterModeCarousel();
fileInputMask();
formHandling();
toggleReadMore();
lineCVScrollTo();


const $navigationLinks = $('.nav__list-link');
const $sections = $($('.js-scroll-to').get().reverse());
const sectionId = {};
const $header = $('.header');
const $hamburger = $('.hamburger');
const $body = $('body');
const $document = $(document);
const $window = $(window);

$window.on('load', function () {
    const preloader = $('.page-preloader');
    preloader.addClass('is-hidden');
});


$navigationLinks.on('click', scrollTo);
$window.on('scroll', addFixedHeader);
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
    if ($(this).scrollTop() > 200) {
        $header.addClass('is-fixed');
    } else {
        $header.removeClass('is-fixed');
        $header.removeClass('slide-up');
    }

    if ($(this).scrollTop() > $('.about').offset().top - 56) {
        $header.removeClass('slide-up');
        $header.addClass('slide-down');
    }

    if ($(this).scrollTop() < $('.about').offset().top - 56 && $header.hasClass('slide-down')) {
        $header.removeClass('slide-down');
        $header.addClass('slide-up');
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

$('.carousel-centered__nav').on('setPosition', function () {
    $(this).find('.slick-slide').height('auto');
    const slickTrack = $(this).find('.slick-track');
    const slickTrackHeight = $(slickTrack).height();
    $(this).find('.slick-slide').css('height', slickTrackHeight + 'px');
});


let tooltip = null;
$window.on('resize', debounce(showTooltip, 200));
$window.on('load', showTooltip);

function showTooltip() {
    const $reward = $('.rewards .carousel-centered__for .slick-slide');
    if (window.innerWidth >= 1024) {
        $reward.off('mouseenter mouseleave');
        $reward.mouseenter(function () {
            const indx = $(this).attr('data-slick-index');
            const $tooltipTitle = $(`.rewards .carousel-centered__description[data-slick-index=${indx}] h4`).text();
            const $tooltipDescr = $(`.rewards .carousel-centered__description[data-slick-index=${indx}] p`).text();

            tooltip = new Tooltip($(this), {
                html: true,
                container: 'body',
                title: `<h4 class="tooltip__title">${$tooltipTitle}</h4><p class="tooltip__text">${$tooltipDescr}</p>`,
                placement: 'bottom-start',
                offset: '0, 30px',
                popperOptions: {
                    onCreate: (data) => {
                        if (data.placement === 'top-start') {
                            $(data.arrowElement).addClass('tooltip-arrow--bottom')
                        }
                    }
                }
            });
        }).mouseleave(function () {
            tooltip.dispose();
            $('.tooltip').remove();
        });
    } else {
        $reward.off('mouseenter mouseleave');
        $('.tooltip').remove();
    }
}

