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

	const url = window.location.href;
	console.log(url);

	function generateCards(businesses) {
		const businessCardsHTML = businesses.map((business) => {
			return `
				<a class="business-cards" href="/businesses/${business.id}">
					<div class="card mt-2 stars-business" id="business-${business.id}">
						<div class="card-body">
							<h3 class="card-text">${business.name}</h3>
							<div class="stars">
								<span class="business-star star-${business.id}"></span>
								<span class="business-star star-${business.id}"></span>
								<span class="business-star star-${business.id}"></span>
								<span class="business-star star-${business.id}"></span>
								<span class="business-star star-${business.id}"></span>
							</div>
							<div class="card-text">${business.phoneNum}</div>
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
			const res = await fetch('http://localhost:8080/businesses/search', {
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
		} catch (err) {
			console.error(err);
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

	// check to see if there is already a search value in the session storage
	const sessionSearchValue = sessionStorage.getItem('SEARCH_VALUE');
	if (sessionSearchValue) {
		document.getElementById('navbarSearch').value = sessionSearchValue;
		const body = {
			name: sessionSearchValue
		};
		fetchBusinessSearch(body);
	}

	// set up the event listener for the submit button
	navbarSearchForm.addEventListener('submit', async (e) => {
		// Prevent the default behavior of the submit button
		e.preventDefault();
		//TODO: when implementing search functionality

		const searchValue = document.getElementById('navbarSearch').value;
		sessionStorage.setItem('SEARCH_VALUE', searchValue);
		const body = {
			name: searchValue
		};
		fetchBusinessSearch(body);
	});
});
