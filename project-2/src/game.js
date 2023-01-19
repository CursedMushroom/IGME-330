import { Mushroom, Scary } from './classes.js';
import { randomIntinRange, randomFWD } from './utils.js';
let ctx;
let canvas;
let time;
let timeColor;
let backColor;
let weather;



let imag = [];

let isDragging = false;
let selected = null;

let creatureType = "";


const getMouse = (evt) => {
    const mouse = {};
    mouse.x = evt.pageX - evt.target.offsetLeft;
    mouse.y = evt.pageY - evt.target.offsetTop;
    return mouse;
}



let creatures = [];
let threats = [];
let weatherPart = [];
let crowns = [];
let presets = [];
let weatherCol;


let allImg = [
    'assets/images/tCreatureSing.png',//Mushroom
    'assets/images/floortemp.png',//floor
    'assets/images/tempDay.jpg',//day
    'assets/images/tempNight.jpg',//night
    'assets/images/tempRain.jpg',//rain
    'assets/images/tempSnow.jpg',//snow
    'assets/images/tTree.png',//tree
    'assets/images/tempCreature.png',//Scary creature
    'assets/images/sun.png',//sun
    'assets/images/moon.png',//moon
    'assets/images/tempCreatureRight.png',
    'assets/images/flowerMushroom.png',//Flower Mushroom
    'assets/images/flowercrown.png',//flowerCrown
]


function fetchJson() {
    fetch('./src/default.json')
        .then(response => {
            if (!response.ok) {
                console.log("not good");
            }
            return response.json();
        })
        .then(json => {
            presets = json;
            preloadImage(allImg, init);
        })
        .catch(function () {
            this.dataError = true;
        })
}



function preloadImage(urls, callback) {
    let images = [];
    let counter = 0;

    for (let url of urls) {


        let img = new Image();
        images.push(img);
        imag.push(img);

        img.onload = () => {
            counter++;
            if (counter == urls.length) callback(images);
        };

        img.onerror = _ => {

            console.log(`Image wouldn't load`);
        };

        img.src = url;
    }
}
function init(images) {

    canvas = document.querySelector("canvas");

    ctx = canvas.getContext("2d");

    canvas.onmousedown = doMousedown;
    canvas.onmousemove = doMousemove;
    canvas.onmouseup = doMouseUp;
    canvas.onmouseout = doMouseOut;

    time = presets["time"];
    timeColor = imag[presets["timeColor"]];
    weather = presets["weather"];
    backColor = imag[presets["backColor"]];

    creatureType = document.querySelector("#field-creature").value;

    document.querySelector("#add-create").addEventListener("click", addCreature);
    document.querySelector("#remove-create").addEventListener("click", removeCreature);
    document.querySelector("#flower-btn").addEventListener("click", flowerCrown);

    document.querySelector("#field-creature").onchange = e => {
        creatureType = document.querySelector("#field-creature").value;
    };
    document.querySelector("#field-weather").onchange = e => {
        if (document.querySelector("#field-weather").value == "Rain") {
            weather = "rain";
            rain();
        }
        if (document.querySelector("#field-weather").value == "Clear") {
            weather = "clear";
            clear();

        }
        if (document.querySelector("#field-weather").value == "Snow") {
            weather = "snow";
            snow();

        }
    };


    for (let i = 0; i < presets["startMushrooms"]; i++) {
        creatures.push(new Mushroom(randomIntinRange(120, 1100), randomIntinRange(427, 465), randomFWD(), images[0]));
    }

    loop();
}

function addCreature() {

    if (creatureType == "Mushroom") {
        creatures.push(new Mushroom(randomIntinRange(120, 1100), randomIntinRange(427, 465), randomFWD(), imag[0]));
    }
    if (creatureType == "Snail") {
        threats.push(new Scary(850, randomIntinRange(427, 465), randomFWD(), imag[7], imag[10]));
    }

}
function removeCreature() {
    if (creatureType == "Mushroom") {
        creatures.pop();
    }
    if (creatureType == "Snail") {
        threats.pop();
    }
}
function flowerCrown() {
    crowns.push({
        x: randomIntinRange(100, canvas.width),
        y: randomIntinRange(520, 525),
        width: 64,
        img: imag[12],
    }
    );

}

function clear() {
    backColor = imag[2];
    weatherPart = [];
};
function rain() {
    backColor = imag[4];
    weatherPart = [];
    weatherCol = "rgb(64, 89, 173)";
    for (let i = 0; i < 100; i++) {
        weatherPart.push({
            x: Math.round(randomIntinRange(400, canvas.width)),
            y: Math.round(Math.random() * canvas.height),
            width: 1.2,
            height: Math.round(randomIntinRange(10, 700)),
            speed: Math.round(randomIntinRange(10, 40)),
        });
    }


}
function snow() {

    backColor = imag[5];
    weatherPart = [];
    weatherCol = "white";
    for (let i = 0; i < 100; i++) {
        weatherPart.push({
            x: Math.round(randomIntinRange(400, canvas.width)),
            y: Math.round(Math.random() * canvas.height),
            width: 5,
            height: 5,
            speed: Math.round(randomIntinRange(10, 40)),
        });
    }
}



