let collected = false;

// DOM-Elemente
const overlay = document.getElementById("info-overlay");
const imageElem = document.getElementById("vehicle-image");
const titleElem = document.getElementById("vehicle-title");
const descElem = document.getElementById("vehicle-description");
const collectBtn = document.getElementById("collect-btn");
const pointsDisplay = document.getElementById("points");
const sound = document.getElementById("300sl-sound");

// Marker erkennen
document.addEventListener("DOMContentLoaded", () => {
  const hiroMarker = document.querySelector("#marker-hiro");

  hiroMarker.addEventListener("markerFound", () => {
    if (!collected) {
      overlay.classList.remove("hidden");
      playSound();
    }
  });
});

// Button klicken
collectBtn.addEventListener("click", () => {
  if (!collected) {
    collected = true;
    pointsDisplay.textContent = "1";
    overlay.classList.add("hidden");
  }
});

// Sound abspielen
function playSound() {
  if (sound && sound.paused) {
    sound.currentTime = 0;
    sound.play().catch((e) => console.warn("Audio-Fehler:", e));
  }
}
