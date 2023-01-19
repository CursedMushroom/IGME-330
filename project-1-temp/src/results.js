//--Calls to API, searches through array, sorts array and displays final result[s]---------//
import "./loader.js";
import "./firebase.js";
import * as storage from "./local-storage.js";
import { pushLikedCardToCloud } from "./firebase.js";

const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': '6450b25e6emshd553a7a5b590e80p12f288jsn58973c98e9f4',
        'X-RapidAPI-Host': 'omgvamp-hearthstone-v1.p.rapidapi.com',
        Cookie: 'foo=bar;SameSite=None;Secure'

    }
};


let btnClearAll;
let btnSearch;
let btnCardBack;
let elementCardHolder;
let elementStatus;
let uiString;
let p1HearthstoneUI = {//set inital ui
    "class": "",
    "faction": "",
    "race": "",
    "type": "",
    "set": "",

};
// let p1HearthstoneUI = {//set inital ui
//     "class": document.querySelector("#field-class").value,
//     "faction": document.querySelector("#field-faction").value,
//     "race": document.querySelector("#field-race").value,
//     "type": document.querySelector("#field-type").value,
//     "set": document.querySelector("#field-set").value,

// };

//localStorage.setItem("p1HearthstoneUI", JSON.stringify(p1HearthstoneUI));


const init = () => {//grab ui from local storage
    

    localStorage.setItem(p1HearthstoneUI, JSON.stringify(p1HearthstoneUI));

    uiString = localStorage.getItem("p1HearthstoneUI");
    //retrievedUI = JSON.parse(uiString);
    uiString = JSON.parse(uiString);
    console.log(uiString);
    
    if (uiString.class == "") {
        uiString.class = "Neutral";
        uiString.faction = "All";
        uiString.race = "All";
        uiString.type = "All";
        uiString.set = "All";
    }

    document.querySelector("#field-class").value = uiString.class;
    document.querySelector("#field-faction").value = uiString.faction;
    document.querySelector("#field-race").value = uiString.race;
    document.querySelector("#field-type").value = uiString.type;
    document.querySelector("#field-set").value = uiString.set;




}

init();

btnClearAll = document.querySelector("#btn-clear-all");
btnSearch = document.querySelector("#btn-search");
btnCardBack = document.querySelector("#btn-cardbacks");
elementCardHolder = document.querySelector("#element-card-holder");
elementStatus = document.querySelector("#element-status");




//----UI Setting and Saving------///


document.querySelector("#field-class").onchange = e => {
    uiString.class = document.querySelector("#field-class").value;
    localStorage.setItem("p1HearthstoneUI", JSON.stringify(uiString));
};

document.querySelector("#field-faction").onchange = e => {
    uiString.faction = document.querySelector("#field-faction").value;
    localStorage.setItem("p1HearthstoneUI", JSON.stringify(uiString));
};
document.querySelector("#field-race").onchange = e => {
    uiString.race = document.querySelector("#field-race").value;
    localStorage.setItem("p1HearthstoneUI", JSON.stringify(uiString));
};
document.querySelector("#field-type").onchange = e => {
    uiString.type = document.querySelector("#field-type").value;
    localStorage.setItem("p1HearthstoneUI", JSON.stringify(uiString));
};
document.querySelector("#field-set").onchange = e => {
    uiString.set = document.querySelector("#field-set").value;
    localStorage.setItem("p1HearthstoneUI", JSON.stringify(uiString));
};
//----------------------------------------------------------------------------//



//-----promise and Fetch for initail API search-----//
async function fetchPromise(url) {
    return await fetch(url, options)
        .then((response) => response.json())
        .then((responseJson) => { return responseJson });
};

async function helper(url, callback) {

    const json = await fetchPromise(url);
    console.log(json);
    for (let f = 0; f < json.length; f++) {
        if (json[f].name == "???" || json[f].name == "undefined") {


            json.splice(f, 1);
            f--;


        }
        else {

        }
    }


    callback(json);


}
//----------------------------------------------------------------------------//



//---------------------Search Order---------------------//
//------class=>quality=>faction=>Race=>type=>set--------//
const classCallBack2 = e => {//search by class|| Mage, Rouge, etc

    try {

    } catch {
        console.log("JSON parsing error");

    }


    factionCallBack(e);
}


const factionCallBack = e => {//search by faction|| Horde, neutral, etc.
    let x = document.querySelector("#field-faction").value;
    if (x !== 'All') {
        console.log(e.length);
        for (let f = 0; f < e.length; f++) {
            if (e[f].hasOwnProperty('faction')) {//see if the card has the property
                if (e[f].faction != x) {//if it doesnt equal search, remove it from the array
                    e.splice(f, 1);
                    f--;

                }
                else {
                    continue;
                }
            }
            else {
                e.splice(f, 1);
                f--;
            }
        }
    }
    if (e.length == 0) {
        noCards();//if there are no cards left in the array, jump to no cards
    } else { raceCallBack(e); }


}


