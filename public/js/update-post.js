const submitUpdateBtn = document.querySelector(".submit-update-btn");

const updatePost = async (event) => {
  event.preventDefault();

  // Collect values from the login form
  const postId = submitUpdateBtn.getAttribute('name');
  const text = document.querySelector('#update-post-text').value;

  if (text) {
    // Send a PUT request to the API endpoint
    const response = await fetch('/api/blog/update', {
      method: 'PUT',
      body: JSON.stringify({ postId, text }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/dashboard'); 
    } else {
      alert(response.statusText);
    }
  }
};

submitUpdateBtn.addEventListener('click', updatePost);
