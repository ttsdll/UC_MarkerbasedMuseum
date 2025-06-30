const markerIds = [1, 2, 3, 4, 5];

const vehicleInfos = {
  1: { title: "Mercedes-Benz 300 SL", description: "Der ikonische Flügeltürer …" },
  2: { title: "Mercedes-Benz G-Klasse", description: "Legendärer Geländewagen …" },
  3: { title: "Mercedes-Benz EQS", description: "Vollelektrisch, futuristisch …" },
  4: { title: "Mercedes-Benz C 111", description: "Forschungsfahrzeug mit Wankelmotor …" },
  5: { title: "Mercedes-Benz Silberpfeil", description: "Rennsportgeschichte pur …" }
};

const collected = new Set();
let currentMarkerId = null;

const pointsDisplay = document.getElementById("points");
const overlay = document.getElementById("info-overlay");
const overlayTitle = document.getElementById("vehicle-title");
const overlayDesc = document.getElementById("vehicle-description");
const collectBtn = document.getElementById("collect-btn");

document.addEventListener("DOMContentLoaded", () => {
  markerIds.forEach(id => {
    const marker = document.getElementById(`marker-${id}`);
    if (!marker) return;

    marker.addEventListener("markerFound", () => {
      if (!collected.has(id)) {
        currentMarkerId = id;
        showOverlay(id);
      }
    });
  });
});

function showOverlay(id) {
  const info = vehicleInfos[id];
  if (!info) return;

  overlayTitle.textContent = info.title;
  overlayDesc.textContent = info.description;
  overlay.classList.remove("hidden");
}

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
