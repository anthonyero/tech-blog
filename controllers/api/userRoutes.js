const router = require('express').Router();
const { User } = require('../../models');

router.get('/', async (req, res) => {
	
	try {
		res.render('login');
		res.status(200);
	} catch (err) {
		res.status(400).json(err)
	}
});

router.post('/', async (req, res) => {
	try {
		const userData = await User.create(req.body);

		// Include req.session log

		res.status(200).json(userData);
	} catch (err) {
		res.status(400).json(err)
	}
});

module.exports = router;