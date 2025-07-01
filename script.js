let collected = false;

const collectBtn = document.getElementById("collect-btn");
const pointsDisplay = document.getElementById("points");
const sound = document.getElementById("sound-300sl");

document.addEventListener("DOMContentLoaded", () => {
  const marker = document.querySelector("#marker-hiro");

  marker.addEventListener("markerFound", () => {
    if (!collected) {
      collectBtn.classList.remove("hidden");
      collectBtn.classList.add("show", "pop-in");
      playSound();
    }
  });

  marker.addEventListener("markerLost", () => {
    if (!collected) {
      collectBtn.classList.add("hidden");
      collectBtn.classList.remove("show", "pop-in");
    }
  });

  collectBtn.addEventListener("click", () => {
    if (!collected) {
      collected = true;
      pointsDisplay.textContent = "1";
      collectBtn.classList.add("hidden");

      setTimeout(() => {
        window.location.href = "endscreen.html";
      }, 1000);
    }
  });
});

function playSound() {
  if (sound && sound.paused) {
    sound.currentTime = 0;
    sound.play().catch((e) => console.warn("Audio konnte nicht abgespielt werden:", e));
  }
}
