// Logic to Mute & Unmute
var soundContainer = document.querySelector(".sound");
var sound = document.querySelector(".sound i");

var onSound = true;

soundContainer.addEventListener("click", function () {
  onSound = !onSound;
  if (onSound) {
    sound.classList.remove("ri-volume-mute-fill");
    sound.classList.add("ri-volume-up-line");
    sound.style.color = "white";
  } else {
    sound.classList.remove("ri-volume-up-line");
    sound.classList.add("ri-volume-mute-fill");
    sound.style.color = "#ff0000";
  }
});

// custom curosr logic
var cursor = document.querySelector(".cursor");
var body = document.querySelector("body");

body.addEventListener("mousemove", function (dets) {
  cursor.style.left = dets.pageX + "px";
  cursor.style.top = dets.pageY + "px";
});

// piano keys logic

var keys = document.querySelectorAll(".key");
keys.forEach(function (key) {
  // For mouse click events
  // When mouse enters
  key.addEventListener("mousedown", function () {
    if (!onSound) return;
    var note = key.getAttribute("data-note");
    var audio = new Audio(`./sounds/${note}.mp3`);
    audio.play();
  });

  // When mouse leaves
  key.addEventListener("mouseup", function () {
    if (!onSound) return;
    var note = key.getAttribute("data-note");
    var audio = new Audio(`./sounds/${note}.mp3`);
    audio.pause();
    audio.currentTime = 0;
  });
});

// For keyboard events
// When any keyboard key is pressed
document.addEventListener("keydown", function (e) {
  let key = document.querySelector(`[data-key="${e.key.toLowerCase()}"]`);
  if (!key) return; // exit if key isn't mapped to our piano

  key.classList.add("active"); // add visual feedback on the piano key

  if (!onSound) return; // if muted, don't play sound

  let note = key.getAttribute("data-note"); // fetch note (C, D, E, etc.)
  let audio = new Audio(`./sounds/${note}.mp3`); // load audio file
  audio.play(); // play the sound
});

// When keyboard key is released
document.addEventListener("keyup", function (e) {
  let key = document.querySelector(`[data-key="${e.key.toLowerCase()}"]`);
  if (key) key.classList.remove("active"); // remove visual feedback
});
