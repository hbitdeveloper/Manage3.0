/*
 * @Date: 2022-12-07 16:21:06
 * @LastEditors: Leo
 * @LastEditTime: 2022-12-13 18:14:09
 * @FilePath: \shopify3.0\src\js\index\index-support.js
 */
class IndexSupport {
    constructor(el) {
        this.DOM = {
            el: el
        };
        this.config = {};
        this.init();
    }
    init() {
        var $colContainer = $('.col-container');
        var colEase = $(window).width() > 750 ? "power1.out" : "none";
        var easeTime = $(window).width() > 750 ? 0.3 : 0.25

        const eventsName = $(window).width() > 750 ? 'mouseenter' : 'click'
        if($(window).width() > 750) {
            gsap.set($colContainer[0], {
                flex: 1,
                alignItems: 'flex-start',
                padding: '1.04167vw 1.5625vw 1.5625vw 1.5625vw'
            }, 0)
            gsap.set($colContainer.find('img')[0], {
                width: '4.6875vw',
                height: '4.6875vw',
                marginBottom: '0'
            }, 0)
        } else {
            gsap.set($colContainer[0], {
                height: 'auto'
            }, 0)
            gsap.set($colContainer.find('.jackery-icon-arrow-right')[0], {
                transform: 'rotate(-90deg)'
            }, 0)
        }
        gsap.set($colContainer.find('.support-content')[0], {
            display: 'block',
            opacity: 1,
            height: $colContainer.find('.support-content span')[0].offsetHeight + 'px'
        }, 0)

        $colContainer.each(function (index) {
            index !== 0 && gsap.set($colContainer.find('.support-content')[index], {
                display: 'none',
                opacity: 0,
                height: 0
            }, 0)
            $(this).on(eventsName, function () {
                var $thisContainer = $(this);
                
                if($(window).width() > 750) {
                    gsap.to($thisContainer.find('.support-content'), easeTime, {
                        display: 'block',
                        opacity: 1,
                        height: 'auto'
                    }, 0);
                    gsap.to($thisContainer, 0.3, {
                        flex: 1,
                        alignItems: 'flex-start',
                        padding: '1.04167vw 1.5625vw 1.5625vw 1.5625vw',
                        ease: colEase,
                        backgroundColor: '#DEDEDE'
                    }, 0);

                    gsap.to($thisContainer.find('img'), 0.3, {
                        width: '4.6875vw',
                        height: '4.6875vw',
                        marginBottom: '0'
                    }, 0);

                    gsap.to($colContainer.not($thisContainer), 0.3, {
                        flex: 0,
                        alignItems: 'center',
                        padding: '3.75vw 0.83333vw 1.5625vw 0.83333vw',
                        ease: colEase,
                        backgroundColor: '#E8E8E8'
                    }, 0);

                    gsap.to($colContainer.not($thisContainer).find('img'), 0.3, {
                        width: '5.20833vw',
                        height: '5.20833vw',
                        marginBottom: '1.82292vw'
                    }, 0);
                } else {
                    const activeH = $thisContainer.find('.support-content span').height() || 150
                    gsap.to($thisContainer, 0.3, {
                        height: 'auto',
                        ackgroundColor: '#DEDEDE'
                    }, 0)

                    gsap.set($thisContainer.find('.jackery-icon-arrow-right')[0], {
                        transform: 'rotate(-90deg)'
                    }, 0)

                    gsap.to($thisContainer.find('.support-content'), easeTime, {
                        display: 'block',
                        opacity: 1,
                        height: activeH + 'px'
                    }, 0);

                    gsap.set($colContainer.not($thisContainer).find('.jackery-icon-arrow-right'), {
                        transform: 'rotate(90deg)'
                    }, 0)
                }


                gsap.to($colContainer.not($thisContainer).find('.support-content'), easeTime, {
                    display: $(window).width() > 750 ? 'none' : 'block',
                    // opacity: 0,
                    height: 0
                }, 0);
            })
        });
    }
}
new IndexSupport()
export default IndexSupport