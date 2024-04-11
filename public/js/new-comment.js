const submitComment = async (event) => {
  event.preventDefault();

  // Collect values from the login form
  const postId = document.querySelector(".new-comment-container").title;
  const text = document.querySelector('#new-comment-text').value;
  console.log(postId, text)
  if (text) {
    // Send a POST request to the API endpoint
    const response = await fetch('/api/blog/new-comment', {
      method: 'POST',
      body: JSON.stringify({ postId, text }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      // If successful, redirect the browser to the dashboard page
      document.location.reload()
    } else {
      alert(response.statusText);
    }
  }
};
document.querySelector('.post-comment-btn').addEventListener('click', submitComment);
