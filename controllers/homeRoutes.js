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

// router.get('/dashboard', async (req, res) => {
// 	try {
// 		if (req.session.logged_in == true) {
// 			console.log("Logged in == true")
// 			const userPostData = await Post.findAll({
// 				include: [
// 					{
// 						model: User,
// 						attributes: ['username']
// 					}
// 				]
// 			},{
// 				where: {
// 					user_id: req.session.user_id
// 				}
// 			});

// 			const posts = postData.map((post) => post.get({ plain: true }));
// 			res.render('dashboard', { posts })
// 		} else {

// 		}

// 	} catch (err) {
// 		console.log(err);
// 		res.status(500).json(err)
// 	}
// })


router.get('/dashboard', async (req, res) => {
	if (req.session.logged_in) {
		console.log("Logged in == true")
		try {
		
			const userPostData = await Post.findAll({
				include: [
					{
						model: User,
						attributes: ['username']
					}
				]
			},{
				where: {
					user_id: req.session.user_id
				}
			});

			const posts = postData.map((post) => post.get({ plain: true }));
			res.render('dashboard', { posts })
		} catch (err) {
			res.status(500).json(err);
		}
	} else {
		res.send("<p>Please log in</p>")

	}
});


	


module.exports = router;