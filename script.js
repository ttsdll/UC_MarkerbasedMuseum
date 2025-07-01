// Marker-Namen & Zuordnung
const markers = [
  {
    id: "300sl",
    title: "Mercedes-Benz 300 SL",
    description: "Ein Platzhaltertext zur Geschichte des 300 SL.",
    image: "300sl.jpg",
    soundId: "sound-300sl"
  },
  {
    id: "gclass",
    title: "Mercedes-Benz G-Klasse",
    description: "Ein Platzhaltertext zur legendären G-Klasse.",
    image: "gclass.jpg",
    soundId: "sound-gclass"
  },
  {
    id: "slrmclaren",
    title: "Mercedes-Benz SLR McLaren",
    description: "Ein Platzhaltertext zum sportlichen SLR McLaren.",
    image: "slrmclaren.jpg",
    soundId: "sound-slrmclaren"
  }
];

// Zustand
const collected = new Set();
let currentMarkerId = null;

// DOM-Elemente
const overlay = document.getElementById("info-overlay");
const imageElem = document.getElementById("vehicle-image");
const titleElem = document.getElementById("vehicle-title");
const descElem = document.getElementById("vehicle-description");
const collectBtn = document.getElementById("collect-btn");
const pointsDisplay = document.getElementById("points");

// Wenn Szene geladen ist, Marker dynamisch hinzufügen
document.querySelector("a-scene").addEventListener("loaded", () => {
  const scene = document.querySelector("a-scene");

  markers.forEach(marker => {
    const aMarker = document.createElement("a-marker");
    aMarker.setAttribute("type", "pattern");
    aMarker.setAttribute("url", `${marker.id}.patt`);
    aMarker.setAttribute("id", `marker-${marker.id}`);

    // Optionales Testobjekt im Raum
    const ring = document.createElement("a-ring");
    ring.setAttribute("color", "#00ffff");
    ring.setAttribute("radius-inner", "0.1");
    ring.setAttribute("radius-outer", "0.15");
    ring.setAttribute("position", "0 0.05 0");
    ring.setAttribute("rotation", "-90 0 0");
    aMarker.appendChild(ring);

    // Wenn Marker erkannt wird
    aMarker.addEventListener("markerFound", () => {
      if (!collected.has(marker.id)) {
        currentMarkerId = marker.id;
        showOverlay(marker);
        playSound(marker.soundId);
      }
    });

    scene.appendChild(aMarker);
  });
});

// Overlay anzeigen
function showOverlay(marker) {
  titleElem.textContent = marker.title;
  descElem.textContent = marker.description;
  imageElem.src = marker.image;
  overlay.classList.remove("hidden");
}

// Sound abspielen
function playSound(soundId) {
  const sound = document.getElementById(soundId);
  if (sound) sound.play();
}

// Button "Sammeln"
collectBtn.addEventListener("click", () => {
  if (currentMarkerId && !collected.has(currentMarkerId)) {
    collected.add(currentMarkerId);
    pointsDisplay.textContent = collected.size;

    if (collected.size === markers.length) {
      setTimeout(() => {
        window.location.href = "endscreen.html";
      }, 1000);
    }
  }

  overlay.classList.add("hidden");
  currentMarkerId = null;
});
