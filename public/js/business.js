import { handleErrors, api } from './utils.js';

document.addEventListener('DOMContentLoaded', async () => {
	// get the url and split to get the business id
	const url = location.href;
	const urlSplit = url.split('/');
	const id = urlSplit[urlSplit.length - 1];

	//vote buttons

	// Handling the click event for write a review
	const writeReview = document.getElementById('write-a-review-button');
	writeReview.addEventListener('click', () => {
		location.href = url + '/write-a-review';
	});
	try {
		// get a fetch request to the backend api for reviews
		const res = await fetch(`${api}businesses/${id}/reviews`);

		// destructure to get the reviews array of objects
		const { reviews } = await res.json();
		console.log(reviews);

		// Finds the average of the ratings
		let ratingsArray = [];
		reviews.forEach((review) => {
			ratingsArray.push(parseInt(review.businessRating));
		});
		const sumRating = ratingsArray.reduce((a, b) => {
			return a + b;
		}, 0);
		const averageRating = sumRating / ratingsArray.length;
		const businessStars = document.querySelectorAll('.business-star');
		businessStars.forEach((star, index) => {
			if (averageRating > index) {
				star.classList.add('rated');
			} else {
				star.classList.remove('rated');
			}
		});
		document.querySelector('.stars-business').setAttribute('data-rating', averageRating);

		// render the reviews in cards

		//add vote buttons to review cards
		const reviewSection = document.querySelector('.review-section');

		const reviewCardsHTML = reviews.map((review) => {
			if (review.typeId === 1) {
				return `
				<div class="card mt-2" id="review-${review.id}">
					<div class="card-body">
						<div class="stars" data-rating="${review.businessRating}">
							<span class="star"></span>
							<span class="star"></span>
							<span class="star"></span>
							<span class="star"></span>
							<span class="star"></span>
						</div>
						<div class="video-review">
							<iframe width="560" height="315" src=${review.videoLink}></iframe>
						</div>
						<p <span class="card-text">${review.User.userName}</span> <button id="up-${review.id}" class="vote upVote">Like</button> <button id="down-${review.id}" class="vote downVote">Dislike</button></p>
						<p class="card-text">${review.createdAt.slice(5, 10) + '-' + review.createdAt.slice(0, 4)}</p>
					</div>
				</div>
				`;
			} else if (review.typeId === 2) {
				return `
				<div class="card mt-2" id="review-${review.id}">
					<div class="card-body">
						<div class="stars" data-rating="${review.businessRating}">
							<span class="star"></span>
							<span class="star"></span>
							<span class="star"></span>
							<span class="star"></span>
							<span class="star"></span>
						</div>
						<p class="card-text review-text">${review.reviewText}</p>
						<p <span class="card-text">${review.User.userName}</span> <button id="up-${review.id}" class="vote upVote">Like</button> <button id="down-${review.id}" class="vote downVote">Dislike</button></p>
						<p class="card-text">${review.createdAt.slice(5, 10) + '-' + review.createdAt.slice(0, 4)}</p>
					</div>
				</div>`;
			} else {
				return `
				<div class="card mt-2" id="review-${review.id}">
					<div class="card-body">
						<div class="stars" data-rating="${review.businessRating}">
							<span class="star"></span>
							<span class="star"></span>
							<span class="star"></span>
							<span class="star"></span>
							<span class="star"></span>
						</div>
						<p class="card-text review-text">${review.reviewText}</p>
						<div class="video-review">
							<iframe width="560" height="315" src=${review.videoLink}></iframe>
						</div>
						<p <span class="card-text">${review.User.userName}</span> <button id="up-${review.id}" class="vote upVote">Like</button> <button id="down-${review.id}" class="vote downVote">Dislike</button></p>
						<p class="card-text">${review.createdAt.slice(5, 10) + '-' + review.createdAt.slice(0, 4)}</p>
					</div>
				</div>`;
			}
		});
		reviewSection.innerHTML = reviewCardsHTML.join('');

		// Individual ratings from reviews
		const reviewCard = document.querySelectorAll('.card');
		reviewCard.forEach((review) => {
			const stars = review.querySelectorAll('.star');
			const rating = review.querySelector('.stars').getAttribute('data-rating');
			stars.forEach((star, index) => {
				if (rating > index) {
					star.classList.add('rated');
				} else {
					star.classList.remove('rated');
				}
			});
			document.querySelector('.stars').setAttribute('data-rating', rating);
		});
	} catch (err) {
		handleErrors(err);
	}

	//add listeners for vote buttons
	const upVoteBtns = document.querySelectorAll('.upVote');
	const downVoteBtns = document.querySelectorAll('.downVote');
	console.log('upVoteBtns', upVoteBtns);
	console.log('downVoteBtns', downVoteBtns);

	for (let btn of upVoteBtns) {
		btn.addEventListener('click', (ev) => {
			console.log('target', ev.target);
			console.log('targetId', ev.target.id)
			btn.disabled = true;
			btn.classList.add('clicked');
			const toggleTargetId = `down-${ev.target.id.slice(3)}`;
			const btnMirror = document.getElementById(toggleTargetId)
			btnMirror.disabled = false;
			btnMirror.classList.remove('clicked');
		})
	}

	for (let btn of downVoteBtns) {
		btn.addEventListener('click', (ev) => {
			btn.disabled = true;
			btn.classList.add('clicked');
			const toggleTargetId = `up-${ev.target.id.slice(5)}`;
			const btnMirror = document.getElementById(toggleTargetId)
			btnMirror.disabled = false;
			btnMirror.classList.remove('clicked');
		})
	}


});
