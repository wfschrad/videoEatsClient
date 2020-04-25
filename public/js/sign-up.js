// Vanilla javascript to grab the sign up form from the pug template
// TODO: change based on the name of the class/id from the pug
const api = document.querySelector('link[rel="api]').href;
const signUpForm = document.querySelector('.sign-up-form');

// set up the event listener for the submit button
signUpForm.addEventListener('submit', async (e) => {
	// Prevent the default behavior of the submit button
	e.preventDefault();

	// Create a new formData object
	const formData = new FormData(signUpForm);

	// Use formData function to pull out data from the sign up form
	const firstName = formData.get('firstName');
	const lastName = formData.get('lastName');
	const email = formData.get('email');
	const password = formData.get('password');
	const userName = formData.get('userName');

	const body = { firstName, lastName, email, password, userName: userName, revScore: 0, statusTypeId: 1 };
	try {
		const res = await fetch(`${api}users`, {
			method: 'POST',
			body: JSON.stringify(body),
			headers: {
				'Content-Type': 'application/json'
			}
		});
		if (!res.ok) {
			throw res;
		}
		// destructure token and id from the fetch
		const { token, user: { id } } = await res.json();
		// store the tokens into the local storage
		localStorage.setItem('VIDEO_EATS_ACCESS_TOKEN', token);
		localStorage.setItem('VIDEO_EATS_CURRENT_USER_ID', id);
		// redirect back to home if sign up is succcessful
		window.location.href = '/';
	} catch (err) {
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
			console.log(errors);
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
		} else {
			alert('Something went wrong. Please check your internet connection and try again!');
		}
	}
});
