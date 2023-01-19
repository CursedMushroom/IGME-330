//-------------------Community Page---------------------//
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js";
import { getDatabase, ref, set, push, onValue, increment } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-database.js";

import "./fav-card.js";
import "./firebase.js";

const firebaseConfig = {
    apiKey: "AIzaSyB6fjSGSjrqEZ06x5btiXApMG4lpDW26HE",
    authDomain: "hearthstone-cards-b4183.firebaseapp.com",
    projectId: "hearthstone-cards-b4183",
    storageBucket: "hearthstone-cards-b4183.appspot.com",
    messagingSenderId: "574993511743",
    appId: "1:574993511743:web:5793620fa9e7c0122e8f8a"
};


let listCommunity = null;
let status=null;
const cards = [];


//-------------------pull from community to array---------------------//
const showCommunity = current => {
    if (listCommunity) {
        cards.length = 0;
        current.forEach(fav => {
            const cardData = fav.val();
            cards.push(cardData);
        });
        displayCards();
        console.log(cards);
    }
};


//-------------------display community array---------------------//
const displayCards = () =>{
    console.log("cards");
    listCommunity.innerHTML = "";
    for (let i = 0; i < cards.length; i++) {


        let newCard = document.createElement("fav-card");
  
        newCard.dataset.title = cards[i].title;
  
        newCard.dataset.text = cards[i].text;

        newCard.dataset.likes = `Total Likes: ${cards[i].likes}`;
  
        newCard.dataset.src = cards[i].img;
  
        listCommunity.appendChild(newCard);
      }
      status.textContent=`There are ${cards.length} community favorites`;
};




const init = () => {
    const db = getDatabase();
    const favRef = ref(db, 'favorite/');
    onValue(favRef, showCommunity);
    listCommunity = document.querySelector("#element-card-holder");
    status = document.querySelector("#element-status");
}

init();