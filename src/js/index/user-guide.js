class UserGuide {
  constructor(el) {
    this.DOM = { el };
    this.config = { pdf: null, maintenance: null };
    this.pdf();
    this.maintenance();
    this.faq()
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
          <a class="h5" href="${item.link}"><i class="iconfont jackery-icon-download"></i>${download}</a>
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

    document.addEventListener('DOMContentLoaded', () => {
      me.config.pdf = JSON.parse(document.querySelector("#user-guide-json").innerText);
      DOM = document.querySelector(".manuals.pdf");

      me.tab(me.all('.pdf .tab li'), me.all('.pdf .tab-content'), search);
      DOM.querySelector(".search-box button").onclick = () => search()
    })
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

    document.addEventListener('DOMContentLoaded', () => {
      me.config.maintenance = JSON.parse(me.$$("#product-maintenance").innerText);

      me.tab(me.all('.maintenance .tab li'), me.all('.maintenance .tab-content'));

      learn(me.all(".maintenance .tab-content.pps li"), "pps");
      learn(me.all(".maintenance .tab-content.sp li"), "sp");
    })
  }

  faq() {
    const me = this;
    document.addEventListener('DOMContentLoaded', () => {
      me.tab(me.all('.faq .tab li'), me.all('.faq .tab-content'));
    })
  }
}

const userGuide = new UserGuide();
export default userGuide;
