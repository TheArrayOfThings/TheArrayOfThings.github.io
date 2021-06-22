<script>
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
</script>
<script async defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyD82Y97n7A_rouMcx2clbLCH2TifSEWfgU&callback=initMap" type="text/javascript"></script>