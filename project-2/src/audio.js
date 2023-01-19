let audio = document.querySelector("#audio");

document.querySelector("#audio-btn").addEventListener("click", togglePlay);

let isPlaying = false;
function togglePlay() {
    if (isPlaying) {
        document.querySelector("#audio-btn").innerHTML="Play Music";
        audio.pause()
    } else {
        document.querySelector("#audio-btn").innerHTML="Pause Music";
        audio.play();
    }
};
audio.onplaying = function () {
    isPlaying = true; 
};
audio.onpause = function () {
    isPlaying = false;
};