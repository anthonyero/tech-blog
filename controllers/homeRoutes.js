const router = require('express').Router();
const { User, Post, Comment } = require('../models');

router.get('/', async (req, res) => {
	try {
		const postData = await Post.findAll({
			include: [
				 {
					model: User,
					attributes: ['username']
				}
			]
		});
		// Serialize the data 
		const posts = postData.map((post) => post.get({ plain: true }));
		// Send the rendered Handlebars.js template back as the response
		res.render('homepage', { posts })
	} catch (err) {
		console.log(err);
		res.status(500).json(err);
	}
});

module.exports = router;