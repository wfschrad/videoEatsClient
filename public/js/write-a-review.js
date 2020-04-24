document.addEventListener('DOMContentLoaded', async () => {
	const reviewForm = document.querySelector('.create-review');
	let stars = document.querySelectorAll('.star');
	// Not using the business Search at this time **4/22/2020**
	// const businessSearch = document.getElementById('businessName');

	// Declare vairables for url
	const url = location.href;
	const urlSplit = url.split('/');
	const id = urlSplit[4];

	// JavaScript to handle the stars
	// Add the event listening click with the callback function to set the rating for each star
	stars.forEach((star) => {
		star.addEventListener('click', setRating);
	});

	// getting the value from 'data-rating' and parsing it into a number
	let rating = parseInt(document.querySelector('.stars').getAttribute('data-rating'));
	// create the target variable and set that to the value within the array
	let target = stars[rating - 1];
	// creating a custom event for the target variable. dispatchEvent will cause the eventlistener to go through in sequential order
	target.dispatchEvent(new MouseEvent('click'));

	function setRating(ev) {
		let span = ev.currentTarget;
		let stars = document.querySelectorAll('.star');
		let match = false;
		let num = 0;
		stars.forEach((star, index) => {
			if (match) {
				star.classList.remove('rated');
			} else {
				star.classList.add('rated');
			}
			// are we currently looking at the span that was clicked?
			if (star === span) {
				match = true;
				num = index + 1;
			}
		});
		document.querySelector('.stars').setAttribute('data-rating', num);
		rating = num;
	}

	// Event listener to handle the submission of the review form
	reviewForm.addEventListener('submit', async (e) => {
		// prevents the default of the submit button
		e.preventDefault();

		// Declare varibles to store and be parsed as a post method for the buisness
		const formData = new FormData(reviewForm);
		let reviewText = formData.get('reviewText');
		let videoLink = formData.get('videoLink');

		// Logic to set the typeId
		let typeId;
		if (reviewText !== '' && videoLink === '') {
			// Text only
			typeId = 2;
		} else if (reviewText === '' && videoLink !== '') {
			// Video only
			typeId = 1;
		} else {
			// mixed
			typeId = 3;
		}

		// storing all the values that are required into the body variable to be parsed into JSON during the POST response
		const body = {
			review: {
				businessId: id,
				reviewText,
				userId: localStorage.getItem('VIDEO_EATS_CURRENT_USER_ID'),
				typeId: typeId,
				upVoteCount: 0,
				downVoteCount: 0,
				businessRating: rating,
				videoLink: videoLink
			}
		};

		// TODO: Create the event listener keyup for the business name search. this is a stretch goal.
		try {
			const res = await fetch(`http://localhost:8080/businesses/${id}/reviews`, {
				method: 'POST',
				body: JSON.stringify(body),
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${localStorage.getItem('VIDEO_EATS_ACCESS_TOKEN')}`
				}
			});
			if (!res.ok) {
				throw res;
			}

			window.location.href = `/businesses/${id}`;
		} catch (err) {
			if (err.status === 401) {
				window.location.href = '/log-in';
			}
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
                            ${message.message}
                        </div>
                        `
					);
				}
				errorsContainer.innerHTML = errorsHtml.join('');
			} else {
				alert('Something went wrong. Please check your internet connection and try again!');
			}
		}
	});

	// Handling the click event for cancel
	const cancelReview = document.getElementById('reivew-cancel-button');
	cancelReview.addEventListener('click', () => {
		location.href = `/businesses/${id}`;
	});
});
