//-------------------Creates app-header component---------------------//
const headerTemplate = document.createElement("template");
headerTemplate.innerHTML = `
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.3/css/bulma.min.css">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"
    integrity="sha512-iBBXm8fW90+nuLcSKlbmrPcLa0OT92xO1BIsZ+ywDWZCvqsWgccV3gFoRBv0z+8dLJgyAHIhR35VZc2oM/gI1w=="
    crossorigin="anonymous" referrerpolicy="no-referrer" />
</head>

<body>

  <nav class="navbar has-shadow is-white">
  <div class="navbar-brand">
  <a class="navbar-item" href="home.html">
  <i class="fas fa-child"></i></a>
  
  <a class="navbar-burger" id="burger">
    <span></span>
    <span></span>
    <span></span>
  </a>
</div>


    <div class="navbar-menu" id="nav-links">

      <div class="navbar-start">
      <a class="navbar-item is-hoverable" href="home.html" id="home">
          Home
        </a>

        <a class="navbar-item is-hoverable" href="app.html" id="app">
          App
        </a>

        <a class="navbar-item is-hoverable" href="doc.html" id="doc">
          Documentation
        </a>
      </div>
    </div> 
  </nav>
`;


class CustHeader extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(headerTemplate.content.cloneNode(true));
  }
  render(){
    //--------------------Accepted data-page bolds inputed page----------------//
    const page = this.getAttribute('data-page');
    this.shadowRoot.querySelector(`#${page}`).classList.add("has-text-weight-bold");
  }
  connectedCallback() {
    const burgerIcon = this.shadowRoot.querySelector('#burger');
    const navbarMenu = this.shadowRoot.querySelector('#nav-links');

    burgerIcon.addEventListener('click', () => {
      navbarMenu.classList.toggle('is-active');
    });
    

    this.render();

  }
}


customElements.define('app-header', CustHeader);


