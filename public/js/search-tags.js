const api = document.querySelector('link[rel="api]').href;

document.addEventListener('DOMContentLoaded', async (e) => {
	const searchTagsField = document.getElementById('reviewTags');
	const tagResults = document.querySelector('.tags-results');
	const tagItems = document.querySelector('.tag-item');
	const selectedTags = document.querySelector('.selected-tags');

	// this autocomplete function will filter out the results. as we type, there will be a list of category tags that are pulled from the backend api.
	function autoComplete(array, input) {
		return array.filter((tag) => {
			return tag.type.toLowerCase().includes(input.toLowerCase());
		});
	}
	try {
		// grabs all the tags from the backend
		const res = await fetch(`${api}businesses/tags`);
		const { tags } = await res.json();
		console.log(tags);
		searchTagsField.addEventListener('keyup', (e) => {
			let data = autoComplete(tags, e.target.value);
			if (!e.target.value) {
				tagResults.innerHTML = '';
				return;
			}
			const listOfTags = data.map(
				(element) => `
			    <li class="tag-item" id="tag-${element.id}">${element.type}</li>
			`
			);
			tagResults.innerHTML = listOfTags.join('');
		});
	} catch (err) {
		console.error(err);
	}
	const createDiv = document.createElement('div');
	const createSelectedULDiv = document.createElement('ul');
	tagResults.addEventListener('click', (e) => {
		console.log(e.target.id, e.target.innerHTML);
		createDiv.classList.add('tag-control');
		const createSelectedLIDiv = document.createElement('li');
		createSelectedLIDiv.innerHTML = e.target.innerHTML;
		createSelectedULDiv.appendChild(createSelectedLIDiv);
		createDiv.appendChild(createSelectedULDiv);
		selectedTags.appendChild(createDiv);
	});
});
