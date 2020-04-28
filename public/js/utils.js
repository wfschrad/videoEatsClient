export const handleErrors = async (err) => {
	if (err.status >= 400 && err.status < 600) {
		const errorJSON = await err.json();
		const errorsContainer = document.querySelector('.errors-container');
		let errorsHtml = [
			`
        <div class="alert alert-danger">
            Something went wrong. Please try again.
        </div>
      `
		];
		const { errors } = errorJSON;
		if (errors && Array.isArray(errors)) {
			errorsHtml = errors.map(
				(message) => `
          <div class="alert alert-danger">
              ${message}
          </div>
        `
			);
		}
		errorsContainer.innerHTML = errorsHtml.join('');
	}
	// else {
	// 	alert('Something went wrong. Please check your internet connection and try again!');
	// }
};

export const api = document.querySelector('link[rel="api"]').href;

export const addMarkers = (map, targets) => {
	//window.initMap = () => {
	const sf = { lat: 37.773, lng: -122.431 };
	const test2 = { lat: 37.777, lng: -122.418 };
	const test3 = { lat: 37.779, lng: -122.421 };
	const test4 = { lat: 37.772, lng: -122.414 };

	//icons
	const blueFlagIcon = 'http://maps.google.com/mapfiles/ms/icons/flag.png';
	const purpleIcon = 'http://maps.google.com/mapfiles/ms/icons/purple.png';
	const purpleIconDot = 'http://maps.google.com/mapfiles/ms/icons/purple-dot.png';

	// const options = {
	// 	center: sf,
	// 	zoom: 13
	// };
	// const map = new google.maps.Map(document.getElementById('map'),
	// 	options);

	const markers = [
		{ coords: sf, iconImage: purpleIcon, content: '<h3>Resto Info' },
		{ coords: test2, iconImage: purpleIconDot, content: '<h3>Resto Info' },
		{ coords: test3, iconImage: blueFlagIcon, content: '<h3>Resto Info' }
	];

	markers.forEach((props) => {
		addMarker(props);
	});

	function addMarker(props) {
		const marker = new google.maps.Marker({
			position: props.coords,
			map: map
		});

		if (props.iconImage) {
			marker.setIcon(props.iconImage);
		}
		//check content
		if (props.content) {
			const infoWindow = new google.maps.InfoWindow({
				content: props.content
			});
			marker.addListener('mouseover', () => {
				infoWindow.open(map, marker);
			});
			marker.addListener('mouseout', () => {
				infoWindow.close(map, marker);
			});
		}
	}
	//}
};
