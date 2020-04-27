import { handleErrors, api, addMarkers } from './utils.js';

window.initMap = (targets) => {
	const sf = { lat: 37.773, lng: -122.431 };

	//icons
	const blueFlagIcon = 'http://maps.google.com/mapfiles/ms/icons/flag.png';
	const purpleIcon = 'http://maps.google.com/mapfiles/ms/icons/purple.png';
	const purpleIconDot = 'http://maps.google.com/mapfiles/ms/icons/purple-dot.png';

	const options = {
		center: sf,
		zoom: 13
	};
	const map = new google.maps.Map(document.getElementById('map'), options);

	console.log('targets: ', targets);
	if (targets) {
		targets.forEach((target) => {
			addMarker({
				coords: { lat: parseFloat(target.lat), lng: parseFloat(target.lon) },
				iconImage: purpleIconDot,
				content: `<h5>${target.name}</h5> <h6> - ${target.averageRating} Stars</h6>`
			});
		});
	}

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
};

document.addEventListener('DOMContentLoaded', (e) => {
	// NavBar Selectors
	const navbarSearchForm = document.querySelector('.navbar-search');
	const searchButton = document.getElementById('search-btn');
	const dropDown = document.querySelector('.dropdown');
	const dropDownToggle = document.querySelector('.dropdown-toggle');
	const dropDownMenu = document.querySelector('.dropdown-menu');
	const dropDownName = document.getElementById('item-name');
	const dropDownLocation = document.getElementById('item-location');
	const dropDownTag = document.getElementById('item-tag');
	const searchField = document.querySelector('.searchField');
	const collapseButton = document.querySelector('.navbar-collapse');

	let sessionSearchValue = sessionStorage.getItem('SEARCH_VALUE');
	if (sessionSearchValue) {
		document.getElementById('navbarSearch').value = sessionSearchValue;
		const body = {
			name: sessionSearchValue
		};
		console.log('BODY (105', body);
		fetchBusinessSearch(body);
		//window.location.href = '/search';
	}

	function generateCards(businesses) {
		const businessCardsHTML = businesses.map((business) => {
			return `
				<a class="business-cards" href="/businesses/${business.id}">
					<div class="card mt-2 stars-business" id="business-${business.id}">
						<div class="card-body">
							<div class="card-text-name">${business.name}</div>
							<div class="stars">
								<span class="business-star star-${business.id}"></span>
								<span class="business-star star-${business.id}"></span>
								<span class="business-star star-${business.id}"></span>
								<span class="business-star star-${business.id}"></span>
								<span class="business-star star-${business.id}"></span>
							</div>
							<h3 class="card-text">${business.Tag.type}</h3>
							<div class="card-text">${business.address}</div>
						</div>
					</div>
				</a>
				`;
		});
		businessCardContainer.innerHTML = businessCardsHTML.join('');
	}
	function findAverageRating(businesses) {
		businesses.forEach((business) => {
			let ratingsArray = [];
			business.Reviews.forEach((rating) => {
				ratingsArray.push(parseInt(rating.businessRating));
			});
			const sumRating = ratingsArray.reduce((a, b) => {
				return a + b;
			}, 0);
			const averageRating = sumRating / ratingsArray.length;
			business.averageRating = averageRating;
			const businessStars = document.querySelectorAll(`.star-${business.id}`);
			businessStars.forEach((star, index) => {
				if (averageRating > index) {
					star.classList.add('rated');
				} else {
					star.classList.remove('rated');
				}
			});
			const businessId = document.getElementById(`business-${business.id}`);
			businessId.setAttribute('data-rating', averageRating);
		});
	}

	async function fetchBusinessSearch(body) {
		try {
			const res = await fetch(`${api}businesses/search`, {
				method: 'POST',
				body: JSON.stringify(body),
				headers: {
					'Content-Type': 'application/json'
				}
			});

			const { businesses } = await res.json();

			// declare ratings array to store the ratings
			generateCards(businesses);
			findAverageRating(businesses);
			//addMapMarkers(businesses);
			document.getElementById('map').classList.remove('map-default');
			window.initMap(businesses);

			//pin locations currently do not persist. Better to not persist search results to match functionality?
			//dynamically adjust styling for map div height?
		} catch (err) {
			handleErrors(err);
		}
	}

	// Business selectors
	const businessCardContainer = document.querySelector('.business-card-container');

	dropDown.addEventListener('click', () => {
		document.querySelector('.dropdown-menu').classList.toggle('show');
	});
	collapseButton.addEventListener('click', () => {
		// TODO: show collapsed elements when clicking button
		collapseButton.classList.toggle('show');
	});
	dropDownMenu.addEventListener('click', (event) => {
		// help me dry up this code please
		console.log(event.target);
		if (event.target === dropDownName) {
			dropDownToggle.innerHTML = 'Search for: ' + dropDownName.innerHTML;
			searchField.placeholder = '< ' + dropDownName.innerHTML + ' >';
		} else if (event.target === dropDownLocation) {
			dropDownToggle.innerHTML = 'Search for: ' + dropDownLocation.innerHTML;
			searchField.placeholder = dropDownLocation.innerHTML;
		} else if (event.target === dropDownTag) {
			dropDownToggle.innerHTML = 'Search for: ' + dropDownTag.innerHTML;
			searchField.placeholder = dropDownTag.innerHTML;
		}
	});

	// set up the event listener for the submit button
	navbarSearchForm.addEventListener('submit', async (e) => {
		// Prevent the default behavior of the submit button
		e.preventDefault();
		window.location.href = '/search';
	});
});
