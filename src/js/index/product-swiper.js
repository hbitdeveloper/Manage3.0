/*
 * @Date: 2022-12-05 18:29:39
 * @LastEditors: Leo
 * @LastEditTime: 2023-01-04 13:44:01
 * @FilePath: \3.0-manger\src\js\index\product-swiper.js
 */
class ProductSlideshow {
    constructor(el) {
        this.DOM = {
            el: el
        };
        this.config = {
            slideshow: {
                delay: 15000,
                pagination: {
                    duration: 15,
                }
            }
        };
        this.init();
    }
    init() {
        var self = this;
        this.slideshow = new Swiper(this.DOM.el, {
            loop: true,
            loopAdditionalSlides: 2,
            autoplay: {
                delay: this.config.slideshow.delay,
                disableOnInteraction: false,
            },
            slidesPerView: $(window).width() > 750 ? 'auto' : 0,
            spaceBetween: 0,
            effect: $(window).width() > 750 ? "slide" : "fade",
            centeredSlides: true,
            preloadImages: true,
            updateOnImagesReady: true,
            lazy: true,
            navigation: {
                nextEl: '.slideshow-navigation-button.next',
                prevEl: '.slideshow-navigation-button.prev',
            },
            pagination: {
                el: '.slideshow-pagination',
                clickable: true,
                bulletClass: 'slideshow-pagination-item',
                bulletActiveClass: 'active pagination-active',
                clickableClass: 'slideshow-pagination-clickable',
                modifierClass: 'slideshow-pagination-',
                renderBullet: function (index, className) {
                    var slideIndex = index,
                        number = (index <= 8) ? '0' + (slideIndex + 1) : (slideIndex + 1);

                    var paginationItem = '<span class="slideshow-pagination-item">';
                    paginationItem = (index <= 8) ? paginationItem +
                        '<span class="pagination-separator"><span class="pagination-separator-loader"></span></span>' :
                        paginationItem;
                    paginationItem += '</span>';
                    return paginationItem;
                },
            },
            on: {
                init: function () {
                    self.animate('next');
                },
            }
        });
        this.initEvents();
    }
    initEvents() {
        this.slideshow.on('slideNextTransitionStart', () => this.animate('next'));
        this.slideshow.on('slidePrevTransitionStart', () => this.animate('prev'));
    }
    animate(direction = 'next') {
        gsap.set(this.DOM.el.querySelectorAll(".slide-content"), {
            opacity: 0
        })

        this.DOM.activeSlide = this.DOM.el.querySelector('.swiper-slide-active'),
            this.DOM.activeSlideImg = this.DOM.activeSlide.querySelector('.slide-image'),
            this.DOM.activeSlideTitle = this.DOM.activeSlide.querySelector('.slide-content')
        this.DOM.oldSlide = direction === "next" ? this.DOM.el.querySelector('.swiper-slide-prev') : this
            .DOM.el.querySelector('.swiper-slide-next');
        if (this.DOM.oldSlide) {
            this.DOM.oldSlideTitle = this.DOM.oldSlide.querySelector('.slide-content')
        }

        gsap.to(this.DOM.activeSlideTitle, .5, {
            ease: "power1.out",
            startAt: {
                y: '40px',
                opacity: 0
            },
            y: '0%',
            opacity: 1
        })
    }
}

const Productslideshow = new ProductSlideshow(document.querySelector('.product-slideshow'));

export default ProductSlideshow