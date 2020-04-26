window.initMap = () => {
	const sf = { lat: 37.773, lng: -122.431 };
	const test2 = { lat: 37.777, lng: -122.418 };
	const test3 = { lat: 37.779, lng: -122.421 };
	const test4 = { lat: 37.772, lng: -122.414 };

	const options = {
		center: sf,
		zoom: 13
	};
	const map = new google.maps.Map(document.getElementById('map'),
		options);


	const markers = [
		{ coords: sf, iconImage: 'http://maps.google.com/mapfiles/ms/icons/flag.png', content: '<h3>Resto Info' },
		{ coords: test2, iconImage: 'http://maps.google.com/mapfiles/ms/icons/flag.png', content: '<h3>Resto Info' },
		{ coords: test3, iconImage: 'http://maps.google.com/mapfiles/ms/icons/flag.png', content: '<h3>Resto Info' },
		{ coords: test4, iconImage: 'http://maps.google.com/mapfiles/ms/icons/flag.png', content: '<h3>Resto Info' }
	];

	markers.forEach((props) => {
		addMarker(props);
	});
	// addMarker({
	//     coords: sf,
	//     iconImage: 'http://maps.google.com/mapfiles/ms/icons/flag.png',
	//     content: '<h3>Resto Info'
	// });
	// addMarker({
	//     coords: test2
	// });
	//addMarker({ postion: sf, map: map });

	// const marker = new google.maps.Marker({
	//     position: sf,
	//     map: map
	// });
	// const infoWindow = new google.maps.InfoWindow({
	//     content: '<h1>Test Info</h1>'
	// });
	// marker.addListener('click', () => {
	//     infoWindow.open(map, marker);
	// })

	function addMarker(props) {
		const marker = new google.maps.Marker({
			position: props.coords,
			map: map,
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
			})
		}
	}
}
