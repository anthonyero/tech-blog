const postContainer = document.querySelector('.post-container');

const clickHandler = async (event) => {
	if (event.target.matches('button') && event.target.name.includes('delete')) {
		deletePost(event);
	} else if (event.target.matches('button') && event.target.name.includes('update')){
		updatePost(event);
	}

}



const deletePost = async (event) => {
	// const currentTarget = event.currentTarget.getAttribute("name");
  	let target = event.target.getAttribute('name');
  	let match = target.match(/(\d+)/); // Regex to extract numeric characters from a string. Returns an array
  	target = parseInt(match[0]);

	const response = await fetch('/api/blog/delete', {
		method: 'DELETE',
		body: JSON.stringify({ target }),
		headers: { 'Content-Type': 'application/json' },
	});

	if (response.ok) {
		document.location.reload();
	} else {
		alert(response.statusText);
	};
}

const updatePost = async (event) => {
	let target = event.target.getAttribute('name');
	alert(target);

}

postContainer.addEventListener('click', clickHandler)