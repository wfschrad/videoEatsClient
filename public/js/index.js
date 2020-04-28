import { handleErrors, api } from './utils.js';

document.addEventListener('DOMContentLoaded', async () => {
	// hide the navbar search on the homepage
	const navbarSearchForm = document.querySelector('#nav-search');
	// navbarSearchForm.classList.add('hidden');

	const child = document.querySelector('.child');
	child.appendChild(navbarSearchForm);

	// await the fetch call from the api backend
	try {
		const res = await fetch(`${api}`);
		return await res.json();
	} catch (e) {
		console.error(e);
	}
});
