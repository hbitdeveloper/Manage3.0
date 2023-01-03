class UserGuide {
  constructor(el) {
    this.DOM = { el };
    this.config = { pdf: null };
    this.installPdf();
  }

  installPdf() {
    const me = this;
    const DOM = document.querySelector(".manuals.pdf");

    function tabContent(ul, data) {
      let li = "";
      const download = document.querySelector(".tab-content li a").innerText;
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
        tabContent(DOM.querySelector(`.tab-content .${type}`), me.config.pdf[type].filter((v) => new RegExp(input.value).test(v.file_name)))
      } else {
        tabContent(DOM.querySelector(`.tab-content .${type}`), me.config.pdf[type])
      }
    }
    function tab(li, content) {
      li.forEach((item, index, arr) => {
        item.onclick = () => {
          arr.forEach((v) => { v.classList.remove("on") });
          content.forEach((v) => { v.classList.remove("on") });
          item.classList.add("on");
          content[index].classList.add("on");
          search()
        }
      })
    }

    document.addEventListener('DOMContentLoaded', () => {
      me.config.pdf = JSON.parse(document.querySelector("#user-guide-json").innerText);
      tab(document.querySelectorAll('.pdf .tab li'), document.querySelectorAll('.pdf .tab-content'));

      DOM.querySelector(".search-box button").onclick = () => search()
    })
  }
}

const userGuide = new UserGuide();
export default userGuide;
