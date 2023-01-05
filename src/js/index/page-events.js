/*
 * @Date: 2023-01-05 18:12:01
 * @LastEditors: Leo
 * @LastEditTime: 2023-01-05 18:13:38
 * @FilePath: \3.0-manger\src\js\index\page-events.js
 */
import '../../css/pages/page-events.less'

function pageAnimatePagination(swiper, paginationEl) { // 分页动画
    const DOC = paginationEl || document
    let paginationItemsLoader = DOC.querySelectorAll('.pagination-separator-loader');
    let activePaginationItem = DOC.querySelector('.pagination-active');
    let activePaginationItemLoader = activePaginationItem?.querySelector('.pagination-separator-loader');
    gsap.set(paginationItemsLoader, {
        scaleX: 0
    });
    gsap.to(activePaginationItemLoader, 7, {
        startAt: {
            scaleX: 0
        },
        scaleX: 1
    });
}

var page_swiper = new Swiper(".page-banner", {
    loop: true,
    followFinger: false,
    effect: "fade",
    autoplay: {
            delay: 7000,
            disableOnInteraction: false,
    },
    pagination: {
            el: '.page-banner .slideshow-pagination',
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
            init: function (swiper) {
                slide = this.slides.eq(0);
                slide.addClass('ani-slide-top');
            },
            transitionStart: function () {
                for (i = 0; i < this.slides.length; i++) {
                    slide = this.slides.eq(i);
                    slide.removeClass('ani-slide-top');
                }
            },
            transitionEnd: function () {
                slide = this.slides.eq(this.activeIndex);
                slide.addClass('ani-slide-top');
            },
    }
});

page_swiper.on('paginationUpdate', (swiper, paginationEl) => setTimeout(() => {
    this.pageAnimatePagination(swiper, paginationEl)
}, 100));

pageAnimatePagination()

