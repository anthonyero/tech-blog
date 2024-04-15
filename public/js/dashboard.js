const postContainer = document.querySelector('.post-container');

const deletePost = async (event) => {
	 if (event.target.matches('button') && event.target.name) {
		// const currentTarget = event.currentTarget.getAttribute("name");
	  	const target = parseInt(event.target.getAttribute("name"));
	
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
	};
}

postContainer.addEventListener('click', deletePost)