function loop() {
    setTimeout(() => {
        requestAnimationFrame(loop);
    }, 1000 / 10);


    ctx.save();
    ctx.drawImage(backColor, 0, 0);
    ctx.fillStyle = "red";
    ctx.drawImage(imag[1], 0, 520);


    ctx.drawImage(imag[6], 0, -10);

    ctx.drawImage(timeColor, 1100, 10);
    ctx.restore();


    if (weatherPart.length != 0) {
        ctx.save();

        for (let i = 0; i < weatherPart.length - 1; i++) {
            ctx.fillStyle = weatherCol;
            ctx.fillRect(weatherPart[i].x, weatherPart[i].y, weatherPart[i].width, weatherPart[i].height);
            weatherPart[i].y += weatherPart[i].speed;

            if (weatherPart[i].y > canvas.height) {
                weatherPart[i].y = 0 - weatherPart[i].height;
            }
        }



        ctx.restore();
    }

    ctx.save();
    if (crowns.length != 0) {
        for (let crown of crowns) {
            ctx.drawImage(crown.img, crown.x, crown.y);
        }
    }
    ctx.restore();




    ctx.save();

    for (let threat of threats) {
        threat.draw(ctx);
        threat.wander();

        if (threat.x > canvas.width - threat.spriteWidth) threat.reflectX();

        if (threat.x < 650) threat.reflectX();

    }
    ctx.restore();


    ctx.save();


    for (let thing of creatures) {
        thing.draw(ctx);

        if (time == "day") {
            if (thing.frozen != true) {

                if (weather == "clear") {
                    thing.speed = 200;
                    if (threats.length != 0) {
                        thing.seek(500, 545);
                    } else {
                        thing.wander();
                    }
                }
                if (weather == "rain") {
                    thing.speed = 200;
                    thing.seek(300, 345);
                }
                if (weather == "snow") {
                    thing.speed = 100;
                    thing.seek(300, 345);
                }

            }

        }
        if (thing.falling == true) {
            thing.fall();
        }
        if (thing.flung == true) {
            thing.fling();
        }
        if (time == 'night') {
            if (thing.flung == false && thing.falling == false) {
                thing.sleep();
            }


        }
        if (thing.x > canvas.width - thing.spriteWidth) thing.reflectX();

        if (thing.x < 100) thing.reflectX();

        if (crowns.length != 0) {
            for (let crown of crowns) {
                if (thing.x > crown.x
                    && thing.x < crown.x + crown.width) {
                    if (thing.image == imag[11]) {
                        return;
                    }
                    thing.image = imag[11];
                    crowns.splice(crown, 1);
                }
            }
        }

    }
    ctx.restore();
}




const doMousedown = (evt) => {
    const mouse = getMouse(evt);
    for (let thing of creatures) {
        if (mouse.x > thing.x
            && mouse.x < thing.x + thing.spriteWidth
            && mouse.y > thing.y
            && mouse.y < thing.y + thing.height
        ) {
            selected = creatures.indexOf(thing);

            if (document.querySelector("#field-clicked").value == "Drag") {
                isDragging = true;

            }
            if (document.querySelector("#field-clicked").value == "Fling") {

                creatures[selected].flung = true;


            }
            if (document.querySelector("#field-clicked").value == "Freeze") {
                if (creatures[selected].frozen == false) {
                    creatures[selected].freeze();

                    creatures[selected].frozen = true;
                    return;

                }
                if (creatures[selected].frozen == true) {
                    creatures[selected].wander();
                    creatures[selected].frozen = false;
                    return;

                }

            }

        }
    }


    if (mouse.x > 1200 - 100 &&
        mouse.x < 1200 + 100 &&
        mouse.y > 110 - 100 &&
        mouse.y < 110 + 100) {
        if (time == "day") {
            time = "night";

            timeColor = imag[9];
            backColor = imag[3];
            return;
        }
        if (time == "night") {
            time = "day";
            if (weather == "rain") {
                backColor = imag[4];
            }
            if (weather == "snow") {
                backColor = imag[5];
            }
            if (weather == "clear") {
                backColor = imag[2];
            }
            timeColor = imag[8];

            return;
        }
    }
}
const doMousemove = (evt) => {
    if (!isDragging) return;

    const mouse = getMouse(evt);
    creatures[selected].x = mouse.x;
    creatures[selected].y = mouse.y;
}
const doMouseUp = (evt) => {
    isDragging = false;
    if (selected != null) creatures[selected].y = 430;
    selected = null;
}
const doMouseOut = (evt) => {
    isDragging = false;
}




fetchJson();



