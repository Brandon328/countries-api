class CountryTag extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }
  static get observedAttributes() {
    return ['name'];
  }
  attributeChangedCallback(attr, oldValue, newValue) {
    if (oldValue !== newValue) {
      this[attr] = newValue;
    }
  }
  getTemplate() {
    const template = document.createElement('template');
    template.innerHTML = `
      <input type="button" value="${this.name}">
      ${this.getStyle()}
    `;
    return template;
  }
  getStyle() {
    return `
      <style>
        input{
          background-color: var(--dark-mode-text-and-light-mode-elements);
          padding: 10px 20px;
          border: none;
          cursor: pointer;
          box-shadow: 1px 3px 6px 2px rgba(115, 115, 115, 0.15);
          width: auto;
          border-radius: 4px;
          color: #6f6f6f;
          transform: scale(1);
          transition: .4s transform;
        }
        :host(:hover) input{
          transform: scale(1.1);
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
customElements.define('country-tag', CountryTag);
