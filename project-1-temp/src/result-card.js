//-------------------Creates result-card component---------------------//
//-----accepts title, set, faction, class, text, flavor, img, type-----//
//---Replaces and undefined or nulls with blanks so they dont show-----//
//--Replaces any null image with a blank card "placeholder"------------//
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
  width:400px;
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

  
    <div class="card">
      <div class="card-header-title is-size-4 ">
        <span class="has-text-centered" id="title">???</span>
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
            <span id="set">set</span><br>
            <span id="type">type</span><br>
            <span id="faction">facton</span><br>
            <span id="text">text</span><br>
            <span id="flavor">Flavor</span><br>
            <span id="class">class</span>
          </div>
        </div>
      </div>




`;


class ResultsCard extends HTMLElement {
  static defaultImage = "../images/blankCard.jpg";

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
    this.shadowRoot.querySelector("#set").innerHTML = `Set: ${this.dataset.set}`;
    this.shadowRoot.querySelector("#type").innerHTML = `Type: ${this.dataset.type}`;
    this.shadowRoot.querySelector("#text").innerHTML = this.dataset.text;
    this.shadowRoot.querySelector("#flavor").innerHTML = this.dataset.flavor;
    this.shadowRoot.querySelector("#faction").innerHTML = `Faction: ${this.dataset.faction}`;
    this.shadowRoot.querySelector("#class").innerHTML = `Class: ${this.dataset.class}`;
    this.shadowRoot.querySelector("#image-main").src = this.dataset.src || ResultsCard.defaultImage;


    this.btnFavorite = this.shadowRoot.querySelector("#btn-favorite");
    this.callBack = this.callback|| ((obj) => console.log(`Title: ${obj.title}`));

    this.btnFavorite.onclick = (evt) => {
      const dataObj = {
        "dbfId":this.dataset.dbfId,
        "title":this.dataset.title,
        "img":this.dataset.src,
        "text":`Class: ${this.dataset.class} <br> ${this.dataset.text} <br> ${this.dataset.flavor} <br> ${this.dataset.type}`,
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
customElements.define("result-card", ResultsCard);