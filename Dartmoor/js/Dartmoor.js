var map;

function initMap() {
	map = new google.maps.Map(document.getElementById('map'), {
		zoom: 3,
		center: {
			lat: 39.8283,
			lng: -98.5795
		}
	});
}
initMap();