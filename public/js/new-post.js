const submitPost = async (event) => {
  event.preventDefault();

  // Collect values from the login form
  const title = document.querySelector('#new-post-title').value;
  const text = document.querySelector('#new-post-text').value;

  if (title && text) {
    // Send a POST request to the API endpoint
    const response = await fetch('/api/blog/new', {
      method: 'POST',
      body: JSON.stringify({ title, text }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      // If successful, redirect the browser to the dashboard page
      document.location.replace('/dashboard'); // Define a dashboard page
    } else {
      alert(response.statusText);
    }
  }
};
document.querySelector('.post-btn').addEventListener('click', submitPost);
