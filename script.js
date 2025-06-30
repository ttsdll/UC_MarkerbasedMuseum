// Marker-IDs
const markerIds = [1, 2, 3, 4, 5];
const collected = new Set();
let currentMarker = null;

// Info-Texte für die Fahrzeuge
const vehicleInfos = {
  1: { title: "Mercedes-Benz 300 SL", description: "Der ikonische Flügeltürer aus den 1950er Jahren." },
  2: { title: "Mercedes-Benz G-Klasse", description: "Legendärer Geländewagen mit starkem Charakter." },
  3: { title: "Mercedes-Benz EQS", description: "Vollelektrisches Luxusmodell – elegant und modern." },
  4: { title: "Mercedes-Benz C 111", description: "Futuristisches Forschungsfahrzeug mit Wankelmotor." },
  5: { title: "Mercedes-Benz Silberpfeil", description: "Die Rennsportlegende mit Stil und Geschichte." }
};

// HUD & Overlay-Elemente
const pointsDisplay = document.getElementById("points");
const overlay = document.getElementById("info-overlay");
const overlayTitle = document.getElementById("vehicle-title");
const overlayDesc = document.getElementById("vehicle-description");
const collectBtn = document.getElementById("collect-btn");

// AR-Logik
document.querySelector('a-scene').addEventListener('loaded', () => {
  markerIds.forEach(id => {
    const marker = document.createElement('a-marker');
    marker.setAttribute('type', 'pattern');
    marker.setAttribute('url', `Marker${id}.patt`);
    marker.setAttribute('id', `marker-${id}`);

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

    document.querySelector("a-scene").appendChild(marker);
  });
});

// Info-Overlay anzeigen
function showOverlay(id) {
  const info = vehicleInfos[id];
  if (!info) return;

  overlayTitle.textContent = info.title;
  overlayDesc.textContent = info.description;
  overlay.classList.remove("hidden");
}

// Button zum Sammeln
collectBtn.addEventListener("click", () => {
  if (currentMarker !== null && !collected.has(currentMarker)) {
    collected.add(currentMarker);
    pointsDisplay.textContent = collected.size;

    if (collected.size === markerIds.length) {
      alert("🎉 Du hast alle Fahrzeuge gesammelt!");
    }
  }

  overlay.classList.add("hidden");
  currentMarker = null;
});
