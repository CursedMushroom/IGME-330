//-------------------Creates fav-card component---------------------//
//-------------------accepts title, likes, text[which class, flavor and card text] and img---------------------//
const template = document.createElement("template");

template.innerHTML = `
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.3/css/bulma.min.css">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"
    integrity="sha512-iBBXm8fW90+nuLcSKlbmrPcLa0OT92xO1BIsZ+ywDWZCvqsWgccV3gFoRBv0z+8dLJgyAHIhR35VZc2oM/gI1w=="
    crossorigin="anonymous" referrerpolicy="no-referrer" />

<style>
#image-main{
  
  background-color:white;
  padding:7px;
  
  margin:.1rem;
  width:300px;
}
#likes{
  color:blue;
}
#title::first-letter {
  text-transform:capitalize;
}
#title{
  font-family: "Asul";
 
}
.card{
  height:500px;
  overflow: auto;
}

  </style>

  
    <div class="card ">
    
      <div class="card-header-title has-text-centered is-size-4">
        <span class="has-text-centered" id="title">???</span>
        
      </div>

        <div class="card-content">
          <div class="card-image">
            <figure class="image">
              <img id="image-main" src="https://bulma.io/images/placeholders/1280x960.png" alt="placeHolder">
            </figure>
          </div>
          <div class="content pt-4 has-text-centered">
            
          <span id="likes"></span><br>
            <span id="text">text</span><br>
            
            
            
          </div>
        </div>
      </div>




`;


class FavsCard extends HTMLElement {
  static defaultImage = "https://via.placeholder.com/300x300";

  constructor() {
    super();
    this.attachShadow({ "mode": "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));

  }
  connectedCallback() {
    this.render();
  }
  render() {
    this.shadowRoot.querySelector("#title").innerHTML = this.dataset.title;

    this.shadowRoot.querySelector("#text").innerHTML = this.dataset.text;

    this.shadowRoot.querySelector("#likes").innerHTML = this.dataset.likes || "";

    this.shadowRoot.querySelector("#image-main").src = this.dataset.src || FavsCard.defaultImage;



  }
  disconnectedCallback() {
    this.btnFavorite.onclick = null;
  }

}
customElements.define("fav-card", FavsCard);