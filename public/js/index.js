import { api } from './utils.js';

document.addEventListener('DOMContentLoaded', async () => {
	// await the fetch call from the api backend
	try {
		const res = await fetch(`${api}`);
		return await res.json();
	} catch (e) {
		console.error(e);
	}
});
