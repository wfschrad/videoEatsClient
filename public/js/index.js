document.addEventListener('DOMContentLoaded', async () => {
	// await the fetch call from the api backend
	try {
		const res = await fetch('http://localhost:8080');
		return await res.json();
	} catch (e) {
		console.error(e);
	}
});
