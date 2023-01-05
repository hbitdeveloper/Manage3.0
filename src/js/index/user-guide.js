import videoSlideshow from "./video-swiper"

class UserGuide {
  constructor(el) {
    this.DOM = { el };
    this.config = { pdf: null, maintenance: null, video: null };

    document.addEventListener('DOMContentLoaded', () => {
      this.pdf();
      this.maintenance();
      this.faq();
      this.video()
    })
  }

  $$(entity) {
    return entity ? document.querySelector(entity) : null
  }

  all(entity) {
    // return entity ? document.querySelectorAll(entity) : []
    return entity ? $(entity).get() : []
  }

  tab(li, content, search) {
    li.forEach((item, index, arr) => {
      item.onclick = () => {
        arr.forEach((v) => { v.classList.remove("on") });
        content.forEach((v) => { v.classList.remove("on") });
        item.classList.add("on");
        content[index].classList.add("on");
        search && search()
      }
    })
  }

  pdf() {
    const me = this;
    let DOM = null;

    function tabContent(ul, data) {
      let li = "";
      const download = me.$$(".tab-content li a").innerText;
      data.forEach((item) => {
        li += `<li>
          <i class="img-icon iconfont jackery-icon-pdf"></i>
          <b class="h5">${item.file_name}</b>
          <a class="a-button h5" href="${item.link}"><i class="iconfont jackery-icon-download"></i>${download}</a>
        </li>`;
      })
      ul.innerHTML = li;
    }
    function search() {
      const input = DOM.querySelector(".search-box input");
      const { type } = DOM.querySelector(".tab li.on").dataset;
      if (input.value) {
        tabContent(DOM.querySelector(`.tab-content.${type}`), me.config.pdf[type].filter((v) => new RegExp(input.value).test(v.file_name)))
      } else {
        tabContent(DOM.querySelector(`.tab-content.${type}`), me.config.pdf[type])
      }
    }

    me.config.pdf = JSON.parse(document.querySelector("#user-guide-json").innerText);
    DOM = document.querySelector(".manuals.pdf");

    me.tab(me.all('.pdf .tab li'), me.all('.pdf .tab-content'), search);
    DOM.querySelector(".search-box button").onclick = () => search()
  }

  maintenance() {
    const me = this;

    function modal(data, _class, db) {
      const m = document.createElement('aside');
      m.className = `yModal ${_class || ""}`;
      m.innerHTML = `
        <i class="mask"></i>
        <div class="y-modal-body">
          <svg class="icon icon-close" viewBox="0 0 64 64"><path d="M19 17.61l27.12 27.13m0-27.12L19 44.74"></path></svg>
          <img src="${data.image}" alt="${data.title}">
          <div class="content">
            <h4>${data.title}</h4>
            ${data.content}
          </div>
        </div>
      `;
      document.body.appendChild(m);

      me.$$(".yModal .icon-close").onclick = me.$$(".yModal .mask").onclick = () => {
        document.body.removeChild(m);
        db && db()
      }
    }
    function learn(el, type) {
      el.forEach((item, index) => {
        item.querySelector("button").onclick = () => { modal(me.config.maintenance[type][index]) }
      })
    }

    me.config.maintenance = JSON.parse(me.$$("#product-maintenance").innerText);

    me.tab(me.all('.maintenance .tab li'), me.all('.maintenance .tab-content'));

    learn(me.all(".maintenance .tab-content.pps li"), "pps");
    learn(me.all(".maintenance .tab-content.sp li"), "sp")
  }

  faq() {
    const me = this;
    me.tab(me.all('.faq .tab li'), me.all('.faq .tab-content'));
  }

  video() {
    const me = this;
    let DOM = null;

    function search() {
      const input = DOM.querySelector(".search-box input");
      const { type } = DOM.querySelector(".tab li.on").dataset;
      const data = input.value ? me.config.video[type].filter((v) => new RegExp(input.value).test(v.title)) : me.config.video[type];
      console.log(data);

      // 先销毁原先的video swiper
      videoSlideshow.destroy(() => {
        let html = "";
        data.forEach((item) => {
          html += `
          <div class="swiper-slide slide" block-id="${item.id}" block-src="${item.video_url}">
            <video data-dps-name="default_" name="media" muted="" loop="" class="slide-video pc-block">
              <source data-layzr-src="${item.video_url}" type="video/mp4; codecs=&quot;avc1.4D401E, mp4a.40.2&quot;" src="${item.video_url}">
            </video>
            <div class="slide-image mobile-block" style="background-image: url(${item.video_pic})"></div>
            <div class="slide-content absolute">
              <span class="slide-title h3">${item.title}</span>
              <a class="slide-link h5 underlines-btn" href="${item.link}">${item.link_text}<span class="iconfont jackery-icon-arrow-right"></span></a>
            </div>
            <div class="absolute mobile-block video-swiper-play" data-modal="#s${item.id}">
              <span class="iconfont jackery-icon-24gl-playCircle"></span>
            </div>
          </div>
          `;
          me.$$(".manuals.video .video-slideshow .swiper-wrapper").innerHTML = html
        })
      });

      videoSlideshow.init()
    }

    me.config.video = JSON.parse(document.querySelector("#user-guide-video").innerText);
    DOM = document.querySelector(".manuals.video");

    me.all('.manuals.video .tab li').forEach((item, index, arr) => {
      item.onclick = () => {
        arr.forEach((v) => { v.classList.remove("on") });
        item.classList.add("on");
        search()
      }
    });
    DOM.querySelector(".search-box button").onclick = () => search()
  }
}

const userGuide = new UserGuide();
export default userGuide;
