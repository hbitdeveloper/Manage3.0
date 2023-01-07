/*
 * @Date: 2022-12-27 10:40:33
 * @LastEditors: Leo
 * @LastEditTime: 2022-12-27 10:42:38
 * @FilePath: \3.0-manger\src\js\components\details-disclosure.js
 * @description: drop-menu
 */
export default class DetailsDisclosure extends HTMLElement {
  constructor() {
    super();
    this.mainDetailsToggle = this.querySelector('details');
    this.mainDetailsToggle.addEventListener('focusout', this.onFocusOut.bind(this));
  }

  onFocusOut() {
    setTimeout(() => {
      if (!this.contains(document.activeElement)) this.close();
    })
  }

  close() {
    this.mainDetailsToggle.removeAttribute('open');
    this.mainDetailsToggle.querySelector('summary').setAttribute('aria-expanded', false);
  }
}

// customElements.define('details-disclosure', DetailsDisclosure);
