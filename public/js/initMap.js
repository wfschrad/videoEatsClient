var map;
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 37.773, lng: -122.431 },
        zoom: 13
    });
}