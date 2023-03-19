class CountryCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }
  static get observedAttributes() {
    return ['flag', 'name', 'population', 'region', 'capital'];
  }
  attributeChangedCallback(attr, oldValue, newValue) {
    if (oldValue !== newValue) {
      this[attr] = newValue;
    }
  }
  getTemplate() {
    const template = document.createElement('template');
    template.innerHTML = `
      <img src="${this.flag}" alt="${this.name} flag">
      <div>
        <h2>${this.name}</h2>
        <p>
          <b>Population: </b><span>${this.population}</span>
        </p>
        <p>
          <b>Region: </b><span>${this.region}</span>
        </p>
        <p>
          <b>Capital: </b><span>${this.capital}</span>
        </p>
      </div>
      ${this.getStyle()}
    `;
    return template;
  }
  getStyle() {
    return `
      <style>
        :host{
          display: block;
          min-width: 300px;
          max-width: 400px;
          width: 100%;
          min-height: 360px;
          background-color: var(--dark-mode-text-and-light-mode-elements);
          box-shadow: 1px 3px 6px 0px rgba(115, 115, 115, 0.15);
          border-radius: 6px;
          cursor: pointer;
        }
        img{
          border-radius: 6px 6px 0 0;
          width: 100%;
          position: relative;
        }
        div{
          padding: 20px;
        }
        div h2, div p{
          margin: 0;
        }
        div h2{
          margin-bottom: 20px;
        }
        div p{
          margin-bottom: 8px;
        }
        div p b{
          font-weight: 600;
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
customElements.define('country-card', CountryCard);
