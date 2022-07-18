mapboxgl.accessToken =
  "pk.eyJ1Ijoibmljc29saXRvbSIsImEiOiJjbDVvZnB3OHIxZGFiM3BwYW5sYzdjNW9nIn0.2IFeF9luDB88K038V1AqRw";
const map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/mapbox/streets-v11",
  zoom: 1,
  center: [52.53196, 13.4037],
});

// Fetch arts from API
async function getArts() {
  const res = await fetch("/api/v1/art-locations");
  const data = await res.json();

  const arts = data.data.map((art) => {
    return {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [art.location.coordinates[0], art.location.coordinates[1]],
      },
      properties: {
        artId: 0001,
        icon: "shop",
      },
    };
  });

  loadMap(arts);
}
// Load map with stores
function loadMap(arts) {
  map.on("load", function () {
    map.addControl(new mapboxgl.NavigationControl());
    map.addLayer({
      id: "points",
      type: "symbol",
      source: {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: arts,
        },
      },
      layout: {
        "icon-image": "{icon}-15",
        "icon-size": 1.5,
        "text-field": "{artId}",
        "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
        "text-offset": [0, 0.9],
        "text-anchor": "top",
      },
    });
  });
}

getArts();

