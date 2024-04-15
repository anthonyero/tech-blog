const router = require('express').Router();
const { Post, Comment } = require('../../models');


// New Post
router.post('/new', async (req, res) => {
	try {
		req.body.user_id = req.session.user_id;
		const postData = await Post.create(req.body);
	    res.status(200).json(postData);
	} catch (err) {
		res.status(400).json(err)
	}
});

// New comment
router.post('/new-comment', async (req, res) => {
	try {
		req.body.user_id = req.session.user_id;
		const commentData = await Comment.create(req.body);
	    res.status(200).json(commentData);
	} catch (err) {
		res.status(400).json(err)
	}
});

// Retrieve Post to Edit
router.get('/edit-get/:id', async (req, res) => {
	try {
		const postData = await Post.findByPk(req.params.id);
		const post = postData.get({ plain: true });

		if (postData.user_id === req.session.user_id) {
			res.render('update-blog-post', { post, logged_in: req.session.logged_in })
		}

	} catch (err) {
		res.status(400).json(err)
	}
})

// Update a post 
router.put('/update', async (req, res) => {
	try {
		const postData = await Post.update(
			{ text: req.body.text }, 
			{ where: {
				id: req.body.postId,
				user_id: req.session.user_id
				}
			});
		res.status(202).json(postData);
	} catch (err) {
		res.status(400).json(err);
	}
})

// Delete Post
router.delete('/delete', async (req, res) => {
	try {
		postId = req.body.target; // When testing, send with target as the object property
		const postData = await Post.findByPk(postId)

		if (postData === null) {
			console.log('No record found');
			res.status(404).json("No record found")
			return;
		} 

		if (postData.user_id === req.session.user_id) {
			const deletedPostData = await Post.destroy({
				where: {
					id: postData.id
				}
			});
			res.status(202).json(deletedPostData);
		} else {
			res.status(401).json('You are not authorized to delete this post')
		}
	} catch (err) {
		res.status(400).json(err);
	}
})

module.exports = router;