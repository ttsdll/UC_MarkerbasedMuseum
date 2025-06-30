const markerIds = [1, 2, 3, 4, 5];
const collected = new Set();
let currentMarker = null;

// Fahrzeuginformationen
const vehicleInfos = {
  1: { title: "Mercedes-Benz 300 SL", description: "Der ikonische Flügeltürer aus den 1950er Jahren." },
  2: { title: "Mercedes-Benz G-Klasse", description: "Robuster Geländewagen mit ikonischem Design." },
  3: { title: "Mercedes-Benz EQS", description: "Luxus-Elektrofahrzeug der neuesten Generation." },
  4: { title: "Mercedes-Benz C 111", description: "Futuristisches Forschungsfahrzeug mit Wankelmotor." },
  5: { title: "Mercedes-Benz Silberpfeil", description: "Historische Rennsport-Ikone mit Stil und Geschwindigkeit." }
};

// HUD-Elemente
const pointsDisplay = document.getElementById("points");
const overlay = document.getElementById("info-overlay");
const overlayTitle = document.getElementById("vehicle-title");
const overlayDesc = document.getElementById("vehicle-description");
const collectBtn = document.getElementById("collect-btn");

document.addEventListener("DOMContentLoaded", () => {
  const scene = document.querySelector("a-scene");

  markerIds.forEach(id => {
    const marker = document.createElement("a-marker");
    marker.setAttribute("type", "pattern");
    marker.setAttribute("url", `markers/marker${id}.patt`);
    marker.setAttribute("id", `marker-${id}`);

    const ring = document.createElement("a-ring");
    ring.setAttribute("color", "#00ffff");
    ring.setAttribute("radius-inner", "0.1");
    ring.setAttribute("radius-outer", "0.15");
    ring.setAttribute("position", "0 0.05 0");
    ring.setAttribute("rotation", "-90 0 0");
    marker.appendChild(ring);

    marker.addEventListener("markerFound", () => {
      if (!collected.has(id)) {
        currentMarker = id;
        showOverlay(id);
      }
    });

    scene.appendChild(marker);
  });
});

// Zeigt Overlay mit Fahrzeuginfos
function showOverlay(id) {
  const info = vehicleInfos[id];
  if (!info) return;

  overlayTitle.textContent = info.title;
  overlayDesc.textContent = info.description;
  overlay.classList.remove("hidden");
}

// Marker als „gesammelt“ markieren
collectBtn.addEventListener("click", () => {
  if (currentMarker && !collected.has(currentMarker)) {
    collected.add(currentMarker);
    pointsDisplay.textContent = collected.size;

    if (collected.size === markerIds.length) {
      alert("🎉 Du hast alle Fahrzeuge gesammelt!");
    }
  }

  overlay.classList.add("hidden");
  currentMarker = null;
});
