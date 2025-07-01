let collected = false;

// DOM-Elemente
const overlay = document.getElementById("info-overlay");
const imageElem = document.getElementById("vehicle-image");
const titleElem = document.getElementById("vehicle-title");
const descElem = document.getElementById("vehicle-description");
const collectBtn = document.getElementById("collect-btn");
const pointsDisplay = document.getElementById("points");
const sound = document.getElementById("sound-300sl"); // Audio-ID aktualisiert

// Daten zum Fahrzeug (optional dynamisch erweiterbar)
const vehicleData = {
  title: "Mercedes-Benz 300 SL",
  description: "Der ikonische Flügeltürer aus den 1950er Jahren. Eine Legende des Designs und der Technik.",
  image: "300sl_image.jpg"
};

// Marker erkennen
document.addEventListener("DOMContentLoaded", () => {
  const hiroMarker = document.querySelector("#marker-hiro");

  hiroMarker.addEventListener("markerFound", () => {
    if (!collected) {
      // Setze Inhalte
      titleElem.textContent = vehicleData.title;
      descElem.textContent = vehicleData.description;
      imageElem.src = vehicleData.image;

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

    // ⏳ Nach 1 Sekunde zur Endseite weiterleiten
    setTimeout(() => {
      window.location.href = "endscreen.html";
    }, 1000);
  }
});

// Sound abspielen
function playSound() {
  if (sound && sound.paused) {
    sound.currentTime = 0;
    sound.play().catch((e) => console.warn("Audio-Fehler:", e));
  }
}
  