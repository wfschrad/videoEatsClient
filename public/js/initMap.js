// window.initMap = () => {
// 	import makeMap from ('./utils');
// 	makeMap();
// }
// console.log('make that map dog')
//makeMap();

window.initMap = () => {
	const sf = { lat: 37.773, lng: -122.431 };
	const test2 = { lat: 37.777, lng: -122.418 };
	const test3 = { lat: 37.779, lng: -122.421 };
	const test4 = { lat: 37.772, lng: -122.414 };

	//icons
	const blueFlagIcon = 'http://maps.google.com/mapfiles/ms/icons/flag.png';
	const purpleIcon = 'http://maps.google.com/mapfiles/ms/icons/purple.png';
	const purpleIconDot = 'http://maps.google.com/mapfiles/ms/icons/purple-dot.png';


	const options = {
		center: sf,
		zoom: 13
	};
	const map = new google.maps.Map(document.getElementById('map'),
		options);

	const marker = new google.maps.Marker({
		position: test2,
		map: map
	});
}
