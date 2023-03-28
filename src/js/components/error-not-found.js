class ErrorNotFound extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }
  static get observedAttributes() {
    return ['message',];
  }
  attributeChangedCallback(attr, oldValue, newValue) {
    if (oldValue !== newValue) {
      this[attr] = newValue;
    }
  }
  getTemplate() {
    const template = document.createElement('template');
    template.innerHTML = `
      <img src="/notfound-illustration.svg"/>
      <h2>Sorry!</h2>
      <p>${this.message}</p>
      ${this.getStyle()}
    `;
    return template;
  }
  getStyle() {
    return `
      <style>
        :host{
          display:block;
        }
        h2{
          text-align:center;
        }
        p{
          text-align: center;
        }
        img{
          width: 80%;
          position: relative;
          left: 50%;
          transform: translateX(-50%);
        }
      </style>
    `;
  }
  render() {
    this.shadowRoot.appendChild(this.getTemplate().content.cloneNode(true));
  }
  connectedCallback() {
    this.render();
  }
}
customElements.define('error-not-found', ErrorNotFound);
