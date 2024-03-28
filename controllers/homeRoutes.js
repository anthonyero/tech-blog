const router = require('express').Router();
const { User, Post, Comment } = require('../models');

router.get('/', async (req, res) => {
	try {
		const userPostData = await Post.findAll({
			include: [
				 {
					model: User,
					attributes: ['username']
				}
			]
		});
		// Serialize the data 
		const posts = userPostData.map((post) => post.get({ plain: true }));
		// Send the rendered Handlebars.js template back as the response
		res.render('homepage', { posts })
	} catch (err) {
		console.log(err);
		res.status(500).json(err);
	}
});




// Working with a learning assistant and changed the order of `where`
router.get('/dashboard', async (req, res) => {
	if (req.session.logged_in) {
		console.log("Logged in == true")
		try {
		
			const userPostData = await Post.findAll({
				where: {user_id: req.session.user_id},

				include: [
					{ 
						model: User, 
						attributes: ['username']
					}
				]
				
			});

			const posts = userPostData.map((post) => post.get({ plain: true }));
			res.render('dashboard', { posts, logged_in: req.session.logged_in  }) // Make sure to pass logged_in to the template as well. Won't function otherwise
		} catch (err) {
			res.status(500).json(err);
		}
	} else {
		document.location.replace('/api/users/')

	}
});


	


module.exports = router;