const raceCallBack = e => {//search by race|| Mech, Murlock, etc
    let x = document.querySelector("#field-race").value;
    if (x !== 'All') {
        console.log(e.length);
        for (let f = 0; f < e.length; f++) {
            if (e[f].hasOwnProperty('race')) {
                if (e[f].race != x) {
                    e.splice(f, 1);
                    f--;

                }
                else {
                    continue;
                }
            }
            else {
                e.splice(f, 1);
                f--;
            }
        }
    }
    if (e.length == 0) {
        noCards();
    } else {
        typeCallBack(e);
    }



}




const typeCallBack = e => {//search by card type||Spells, Weapond, etc.
    let x = document.querySelector("#field-type").value;
    if (x !== 'All') {

        for (let f = 0; f < e.length; f++) {
            if (e[f].hasOwnProperty('type')) {
                if (e[f].type != x) {
                    e.splice(f, 1);
                    f--;

                }
                else {
                    continue;
                }
            }
            else {
                e.splice(f, 1);
                f--;
            }
        }
    }
    if (e.length == 0) {
        noCards();
    } else {
        setCallBack(e);
    }

}

const setCallBack = e => {//search by set
    let x = document.querySelector("#field-set").value;
    if (x !== 'All') {

        for (let f = 0; f < e.length; f++) {
            if (e[f].hasOwnProperty('cardSet')) {
                if (e[f].cardSet != x) {
                    e.splice(f, 1);
                    f--;

                }
                else {
                    continue;
                }
            }
            else {
                e.splice(f, 1);
                f--;
            }
        }
    }
    if (e.length == 0) {
        noCards();
    } else {
        finalCards(e);
    }

}

const cardBack = e => {//display all card backs

    document.querySelector("#element-card-holder").innerHTML = ``;

    for (let i = 0; i < e.length; i++) {


        let newCard = document.createElement("cardback-card");

        newCard.dataset.title = e[i].name || "";
        newCard.dataset.text = e[i].description;
        newCard.dataset.src = e[i].img || "images/blankCard.jpg";

        newCard.callback = addToFavorites;

        elementCardHolder.appendChild(newCard);
        //console.log(e[i]);
    }
    elementStatus.textContent = `There are ${e.length} card backs!`;
    btnCardBack.classList.remove("is-loading");




}
//----------------------------------------------------------------------------//



//----------------------Final display--------------------//
const finalCards = e => {//displays final cards after going through all searches(is used)
    let count = Number(document.querySelector("#amount").value);
    document.querySelector("#element-card-holder").innerHTML = ``;
    if (count > e.length) {//fixes if count goes beyond e.length, when loading never stops. 
        count = e.length;
    }


    //Check if thee are dupe names in the final array before displaying

    for (let z = 0; z < count - 2; z++) {
        if (e[z].name == e[z + 1].name) {
            console.log("slice dupe");
            e.splice(z, 1);
            z--;
            if (count > e.length) {//gets rid of undefined next name for search count below limit
                count = e.length;
            }
        }
    }


    for (let i = 0; i < count; i++) {//creates cards within limit


        let newCard = document.createElement("result-card");

        newCard.dataset.title = e[i].name;
        newCard.dataset.dbfId = e[i].dbfId;
        newCard.dataset.type = e[i].type || "";
        newCard.dataset.set = e[i].cardSet;
        newCard.dataset.text = e[i].text || "";
        newCard.dataset.flavor = e[i].flavor || "";
        newCard.dataset.faction = e[i].faction || "N/A";
        newCard.dataset.class = e[i].playerClass;
        newCard.dataset.src = e[i].img || "images/blankCard.jpg";
        newCard.callback = addToFavorites;


        elementCardHolder.appendChild(newCard);
    }
    elementStatus.textContent = `Found ${count} Cards that matched your search!`;
    btnSearch.classList.remove("is-loading");

}


const addToFavorites = (cardObj) => {//add to favorites

    storage.addFavorite(cardObj);
    console.log("cardObj=", cardObj);

    //if cardObj has dbfId property,  then call pushLikedCardToCloud
    //only shows card fronts
    if (cardObj.hasOwnProperty('dbfId')) {
        console.log("to cloud");
        pushLikedCardToCloud(cardObj);


    }
};
//----------------------------------------------------------------------------//



//--------------------Add Events to buttons---------------------//
btnSearch.addEventListener("click", function () {//All searches have a class attachted.
    btnSearch.classList.add("is-loading");
    let x = document.querySelector("#field-class").value;
    x = x.split(' ').join('%20');
    let classLink = `https://omgvamp-hearthstone-v1.p.rapidapi.com/cards/classes/${x}`;
    console.log("class =", classLink);
    helper(classLink, classCallBack2);


});

btnCardBack.addEventListener("click", function () {//Card back search, ignores search fields
    btnCardBack.classList.add("is-loading");
    let link = "https://omgvamp-hearthstone-v1.p.rapidapi.com/cardbacks";
    helper(link, cardBack);

});

btnClearAll.addEventListener("click", function () {//Clears all cards from results field

    document.querySelector("#element-card-holder").innerHTML = ``;
    console.log("cards cleared");
    elementStatus.textContent = `Cards Cleared`;
});
//----------------------------------------------------------------------------//



function noCards() {//if no cards are found
    btnSearch.classList.remove("is-loading");
    elementStatus.textContent = `Try a different search!`;
    document.querySelector("#element-card-holder").innerHTML = `<div>Looks like there were no cards that meet your criteria</div>`;
}





