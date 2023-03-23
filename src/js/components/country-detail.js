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
        <div class="border-countries-container">
          <p>Border Countries: </p>
          <div>
            ${countriesHTML}
          </div>
        </div>
      </div>
      ${this.getStyle()}
    `;
    return template;
  }
  getStyle() {
    return `<style>
      :host{
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        align-items: center;
        gap: 30px;
      }
      img{
        width: 100%;
      }
      h2{
        font-size: 1.5rem;
        margin: 0 0 20px 0;
      }
      p{
        margin: 10px 0;
      }
      b{
        font-weight: 600;
      }
      .details-container{
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
      }
      .details-container div:nth-child(1),
      .details-container div:nth-child(2){
        margin-bottom: 30px;
      }
      .border-countries-container{
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 16px;
      }
      .border-countries-container p{
        font-size: 16px;
        font-weight: 600;
        margin: 0 24px 0 0;
      }
      country-tag{
        margin-right: 4px;
      }
      @media (min-width:1300px) {
        :host{
          gap: 60px;
        }
      }
      @media (min-width:1600px) {
        :host{
          gap: 120px;
        }
      }
    </style>`;
  }
  render() {
    this.shadowRoot.appendChild(this.getTemplate().content.cloneNode(true));
  }
  connectedCallback() {
    this.render();
  }
}
customElements.define('country-detail', CountryDetail);
