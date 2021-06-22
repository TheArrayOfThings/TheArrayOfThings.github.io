var map;

window.onload = initMap;

function initMap() {
	console.log("Starting to render map...");
	map = new google.maps.Map(document.getElementById('map'), {
		zoom: 10,
		center: {
			lat: 50.574043351632646,
			lng: -3.925963623267205
		}
	});
	console.log("Attempting to load geoJSON");
	map.data.loadGeoJson('https://thearrayofthings.github.io/Dartmoor/Resources/camping_webmap.json');
	
	map.data.setStyle({
        fillColor: 'green',
        strokeWeight: 1
    });
}

//50.574043351632646, -3.925963623267205