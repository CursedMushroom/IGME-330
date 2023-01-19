function randomIntinRange(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}
function randomFWD() {
    let rand = Math.round(Math.random()) * 2 - 1;
    return rand;
}

export{randomIntinRange,randomFWD};