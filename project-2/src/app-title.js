//-------------------Creates app-title component---------------------//
//-------------------accepts Name---------------------//
const titleTemplate = document.createElement("template");
titleTemplate.innerHTML = `<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.3/css/bulma.min.css">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"
  integrity="sha512-iBBXm8fW90+nuLcSKlbmrPcLa0OT92xO1BIsZ+ywDWZCvqsWgccV3gFoRBv0z+8dLJgyAHIhR35VZc2oM/gI1w=="
  crossorigin="anonymous" referrerpolicy="no-referrer" />
  <style>

  </style>
  <p class="title">???</p>
  `;
;
class CustTitle extends HTMLElement {//custom title element
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.shadowRoot.appendChild(titleTemplate.content.cloneNode(true));
    }
    connectedCallback() {
        this.render();
    }
    render() {

        const title = this.getAttribute('data-title') || "Title";


        this.shadowRoot.querySelector("p").innerHTML = `${title} `;
    }

}

customElements.define('app-title', CustTitle);