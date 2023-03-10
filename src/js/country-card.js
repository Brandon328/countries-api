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
    `;
    return template;
  }
  getStyle() {
    return `
      <style>
      
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
