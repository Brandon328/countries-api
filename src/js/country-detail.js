class CountryDetail extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }
  static get observedAttributes() {
    return ['flag', 'name', 'native_name', 'population', 'region', 'subregion', 'capital', 'domain', 'currencies', 'languages', 'border_countries'];
  }
  attributeChangedCallback(attr, oldValue, newValue) {
    if (oldValue !== newValue) {
      this[attr] = newValue;
    }
  }
  getTemplate() {
    const template = document.createElement('template');
    const borderCountriesArray = this.border_countries.split(',');
    let countriesHTML = '';
    borderCountriesArray.forEach(country => {
      countriesHTML += `
        <country-tag name="${country}"></country-tag>
      `
    });
    template.innerHTML = `
      <img src="${this.flag}" alt="${this.name} flag">
      <div>
        <h2>${this.name}</h2>
        <div class="details-container">
          <div>
            <p>
              <b>Native Name: </b><span>${this.native_name}</span >
            </p >
            <p>
              <b>Population: </b><span>${this.population}</span>
            </p>
            <p>
              <b>Region: </b><span>${this.region}</span>
            </p>
            <p>
              <b>Sub Region: </b><span>${this.subregion}</span>
            </p>
            <p>
              <b>Capital: </b><span>${this.capital}</span>
            </p>
          </div>
          <div>
            <p>
              <b>Top Level Domain: </b><span>${this.domain}</span>
            </p>
            <p>
              <b>Currencies: </b><span>${this.currencies}</span>
            </p>
            <p>
              <b>Languages: </b><span>${this.languages}</span>
            </p>
          </div>
        </div>
        <div>
          <b>Border Countries: </b>
          ${countriesHTML}
        </div>
      </div>
      ${this.getStyle()}
    `;
    return template;
  }
  getStyle() {
    return `<style></style>`;
  }
  render() {
    this.shadowRoot.appendChild(this.getTemplate().content.cloneNode(true));
  }
  connectedCallback() {
    this.render();
  }
}
customElements.define('country-detail', CountryDetail);
