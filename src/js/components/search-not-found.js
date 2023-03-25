class SearchNotFound extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }
  static get observedAttributes() {
    return ['text',];
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
      <p>The country <code>${this.text}</code> was not found in our database.</p>
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
customElements.define('search-not-found', SearchNotFound);
