function initMap() {
	let map, infoWindow;
	console.log("Starting to render map...");
	map = new google.maps.Map(document.getElementById('map'), {
		zoom: 10,
		center: {
			lat: 50.574043351632646,
			lng: -3.925963623267205
		}
	});
	map.data.setStyle({
        fillColor: 'orange',
        strokeWeight: 1,
		fillOpacity: 0.5
    });
	map.data.loadGeoJson('https://thearrayofthings.github.io/Dartmoor/Resources/camping_webmap.geojson');
	map.data.setMap(map);
	infoWindow = new google.maps.InfoWindow();
	const locationButton = document.createElement("button");
	locationButton.textContent = "Pan to Current Location";
	locationButton.classList.add("custom-map-control-button");
	map.controls[google.maps.ControlPosition.TOP_CENTER].push(locationButton);
	locationButton.addEventListener("click", () => {
    // Try HTML5 geolocation.
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          infoWindow.setPosition(pos);
          infoWindow.setContent("Location found.");
          infoWindow.open(map);
          map.setCenter(pos);
        },
        () => {
          handleLocationError(true, infoWindow, map.getCenter());
        }
      );
    } else {
      // Browser doesn't support Geolocation
      handleLocationError(false, infoWindow, map.getCenter());
    }
  });
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(
    browserHasGeolocation
      ? "Error: The Geolocation service failed."
      : "Error: Your browser doesn't support geolocation."
  );
  infoWindow.open(map);
}