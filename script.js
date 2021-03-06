window.onload = () => {
  let places = staticLoadPlaces();
  renderPlaces(places);
};

function staticLoadPlaces() {
  return [
    {
      name: "Magnemite",
      location: {
        lat: 41.388137,
        lng: 2.1127288
      },
      isModel: true
    }
  ];
}

function renderPlaces(places) {
  let scene = document.querySelector("a-scene");

  places.forEach(place => {
    let latitude = place.location.lat;
    let longitude = place.location.lng;

    let model = document.createElement("a-entity");
    model.setAttribute(
      "gps-entity-place",
      `latitude: ${latitude}; longitude: ${longitude};`
    );
    if (model.isModel) {
      model.setAttribute("gltf-model", "./assets/magnemite/scene.gltf");
      model.setAttribute("rotation", "0 180 0");
    }
    model.setAttribute("animation-mixer", "");
    model.setAttribute("scale", "30 30 30");

    model.addEventListener("loaded", () => {
      window.dispatchEvent(new CustomEvent("gps-entity-place-loaded"));
    });

    scene.appendChild(model);
  });
}
