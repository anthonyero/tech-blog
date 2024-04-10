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
		res.render('homepage', { posts, logged_in: req.session.logged_in })
	} catch (err) {
		console.log(err);
		res.status(500).json(err);
	}
});

// Find a specific blog post
router.get('/post/:id', async (req, res) => {
	try {
		const postData = await Post.findByPk(req.params.id , {
			include: [
				{
					model: User, 
					attributes: ["username"]
				},
				{
					model: Comment,
					include: {
						model: User, // Include the User model here as well to get access to the username
						attributes: ["username"]
					}
				}
			]
		});
		const post = postData.get({ plain: true });
		// res.status(200).json(post);
		res.render('post', { post, logged_in: req.session.logged_in })
	} catch (err) {
		res.status(400).json(err)
	}
})

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
		res.redirect('/api/users/')
	}
});

router.get('/new-post', async (req, res) => {
	if (req.session.logged_in) {
		console.log("Logged in == true")
		try {
		
			
			res.render('new-blog-post', { logged_in: req.session.logged_in  }) // Make sure to pass logged_in to the template as well. Won't function otherwise
		} catch (err) {
			res.status(500).json(err);
		}
	} else {
		document.location.replace('/api/users/')

	}
});

	


module.exports = router;