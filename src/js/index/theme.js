/*
 * @Date: 2022-11-26 17:10:31
 * @LastEditors: Leo
 * @LastEditTime: 2023-01-07 17:23:30
 * @FilePath: \3.0-manger\src\js\index\theme.js
 */
import $ from 'jquery'
import '../../css/theme.less'

window.jQuery = window.$ = $
__webpack_public_path__ = window.__webpack_public_path__;

// Modals
(function (e, t) {
    "function" == typeof define && define.amd ? define([], t(e)) : "object" == typeof exports ? module
        .exports = t(e) : e.modals = t(e)
})("undefined" != typeof global ? global : this.window || this.global, (function (e) {
    "use strict";
    var t, o, n, l = {},
        c = "querySelector" in document && "addEventListener" in e && "classList" in document
        .createElement("_"),
        r = "closed",
        d = {
            selectorToggle: "[data-modal]",
            selectorWindow: "[data-modal-window]",
            selectorClose: "[data-modal-close]",
            modalActiveClass: "active",
            modalBGClass: "modal-bg",
            preventBGScroll: !0,
            preventBGScrollHtml: !0,
            preventBGScrollBody: !0,
            backspaceClose: !0,
            stopVideo: !0,
            callbackOpen: function () {},
            callbackClose: function () {}
        },
        a = function () {
            var e = {},
                t = !1,
                o = 0,
                n = arguments.length;
            "[object Boolean]" === Object.prototype.toString.call(arguments[0]) && (t = arguments[0],
                o++);
            for (; o < n; o++) {
                var l = arguments[o];
                !(function (o) {
                    for (var n in o) Object.prototype.hasOwnProperty.call(o, n) && (t &&
                        "[object Object]" === Object.prototype.toString.call(o[n]) ? e[n] = a(!
                            0, e[n], o[n]) : e[n] = o[n])
                })(l)
            }
            return e
        },
        s = function (e, t) {
            for (Element.prototype.matches || (Element.prototype.matches = Element.prototype
                    .matchesSelector || Element.prototype.mozMatchesSelector || Element.prototype
                    .msMatchesSelector || Element.prototype.oMatchesSelector || Element.prototype
                    .webkitMatchesSelector || function (e) {
                        for (var t = (this.document || this.ownerDocument).querySelectorAll(e), o = t
                                .length; --o >= 0 && t.item(o) !== this;);
                        return o > -1
                    }); e && e !== document; e = e.parentNode)
                if (e.matches(t)) return e;
            return null
        },
        i = function (e, t) {
            if (t.stopVideo && e.classList.contains(t.modalActiveClass)) {
                var o = e.querySelector("iframe"),
                    n = e.querySelector("video");
                if (o) {
                    var l = o.src;
                    o.src = l
                }
                n && n.pause()
            }
        },
        u = function () {
            var e = document.createElement("div");
            e.style.visibility = "hidden", e.style.width = "100px", e.style.msOverflowStyle =
                "scrollbar", document.body.appendChild(e);
            var t = e.offsetWidth;
            e.style.overflow = "scroll";
            var o = document.createElement("div");
            o.style.width = "100%", e.appendChild(o);
            var n = o.offsetWidth;
            return e.parentNode.removeChild(e), t - n
        },
        m = function () {
            if (!document.querySelector("[data-modal-bg]")) {
                var e = document.createElement("div");
                e.setAttribute("data-modal-bg", !0), e.classList.add(n.modalBGClass), document.body
                    .appendChild(e)
            }
        },
        p = function () {
            var e = document.querySelector("[data-modal-bg]");
            e && document.body.removeChild(e)
        };
    l.closeModal = function (e) {
        var t = a(n || d, e || {}),
            l = document.querySelector(t.selectorWindow + "." + t.modalActiveClass);
        l && (i(l, t), l.classList.remove(t.modalActiveClass), p(), r = "closed", t
            .preventBGScroll && (document.documentElement.style.overflowY = "", document.body
                .style.overflowY = "", document.body.style.paddingRight = ""), t.callbackClose(
                o, l), o && (o.focus(), o = null))
    }, l.openModal = function (e, c, s) {
        var i = a(n || d, s || {}),
            u = document.querySelector(c);
        "open" === r && l.closeModal(i), e && (o = e), u.classList.add(i.modalActiveClass), m(), r =
            "open", u.setAttribute("tabindex", "-1"), u.focus(), i.preventBGScroll && (i
                .preventBGScrollHtml && (document.documentElement.style.overflowY = "hidden"), i
                .preventBGScrollBody && (document.body.style.overflowY = "hidden"), document.body
                .style.paddingRight = t + "px"), i.callbackOpen(e, u)
    };
    var v = function (e, t, o) {
            if (o) return e.removeEventListener("touchstart", a, !1), e.removeEventListener("touchend",
                s, !1), void e.removeEventListener("click", i, !1);
            if (t && "function" == typeof t) {
                var n, l, c, r, d, a = function (e) {
                        n = !0, l = e.changedTouches[0].pageX, c = e.changedTouches[0].pageY
                    },
                    s = function (e) {
                        r = e.changedTouches[0].pageX - l, d = e.changedTouches[0].pageY - c, Math.abs(
                            r) >= 7 || Math.abs(d) >= 10 || t(e)
                    },
                    i = function (e) {
                        if (n) return void(n = !1);
                        t(e)
                    };
                e.addEventListener("touchstart", a, !1), e.addEventListener("touchend", s, !1), e
                    .addEventListener("click", i, !1)
            }
        },
        f = function (e) {
            var t = e.target,
                o = s(t, n.selectorToggle),
                c = s(t, n.selectorClose),
                d = s(t, n.selectorWindow),
                a = e.keyCode;
            if (a && "open" === r)(27 === a || n.backspaceClose && (8 === a || 46 === a)) && l
                .closeModal();
            else if (t) {
                if (d && !c) return;
                !o || a && 13 !== a ? "open" === r && (e.preventDefault(), l.closeModal()) : (e
                    .preventDefault(), l.openModal(o, o.getAttribute("data-modal"), n))
            }
        };
    return l.destroy = function () {
        n && (v(document, null, !0), document.removeEventListener("keydown", f, !1), document
            .documentElement.style.overflowY = "", document.body.style.overflowY = "", document
            .body.style.paddingRight = "", t = null, o = null, n = null)
    }, l.init = function (e) {
        c && (l.destroy(), n = a(d, e || {}), t = u(), v(document, f), document.addEventListener(
            "keydown", f, !1))
    }, l
}));
