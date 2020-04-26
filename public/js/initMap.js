// document.addEventListener('DOMContentLoaded', () => {
// 	function initMap() {
// 		let map = new google.maps.Map(document.getElementById('map'), {
// 			center: { lat: 37.773, lng: -122.431 },
// 			zoom: 13
// 		});
// 		console.log(map);
// 	}
// 	initMap();
// });

// Create the script tag, set the appropriate attributes
// var map;
// var script = document.createElement('script');
// script.defer = true;
// script.async = true;

var map;
// Attach your callback function to the `window` object
window.initMap = function() {
	map = new google.maps.Map(document.getElementById('map'), {
		center: { lat: 37.773, lng: -122.431 },
		zoom: 13
	});
};

// Append the 'script' element to 'head'
// document.head.appendChild(script);
