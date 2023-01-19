import * as storage from "./local-storage.js";
import "./loader.js";

let listFavorites = null;
//--------------------Shows favorited cards from local storage----------------//
//--------------------Creates cards from custon fav-card component----------------//
const showFavorites = () => {


  let favorites = storage.getFavorites();
  if (favorites.length == 0) {
    document.querySelector("#element-status").textContent = "No favorites yet";

  } else {
    for (let i = 0; i < favorites.length; i++) {


      let newCard = document.createElement("fav-card");

      newCard.dataset.title = favorites[i].title;

      newCard.dataset.text = favorites[i].text;

      newCard.dataset.src = favorites[i].img;

      listFavorites.appendChild(newCard);
    }
    document.querySelector("#element-status").textContent = `You have ${favorites.length} favorites`;
    
  }



};
//-------------Showing and updating favorites on change and when page loads-------------//
window.onstorage = () => {
  showFavorites();
};
const init = () => {
  listFavorites = document.querySelector("#element-card-holder");
  showFavorites();



  document.querySelector("#btn-clear-all").onclick = () => {
    storage.clearFavorites();
    document.querySelector("#element-card-holder").innerHTML = "";
    document.querySelector("#element-status").textContent = "No favorites yet";
  };

  window.onstorage = () => {
    showFavorites();
  };
};

init();