import { handleErrors, api } from './utils.js';

document.addEventListener('DOMContentLoaded', (e) => {
	const businessSignUpForm = document.querySelector('.sign-up-form-biz');
	businessSignUpForm.addEventListener('submit', async (e) => {
		e.preventDefault();
		const formData = new FormData(businessSignUpForm);
		const name = formData.get('businessName');
		const address = formData.get('address');
		const categoryId = formData.get('categoryId');
		const fetchAddress = address.split(' ').join('+');

		const data = await fetch(
			`https://maps.googleapis.com/maps/api/geocode/json?address=${fetchAddress}&key=AIzaSyDGY66OXtcdxsGZP88SUVAJGu7zK5-Eli4`
		);
		const geo = await data.json();
		console.log('GEO', geo.results[0].geometry.location);
		const lat = geo.results[0].geometry.location.lat;
		const lng = geo.results[0].geometry.location.lng;
		const body = {
			name,
			address,
			categoryId,
			lat,
			lon: lng
		};
		console.log(body);

		try {
			const res = await fetch(`${api}businesses`, {
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
			alert('Business added! Thanks!');
			window.location.href = '/';
		} catch (err) {
			if (err.status === 401) {
				window.location.href = '/log-in';
			}
			handleErrors(err);
		}
	});
});
