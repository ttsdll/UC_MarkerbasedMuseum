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

document.addEventListener("DOMContentLoaded", () => {
  const scene = document.querySelector("a-scene");
  const pointsDisplay = document.getElementById("points");
  const overlay = document.getElementById("info-overlay");
  const overlayTitle = document.getElementById("vehicle-title");
  const overlayDesc = document.getElementById("vehicle-description");
  const collectBtn = document.getElementById("collect-btn");

  markerIds.forEach(id => {
    // Marker erstellen
    const marker = document.createElement("a-marker");
    marker.setAttribute("type", "pattern");
    marker.setAttribute("url", `markers/marker${id}.patt`);
    marker.setAttribute("id", `marker-${id}`);

    // Optionaler visuell animierter Ring
    const ring = document.createElement("a-ring");
    ring.setAttribute("color", "#00ffff");
    ring.setAttribute("radius-inner", "0.1");
    ring.setAttribute("radius-outer", "0.15");
    ring.setAttribute("position", "0 0.05 0");
    ring.setAttribute("rotation", "-90 0 0");
    marker.appendChild(ring);

    // Event: Marker gefunden
    marker.addEventListener("markerFound", () => {
      if (!collected.has(id)) {
        currentMarkerId = id;
        const info = vehicleInfos[id];
        if (info) {
          overlayTitle.textContent = info.title;
          overlayDesc.textContent = info.description;
          overlay.classList.remove("hidden");
        }
      }
    });

    scene.appendChild(marker);
  });

  // Button: Fahrzeug sammeln
  collectBtn.addEventListener("click", () => {
    if (currentMarkerId && !collected.has(currentMarkerId)) {
      collected.add(currentMarkerId);
      pointsDisplay.textContent = collected.size;

      if (collected.size === markerIds.length) {
        alert("🎉 Du hast alle Fahrzeuge gesammelt!");
      }
    }

    document.getElementById("info-overlay").classList.add("hidden");
    currentMarkerId = null;
  });
});
