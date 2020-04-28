import { api } from './utils.js';

document.addEventListener('DOMContentLoaded', async () => {
	// hide the navbar search on the homepage
	const navbarSearchForm = document.querySelector('.navbar-search');
	const child = document.querySelector('.child');
	//navbarSearchForm.setAttribute("display", "none");
	//const searchButton = document.getElementById('search-btn');
	//searchButton.setAttribute("display", "none");
	
	// move navbar to center of main page
	child.appendChild(navbarSearchForm);

	// await the fetch call from the api backend
	try {
		const res = await fetch(`${api}`);
		return await res.json();
	} catch (e) {
		console.error(e);
	}
});
