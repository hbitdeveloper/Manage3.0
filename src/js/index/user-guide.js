class UserGuide {
  constructor(el) {
    this.DOM = { el };
    this.config = {};
    this.init();
  }

  init() {
    function tab(li, content) {
      li.forEach((item, index, arr) => {
        item.onclick = () => {
          arr.forEach((v) => { v.classList.remove("on") });
          content.forEach((v) => { v.classList.remove("on") });
          item.classList.add("on");
          content[index].classList.add("on")
        }
      })
    }
    tab(document.querySelectorAll('.pdf .tab li'), document.querySelectorAll('.pdf .tab-content'));
  }
}

const userGuide = new UserGuide();
export default userGuide;
