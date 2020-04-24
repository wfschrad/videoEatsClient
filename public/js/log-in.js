if (localStorage.getItem('VIDEO_EATS_ACCESS_TOKEN')) {
	alert('You are already logged in!');
	window.history.back();
}
const logInForm = document.querySelector('.log-in-form');

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

	try {
		const res = await fetch('http://localhost:8080/users/token', {
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
		if (err.status >= 400 && err.status < 600) {
			const errorJSON = await err.json();
			const errorsContainer = document.querySelector('.errors-container');
			let errorsHtml = [
				`<div class="alert alert-danger">
                    Something went wrong. Please try again.
                 </div>`
			];
			const { errors } = errorJSON;
			if (errors && Array.isArray(errors)) {
				errorsHtml = errors.map(
					(message) =>
						`<div class="alert alert-danger">
                        ${message}
                    </div>`
				);
			}
			errorsContainer.innerHTML = errorsHtml.join('');
		} else {
			alert('Something went wrong. Please check your internet connection and try again!');
		}
	}
});
