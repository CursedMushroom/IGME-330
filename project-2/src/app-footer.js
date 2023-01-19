//-------------------Creates app-footer component---------------------//
//-------------------accepts Name,Year and contact---------------------//
const footerTemplate = document.createElement("template");
footerTemplate.innerHTML = `<style>
:host{
    display: block;
    background-color: rgba(47, 48, 60);
    border-top: 1px solid rgba(47, 48, 60);
    border-bottom: 1px solid rgba(47, 48, 60);
    
  }
  footer{
    font-variant: small-caps;
    font-family: Advent Pro;
    text-align: center;
    color: rgb(215, 217, 215); 
    background-color:rgb(180, 142, 174);
  }
  </style>
  <footer>???</footer>
  `;
    ;
class CustFooter extends HTMLElement {//custom footer element
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.shadowRoot.appendChild(footerTemplate.content.cloneNode(true));
    }
    connectedCallback() {
        this.render();
    }
    render() {
        const year = this.getAttribute('data-year') || "0000";
        const name = this.getAttribute('data-name') || "Nobody";
        const contact = this.getAttribute('data-contact') || "Email";

        this.shadowRoot.querySelector("footer").innerHTML = `&copy; Copyright ${year} ||  ${name} || Contact: ${contact} `;
    }

}

customElements.define('app-footer', CustFooter);