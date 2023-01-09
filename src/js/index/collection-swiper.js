/*
 * @Date: 2022-11-24 10:07:30
 * @LastEditors: Leo
 * @LastEditTime: 2023-01-09 10:41:22
 * @FilePath: \3.0-manger\src\js\index\collection-swiper.js
 */
class Slideshow2 {
    constructor(el) {
        this.DOM = {
            el: el
        };
        this.init();
    }
    init() {
        var self = this;
        this.swiperImg = new Swiper(this.DOM.el.querySelector(".slideshow-thumbnail-container"), {
          spaceBetween: 10,
          loop: false,
          slidesPerView: 'auto',
          slidesPerGroup: 1,
          freeMode: true,
          watchSlidesProgress: true,
          direction: "horizontal",
          clickable: true,
          breakpoints: {
              750: {
                direction: "vertical"
              }
          }
        });
        this.slideshow = new Swiper(document.querySelector('.slideshow22222'), {
            speed: 500,
            preloadImages: true,
            updateOnImagesReady: true,
            lazy: true,
            effect: "fade",
            initialSlide: 1,
            scrollbar: {
                el: '.swiper-scrollbar',
            },
            on: {
                init: function () {
                    self.animate('next');
                }
            },
            thumbs: {
              swiper: self.swiperImg
            },
            breakpoints: {
                750: {
                    initialSlide: 0
                }
            }
        });
        this.initEvents();
    }
    initEvents() {
        this.slideshow.on('slideNextTransitionStart', () => this.animate('next'));
        this.slideshow.on('slidePrevTransitionStart', () => this.animate('prev'));

        const this_ = this
        setTimeout(() => {
            $(".slideshow-thumbnail").each(function() {
              $(this).on('mouseenter', function() {
                const index_ = $(this)?.index() || 0
                this_.slideshow.slideTo(index_)
              });
            })
        }, 200);
    }
    animate(direction = 'next') {
        gsap.set(this.DOM.el.querySelectorAll(".slide-content"), {
            opacity: 0
        })
        gsap.set(this.DOM.el.querySelectorAll(".slide-info"), {
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

        gsap.to(this.DOM.activeSlideImg, 1.5, {
            ease: "expo.out",
            startAt: {
                opacity: 1
            },
            x: 0,
        })

        gsap.to(this.DOM.activeSlide.querySelector(".slide-info"), .5, {
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
new Slideshow2(document.querySelector('.slideshow22222'));

export default Slideshow2