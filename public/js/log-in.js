import { handleErrors, api } from './utils.js';

if (localStorage.getItem('VIDEO_EATS_ACCESS_TOKEN')) {
	alert('You are already logged in!');
	window.history.back();
}
const logInForm = document.querySelector('.log-in-form');
const demoUser = document.getElementById('demo-user');

async function fetchUser(body) {
	try {
		const res = await fetch(`${api}users/token`, {
			method: 'POST',
			body: JSON.stringify(body),
			headers: {
				'Content-Type': 'application/json'
			}
		});
		if (!res.ok) {
			throw res;
		}
		const { token, user: { id } } = await res.json();
		// storage access_token in localStorage:
		localStorage.setItem('VIDEO_EATS_ACCESS_TOKEN', token);
		localStorage.setItem('VIDEO_EATS_CURRENT_USER_ID', id);
		// redirect to home page to see all tweets:
		window.location.href = '/';
	} catch (err) {
		handleErrors(err);
	}
}

// set up the event listener for the submit button
logInForm.addEventListener('submit', async (e) => {
	// Prevent the default behavior of the submit button
	e.preventDefault();
	// Create a new formData object
	const formData = new FormData(logInForm);
	// Use formData function to pull out data from the log in form
	const email = formData.get('email');
	const password = formData.get('password');
	const body = { email, password };
	fetchUser(body);
});

demoUser.addEventListener('click', async (e) => {
	e.preventDefault();
	const email = 'demouser@testemail.com';
	const password = 'test';
	const body = {
		email,
		password
	};
	fetchUser(body);
});
