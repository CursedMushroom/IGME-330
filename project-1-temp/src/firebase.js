//-------------------Sets up pushing to cloud with firebase---------------------//
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js";
import { getDatabase, ref, set, push, onValue, increment } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyB6fjSGSjrqEZ06x5btiXApMG4lpDW26HE",
    authDomain: "hearthstone-cards-b4183.firebaseapp.com",
    projectId: "hearthstone-cards-b4183",
    storageBucket: "hearthstone-cards-b4183.appspot.com",
    messagingSenderId: "574993511743",
    appId: "1:574993511743:web:5793620fa9e7c0122e8f8a"
};

const likedcardsPath = "favorite/";

const pushLikedCardToCloud = card => {
    console.log(card);
    const db = getDatabase();
    const favRef = ref(db, `${likedcardsPath}${card.dbfId}`);
    set(favRef, {
        dbfId: card.dbfId,
        title: card.title,
        img: card.img,
        text: card.text,
        likes: increment(1),
    });
};


const app = initializeApp(firebaseConfig);
console.log(app);
const db = getDatabase();

export { db, likedcardsPath, ref, set, push, pushLikedCardToCloud, onValue };