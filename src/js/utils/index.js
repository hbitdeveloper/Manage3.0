/*
 * @Date: 2022-12-28 09:58:32
 * @LastEditors: Leo
 * @LastEditTime: 2023-01-07 15:45:27
 * @FilePath: \3.0-manger\src\js\utils\index.js
 */
export function debounce(fn, wait) {
    let t;
    return (...args) => {
        clearTimeout(t);
        t = setTimeout(() => fn.apply(this, args), wait);
    };
}


const trapFocusHandlers = {};

export function getFocusableElements(container) {
    return Array.from(
        container.querySelectorAll(
            "summary, a[href], button:enabled, [tabindex]:not([tabindex^='-']), [draggable], area, input:not([type=hidden]):enabled, select:enabled, textarea:enabled, object, iframe"
        )
    );
}

export function trapFocus(container, elementToFocus = container) {
    var elements = getFocusableElements(container);
    var first = elements[0];
    var last = elements[elements.length - 1];

    removeTrapFocus();

    trapFocusHandlers.focusin = (event) => {
        if (
            event.target !== container &&
            event.target !== last &&
            event.target !== first
        )
            return;

        document.addEventListener('keydown', trapFocusHandlers.keydown);
    };

    trapFocusHandlers.focusout = function () {
        document.removeEventListener('keydown', trapFocusHandlers.keydown);
    };

    trapFocusHandlers.keydown = function (event) {
        if (event.code.toUpperCase() !== 'TAB') return; // If not TAB key
        // On the last focusable element and tab forward, focus the first element.
        if (event.target === last && !event.shiftKey) {
            event.preventDefault();
            first.focus();
        }

        //  On the first focusable element and tab backward, focus the last element.
        if (
            (event.target === container || event.target === first) &&
            event.shiftKey
        ) {
            event.preventDefault();
            last.focus();
        }
    };

    document.addEventListener('focusout', trapFocusHandlers.focusout);
    document.addEventListener('focusin', trapFocusHandlers.focusin);

    elementToFocus.focus();
}

export function removeTrapFocus(elementToFocus = null) {
    document.removeEventListener('focusin', trapFocusHandlers.focusin);
    document.removeEventListener('focusout', trapFocusHandlers.focusout);
    document.removeEventListener('keydown', trapFocusHandlers.keydown);

    if (elementToFocus) elementToFocus.focus();
}

/*
    指定容器下 - autoplay video
    el - video 父元素
*/ 
export function autoplayVideo(el) {
    let video = el.querySelector('iframe[src*="www.youtube.com"], iframe[src*="player.vimeo.com"], video');
    if (!video) return;
    
    if (video.tagName.toLowerCase() === 'video') {
      video.play();
      return;
    }
    video.src = video.src + (video.src.indexOf('?') < 0 ? '?' : '&') + 'autoplay=1';
}
/*
    指定容器下 - stop video
    el - video 父元素
*/ 
export function stopVideo(el) {
    let video = el.querySelector('iframe[src*="www.youtube.com"], iframe[src*="player.vimeo.com"], video');
    if (!video) return;

    if (video.tagName.toLowerCase() === 'video') {
      video.pause();
      return;
    }
    video.src = video.src.replace('&autoplay=1', '').replace('?autoplay=1', '');
}