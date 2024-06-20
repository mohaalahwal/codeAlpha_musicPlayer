"use strict";
import { songs } from "./songsData.js";
console.log(songs);
const music = document.querySelector(".music"),
  thumpnail = music.querySelector(".thumpnail img"),
  songName = music.querySelector(".song__name"),
  artist = music.querySelector(".Artist"),
  range = music.querySelector(".range"),
  audio = music.querySelector(".audio audio"),
  shuffle = music.querySelector(".shuffle"),
  queue = music.querySelector(".queue"),
  rewind = music.querySelector(".rewind"),
  play = music.querySelector(".play"),
  forward = music.querySelector(".forward");

let songIdx = 1;
let isPlaying = false;
function loadMusic(index = songIdx - 1) {
  audio.src = songs[index].songSrc;
  thumpnail.src = songs[index].songPic;
  songName.textContent = songs[index].songName;
  artist.textContent = songs[index].artist;
}

function playSong() {
  loadMusic();
  audio.play();
  isPlaying = true;
  play.textContent = "pause_circle_filled";
}
function pauseSong() {
  audio.pause();
  isPlaying = false;
  play.textContent = "play_circle_filled";
}
window.addEventListener("load", function () {
  loadMusic();
});
audio.addEventListener("loadeddata", function () {
  range.min = 0;
  range.max = audio.duration;
  range.value = audio.currentTime;
});
audio.addEventListener("timeupdate", function () {
  range.min = 0;
  range.max = audio.duration;
  range.value = audio.currentTime;
});
range.addEventListener("change", function () {
  audio.currentTime = range.value;
});

play.addEventListener("click", function () {
  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
});
forward.addEventListener("click", function () {
  if (songIdx === songs.length) {
    songIdx = 1;
  } else {
    songIdx++;
  }
  loadMusic();
  playSong();
});
rewind.addEventListener("click", function () {
  if (songIdx === 1) {
    songIdx = songs.length;
  } else {
    songIdx--;
  }
  loadMusic();
  playSong();
});
