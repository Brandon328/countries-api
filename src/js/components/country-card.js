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
      <div class="country-card">
        <img src="${this.flag}" alt="${this.name} flag">
        <div class="country-card__info">
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
          box-shadow: 1px 3px 6px 0px rgba(115, 115, 115, 0.15);
        }
        .country-card{
          min-width: 300px;
          max-width: 400px;
          width: 100%;
          min-height: 360px;
          background-color: var(--elements-color);
          border-radius: 6px;
          cursor: pointer;
          transform: scale(1);
          transition: 0.4s transform;
        }
        :host(:hover) .country-card{
          transform: scale(1.05);
        }
        img{
          border-radius: 6px 6px 0 0;
          width: 100%;
          position: relative;
        }
        .country-card__info{
          padding: 20px;
        }
        .country-card__info h2, .country-card__info p{
          margin: 0;
        }
        .country-card__info h2{
          margin-bottom: 20px;
        }
        .country-card__info p{
          margin-bottom: 8px;
        }
        .country-card__info p b{
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
    const countryCard = this.shadowRoot.querySelector('.country-card');
    countryCard.addEventListener('click', () => {
      window.location.hash = `#detail/${this.name.toLowerCase()}`;
    });
  }
}
customElements.define('country-card', CountryCard);
