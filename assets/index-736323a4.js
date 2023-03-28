(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))n(r);new MutationObserver(r=>{for(const c of r)if(c.type==="childList")for(const w of c.addedNodes)w.tagName==="LINK"&&w.rel==="modulepreload"&&n(w)}).observe(document,{childList:!0,subtree:!0});function t(r){const c={};return r.integrity&&(c.integrity=r.integrity),r.referrerPolicy&&(c.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?c.credentials="include":r.crossOrigin==="anonymous"?c.credentials="omit":c.credentials="same-origin",c}function n(r){if(r.ep)return;r.ep=!0;const c=t(r);fetch(r.href,c)}})();const l=document.querySelector(".countries-gallery"),h=document.querySelector(".country-detail-container"),k=document.querySelector("#regions"),f=document.querySelector(".back-btn"),z=document.querySelector("#search-box__btn"),F=document.querySelector("#search-box__input"),H=document.querySelector("#regions"),d=["#"];z.addEventListener("click",function(i){i.preventDefault();const t=`#search/${F.value}`;window.location.hash=t,d.push(t)});H.addEventListener("change",function(i){i.preventDefault();const t=`#filter/${H.value}`;window.location.hash=t,d.push(t)});f.addEventListener("click",function(){d.length>1?(d.pop(),window.location.hash=`#${d[d.length-1]}`):window.location.hash="/"});class U extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"})}static get observedAttributes(){return["flag","name","population","region","capital"]}attributeChangedCallback(e,t,n){t!==n&&(this[e]=n)}getTemplate(){const e=document.createElement("template");return this.name!=null?e.innerHTML=`
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
      `:e.innerHTML=`
        <div class="country-card">
        </div>
        ${this.getStyle()}
      `,e}getStyle(){return`
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
          min-height: 150px;
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
    `}render(){this.shadowRoot.appendChild(this.getTemplate().content.cloneNode(!0))}connectedCallback(){this.render(),this.shadowRoot.querySelector(".country-card").addEventListener("click",()=>{const t=`#detail/${this.name.toLowerCase()}`;window.location.hash=t,d.push(t)})}}customElements.define("country-card",U);class G extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"})}static get observedAttributes(){return["name"]}attributeChangedCallback(e,t,n){t!==n&&(this[e]=n)}getTemplate(){const e=document.createElement("template");return e.innerHTML=`
      <input type="button" value="${this.name}">
      ${this.getStyle()}
    `,e}getStyle(){return`
      <style>
        input{
          background-color: var(--dark-mode-text-and-light-mode-elements);
          padding: 10px 20px;
          border: none;
          cursor: pointer;
          box-shadow: 1px 3px 6px 2px rgba(115, 115, 115, 0.15);
          width: auto;
          border-radius: 4px;
          color: var(--text-color);
          transform: scale(1);
          transition: .4s transform;
        }
        :host(:hover) input{
          transform: scale(1.1);
        }
      </style>
    `}render(){this.shadowRoot.appendChild(this.getTemplate().content.cloneNode(!0))}connectedCallback(){this.render(),this.shadowRoot.querySelector("input").addEventListener("click",()=>{const t=`#detail/${this.name.toLowerCase()}`;window.location.hash=t,d.push(t)})}}customElements.define("country-tag",G);class K extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"})}static get observedAttributes(){return["flag","name","native_name","population","region","subregion","capital","domain","currencies","languages","border_countries"]}attributeChangedCallback(e,t,n){t!==n&&(this[e]=n)}getBorderCountries(){if(this.border_countries){const e=this.border_countries.split(",");let t="";return e.forEach(n=>{t+=`
          <country-tag name="${n}"></country-tag>
        `}),`
        <div class="border-countries-container">
          <p>Border Countries: </p>
          <div>
            ${t}
          </div>
        </div>
      `}else return""}getTemplate(){const e=document.createElement("template");return e.innerHTML=`
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
        ${this.getBorderCountries()}
      </div>
      ${this.getStyle()}
    `,e}getStyle(){return`<style>
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
    </style>`}render(){this.shadowRoot.appendChild(this.getTemplate().content.cloneNode(!0))}connectedCallback(){this.render()}}customElements.define("country-detail",K);class X extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"})}static get observedAttributes(){return["message"]}attributeChangedCallback(e,t,n){t!==n&&(this[e]=n)}getTemplate(){const e=document.createElement("template");return e.innerHTML=`
      <img src="/notfound-illustration.svg"/>
      <h2>Sorry!</h2>
      <p>${this.message}</p>
      ${this.getStyle()}
    `,e}getStyle(){return`
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
    `}render(){this.shadowRoot.appendChild(this.getTemplate().content.cloneNode(!0))}connectedCallback(){this.render()}}customElements.define("error-not-found",X);// @license © 2019 Google LLC. Licensed under the Apache License, Version 2.0.
const b=document;let u={};try{u=localStorage}catch{}const L="prefers-color-scheme",v="media",a="light",s="dark",P=`(${L}:${s})`,J=`(${L}:${a})`,N="link[rel=stylesheet]",C="remember",S="legend",$="toggle",j="switch",E="appearance",T="permanent",_="mode",g="colorschemechange",R="permanentcolorscheme",O="all",M="not all",o="dark-mode-toggle",m="https://googlechromelabs.github.io/dark-mode-toggle/demo/",p=(i,e,t=e)=>{Object.defineProperty(i,t,{enumerable:!0,get(){const n=this.getAttribute(e);return n===null?"":n},set(n){this.setAttribute(e,n)}})},Q=(i,e,t=e)=>{Object.defineProperty(i,t,{enumerable:!0,get(){return this.hasAttribute(e)},set(n){n?this.setAttribute(e,""):this.removeAttribute(e)}})},I=b.createElement("template");I.innerHTML=`<style>*,::after,::before{box-sizing:border-box}:host{contain:content;display:block}:host([hidden]){display:none}form{background-color:var(--${o}-background-color,transparent);color:var(--${o}-color,inherit);padding:0}fieldset{border:none;margin:0;padding-block:.25rem;padding-inline:.25rem}legend{font:var(--${o}-legend-font,inherit);padding:0}input,label{cursor:pointer}label{white-space:nowrap}input{opacity:0;position:absolute;pointer-events:none}input:focus-visible+label{outline:#e59700 auto 2px;outline:-webkit-focus-ring-color auto 5px}label:not(:empty)::before{margin-inline-end:.5rem;}label::before{content:"";display:inline-block;background-size:var(--${o}-icon-size,1rem);background-repeat:no-repeat;height:var(--${o}-icon-size,1rem);width:var(--${o}-icon-size,1rem);vertical-align:middle;}[part=lightLabel]::before{background-image:var(--${o}-light-icon, url("${m}sun.png"))}[part=darkLabel]::before{filter:var(--${o}-icon-filter, none);background-image:var(--${o}-dark-icon, url("${m}moon.png"))}[part=toggleLabel]::before{background-image:var(--${o}-checkbox-icon,none)}[part=permanentLabel]::before{background-image:var(--${o}-remember-icon-unchecked, url("${m}unchecked.svg"))}[part=darkLabel],[part=lightLabel],[part=toggleLabel]{font:var(--${o}-label-font,inherit)}[part=darkLabel]:empty,[part=lightLabel]:empty,[part=toggleLabel]:empty{font-size:0;padding:0}[part=permanentLabel]{font:var(--${o}-remember-font,inherit)}input:checked+[part=permanentLabel]::before{background-image:var(--${o}-remember-icon-checked, url("${m}checked.svg"))}input:checked+[part=darkLabel],input:checked+[part=lightLabel]{background-color:var(--${o}-active-mode-background-color,transparent)}input:checked+[part=darkLabel]::before,input:checked+[part=lightLabel]::before{background-color:var(--${o}-active-mode-background-color,transparent)}input:checked+[part=toggleLabel]::before{filter:var(--${o}-icon-filter, none)}input:checked+[part=toggleLabel]+aside [part=permanentLabel]::before{filter:var(--${o}-remember-filter, invert(100%))}aside{visibility:hidden;margin-block-start:.15rem}[part=darkLabel]:focus-visible~aside,[part=lightLabel]:focus-visible~aside,[part=toggleLabel]:focus-visible~aside{visibility:visible;transition:visibility 0s}aside [part=permanentLabel]:empty{display:none}@media (hover:hover){aside{transition:visibility 3s}aside:hover{visibility:visible}[part=darkLabel]:hover~aside,[part=lightLabel]:hover~aside,[part=toggleLabel]:hover~aside{visibility:visible;transition:visibility 0s}}</style><form part=form><fieldset part=fieldset><legend part=legend></legend><input part=lightRadio id=l name=mode type=radio><label part=lightLabel for=l></label><input part=darkRadio id=d name=mode type=radio><label part=darkLabel for=d></label><input part=toggleCheckbox id=t type=checkbox><label part=toggleLabel for=t></label><aside part=aside><input part=permanentCheckbox id=p type=checkbox><label part=permanentLabel for=p></label></aside></fieldset></form>`;class W extends HTMLElement{static get observedAttributes(){return[_,E,T,S,a,s,C]}constructor(){super(),p(this,_),p(this,E),p(this,S),p(this,a),p(this,s),p(this,C),Q(this,T),this.t=null,this.i=null,b.addEventListener(g,e=>{this.mode=e.detail.colorScheme,this.o(),this.l()}),b.addEventListener(R,e=>{this.permanent=e.detail.permanent,this.h.checked=this.permanent}),this.p()}p(){const e=this.attachShadow({mode:"open"});e.append(I.content.cloneNode(!0)),this.t=b.querySelectorAll(`${N}[${v}*=${L}][${v}*="${s}"]`),this.i=b.querySelectorAll(`${N}[${v}*=${L}][${v}*="${a}"]`),this.g=e.querySelector("[part=lightRadio]"),this.m=e.querySelector("[part=lightLabel]"),this.u=e.querySelector("[part=darkRadio]"),this.k=e.querySelector("[part=darkLabel]"),this.v=e.querySelector("[part=toggleCheckbox]"),this.$=e.querySelector("[part=toggleLabel]"),this.L=e.querySelector("legend"),this.C=e.querySelector("aside"),this.h=e.querySelector("[part=permanentCheckbox]"),this.M=e.querySelector("[part=permanentLabel]")}connectedCallback(){const e=matchMedia(P).media!==M;e&&matchMedia(P).addListener(({matches:n})=>{this.permanent||(this.mode=n?s:a,this.R(g,{colorScheme:this.mode}))});let t=!1;try{t=u.getItem(o)}catch{}if(t&&[s,a].includes(t)?(this.mode=t,this.h.checked=!0,this.permanent=!0):e&&(this.mode=matchMedia(J).matches?a:s),this.mode||(this.mode=a),this.permanent&&!t)try{u.setItem(o,this.mode)}catch{}this.appearance||(this.appearance=$),this._(),this.o(),this.l(),[this.g,this.u].forEach(n=>{n.addEventListener("change",()=>{this.mode=this.g.checked?a:s,this.l(),this.R(g,{colorScheme:this.mode})})}),this.v.addEventListener("change",()=>{this.mode=this.v.checked?s:a,this.o(),this.R(g,{colorScheme:this.mode})}),this.h.addEventListener("change",()=>{this.permanent=this.h.checked,this.R(R,{permanent:this.permanent})}),this.A(),this.R(g,{colorScheme:this.mode}),this.R(R,{permanent:this.permanent})}attributeChangedCallback(e,t,n){if(e===_){if(![a,s].includes(n))throw new RangeError(`Allowed values: "${a}" and "${s}".`);if(matchMedia("(hover:none)").matches&&this.remember&&this.S(),this.permanent)try{u.setItem(o,this.mode)}catch{}this.o(),this.l(),this.A()}else if(e===E){if(![$,j].includes(n))throw new RangeError(`Allowed values: "${$}" and "${j}".`);this._()}else if(e===T){if(this.permanent){if(this.mode)try{u.setItem(o,this.mode)}catch{}}else try{u.removeItem(o)}catch{}this.h.checked=this.permanent}else e===S?this.L.textContent=n:e===C?this.M.textContent=n:e===a?(this.m.textContent=n,this.mode===a&&(this.$.textContent=n)):e===s&&(this.k.textContent=n,this.mode===s&&(this.$.textContent=n))}R(e,t){this.dispatchEvent(new CustomEvent(e,{bubbles:!0,composed:!0,detail:t}))}_(){const e=this.appearance===$;this.g.hidden=e,this.m.hidden=e,this.u.hidden=e,this.k.hidden=e,this.v.hidden=!e,this.$.hidden=!e}o(){this.mode===a?this.g.checked=!0:this.u.checked=!0}l(){this.mode===a?(this.$.style.setProperty(`--${o}-checkbox-icon`,`var(--${o}-light-icon,url("${m}moon.png"))`),this.$.textContent=this.light,this.light||(this.$.ariaLabel=s),this.v.checked=!1):(this.$.style.setProperty(`--${o}-checkbox-icon`,`var(--${o}-dark-icon,url("${m}sun.png"))`),this.$.textContent=this.dark,this.dark||(this.$.ariaLabel=a),this.v.checked=!0)}A(){this.mode===a?(this.i.forEach(e=>{e.media=O,e.disabled=!1}),this.t.forEach(e=>{e.media=M,e.disabled=!0})):(this.t.forEach(e=>{e.media=O,e.disabled=!1}),this.i.forEach(e=>{e.media=M,e.disabled=!0}))}S(){this.C.style.visibility="visible",setTimeout(()=>{this.C.style.visibility="hidden"},3e3)}}customElements.define(o,W);const Y="https://restcountries.com/v3.1",Z=`
  <country-card class="country-card--loading"></country-card>
  <country-card class="country-card--loading"></country-card>
  <country-card class="country-card--loading"></country-card>
  <country-card class="country-card--loading"></country-card>
  <country-card class="country-card--loading"></country-card>
  <country-card class="country-card--loading"></country-card>
`,V={root:null},ee=new IntersectionObserver(te,V);function te(i,e){i.forEach(t=>{if(t.isIntersecting){const n=t.target,r=n.shadowRoot.querySelector("img"),c=n.getAttribute("data-flag");r.setAttribute("src",c),e.unobserve(t.target)}})}async function y(i){const e=await fetch(Y+i);return e.ok?await e.json():"error"}function B(i){const e=i.toString(),t=e.length,n=[];for(let r=1;r<=t;r++)r%3==0?n.unshift(e.slice(t-r,t-r+3)):r==t&&n.unshift(e.slice(0,t%3));return n.join(",")}async function ne(i){return(await y(`/alpha?codes=${i.join(",")}&fields=name`)).map(t=>t.name.common).join(",")}function q(i){l.innerHTML="";const e=[];i.sort((t,n)=>t.name.common.localeCompare(n.name.common)),i.forEach(t=>{const n=document.createElement("country-card");n.setAttribute("data-flag",t.flags.svg??t.flags.png),n.name=t.name.common,n.population=B(t.population),n.region=t.region,n.capital=t.capital==null?"Unknown":t.capital[0],e.push(n),ee.observe(n)}),l.append(...e)}function x(i,e){l.innerHTML="";const t=document.createElement("error-not-found");t.message=i,e.appendChild(t)}function A(){l.innerHTML=Z}async function D(){A();const i=await y("/all?fields=name,capital,region,population,flags");i!=="error"?q(i):x("An error ocurred and your request couldn't be completed. Please try it again later.",l)}async function ie(i){h.innerHTML="";const e=await y(`/name/${i}?fields=name,capital,region,subregion,languages,flags,population,borders,currencies,tld`);if(e!=="error"){const[t]=e,n=document.createElement("country-detail");n.flag=t.flags.svg??t.flags.png,n.name=t.name.common,n.native_name=t.name.official,n.population=B(t.population),n.region=t.region,n.subregion=t.subregion,n.capital=t.capital.join(", "),n.domain=t.tld.join(", "),n.currencies=Object.values(t.currencies).map(r=>r.name).join(", "),n.languages=Object.values(t.languages).join(", "),t.borders.length>0?n.border_countries=await ne(t.borders):n.border_countries="",h.appendChild(n)}else x(`The country <code> ${i}</code> was not found in our database.`,h)}async function re(i){A();const e=decodeURI(i),t=await y(`/name/${e}?fields=name,capital,region,population,flags`);t!=="error"?q(t):x(`The country <code> ${e}</code> was not found in our database.`,l)}async function oe(i){A();const e=await y(`/region/${i}`);e!=="error"?q(e):x(`The region <code> ${i}</code> was not found in our database.`,l)}const ae=function(){l.classList.remove("inactive"),h.classList.add("inactive"),k.classList.remove("inactive"),f.classList.add("inactive")},se=function(){l.classList.add("inactive"),h.classList.remove("inactive"),k.classList.add("inactive"),f.classList.remove("inactive")},ce=function(){l.classList.remove("inactive"),h.classList.add("inactive"),k.classList.add("inactive"),f.classList.remove("inactive")},le=function(){l.classList.remove("inactive"),h.classList.add("inactive"),k.classList.remove("inactive"),f.classList.remove("inactive")};var de={"/":[ae,D],"/detail/:countryName":[se,ie],"/search/:input":[ce,re],"/filter/:region":[le,oe]},he=new Router(de);he.init();window.addEventListener("DOMContentLoaded",D,!1);
