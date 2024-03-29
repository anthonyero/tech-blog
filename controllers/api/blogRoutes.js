const router = require('express').Router();
const { Post } = require('../../models');


// New
router.post('/new', async (req, res) => {
	try {
		req.body.user_id = req.session.user_id;
		const postData = await Post.create(req.body);
	    res.status(200).json(postData);
		;
	} catch (err) {
		res.status(400).json(err)
	}
});

module.exports = router;