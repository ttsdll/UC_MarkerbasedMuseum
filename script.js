// IDs der Barcode-Marker
const markerIds = [1, 2, 3, 4, 5];

// Zuordnung Fahrzeuginfos zu den Marker-Werten
const vehicleInfos = {
  1: {
    title: "Mercedes-Benz 300 SL",
    description: "Der ikonische Flügeltürer aus den 1950er Jahren – ein Meilenstein des Designs und der Technik."
  },
  2: {
    title: "Mercedes-Benz G-Klasse",
    description: "Die legendäre Geländewagen-Ikone mit unverkennbarem Design und unübertroffener Robustheit."
  },
  3: {
    title: "Mercedes-Benz EQS",
    description: "Das erste vollelektrische Luxusmodell von Mercedes. Futuristisch, elegant und innovativ."
  },
  4: {
    title: "Mercedes-Benz C 111",
    description: "Ein Forschungsfahrzeug mit Wankelmotor und futuristischem Design aus den 1970er Jahren."
  },
  5: {
    title: "Mercedes-Benz Silberpfeil",
    description: "Die Rennsportlegende mit enormer Geschwindigkeit. Ein Symbol für Motorsport-Geschichte."
  }
};

// Gesammelte Marker
const collected = new Set();
let currentMarkerId = null;

// HUD & Overlay
const pointsDisplay = document.getElementById("points");
const overlay = document.getElementById("info-overlay");
const overlayTitle = document.getElementById("vehicle-title");
const overlayDesc = document.getElementById("vehicle-description");
const collectBtn = document.getElementById("collect-btn");

document.addEventListener("DOMContentLoaded", () => {
  const scene = document.querySelector("a-scene");

  markerIds.forEach(id => {
    const marker = document.createElement("a-marker");
    marker.setAttribute("type", "barcode");
    marker.setAttribute("value", id);
    marker.setAttribute("id", `marker-${id}`);

    // Optional: visuelles Feedback im Marker
    const ring = document.createElement("a-ring");
    ring.setAttribute("color", "#00ffff");
    ring.setAttribute("radius-inner", "0.1");
    ring.setAttribute("radius-outer", "0.15");
    ring.setAttribute("position", "0 0.05 0");
    ring.setAttribute("rotation", "-90 0 0");
    marker.appendChild(ring);

    marker.addEventListener("markerFound", () => {
      if (!collected.has(id)) {
        currentMarkerId = id;
        showOverlay(id);
      }
    });

    scene.appendChild(marker);
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

// Marker als gesammelt markieren
collectBtn.addEventListener("click", () => {
  if (currentMarkerId && !collected.has(currentMarkerId)) {
    collected.add(currentMarkerId);
    pointsDisplay.textContent = collected.size;

    if (collected.size === markerIds.length) {
      alert("🎉 Du hast alle Fahrzeuge gesammelt!");
    }
  }

  overlay.classList.add("hidden");
  currentMarkerId = null;
});
