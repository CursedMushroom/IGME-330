//-------------------Creates card-back component---------------------//
//-------------------accepts Name,img and text---------------------//
//--Replaces any null image with a blank card "placeholder"------------//

const template = document.createElement("template");


template.innerHTML = `

<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.3/css/bulma.min.css">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"
    integrity="sha512-iBBXm8fW90+nuLcSKlbmrPcLa0OT92xO1BIsZ+ywDWZCvqsWgccV3gFoRBv0z+8dLJgyAHIhR35VZc2oM/gI1w=="
    crossorigin="anonymous" referrerpolicy="no-referrer" />

<style>
#image-main{
  border:1px solid black;
  background-color:white;
  padding:7px;
  box-shadow: 1px 1px 2px #333;
  margin:.1rem;
  width:300px;
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

  
    <div class="card" id="back">
      <div class="card-header-title is-size-4">
        <span id="title">???</span>
      </div>

      <div class="control has-text-centered">
        <button id="btn-favorite"
         class="button is-primary is-small"
          title="Favorite">
          Favorite</button>
          </div>


        <div class="card-content">
          <div class="card-image">
            <figure class="image">
              <img id="image-main" src="https://bulma.io/images/placeholders/1280x960.png" alt="placeHolder">
            </figure>
          </div>
          <div class="content pt-4">
            
            <span id="text">text</span><br>
            
          </div>
        </div>
      </div>




`;


class BacksCard extends HTMLElement {
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
    this.shadowRoot.querySelector("#image-main").src = this.dataset.src || BacksCard.defaultImage;


    this.btnFavorite = this.shadowRoot.querySelector("#btn-favorite");
    this.callBack = this.callback|| ((obj) => console.log(`Title: ${obj.title}`));

    this.btnFavorite.onclick = (evt) => {
      const dataObj = {
        "title":this.dataset.title,
        "img":this.dataset.src,
        "text":this.dataset.text,
      };
      this.callBack(dataObj);
      this.disableFavoriteButton();
    };
  }
  disableFavoriteButton() {
    this.btnFavorite.innerHTML="Favorited!";
    this.btnFavorite.disabled=true;
    this.btnFavorite.classList.remove("is-primary");
    this.btnFavorite.classList.add("is-warning");
  }

}
customElements.define("cardback-card", BacksCard);