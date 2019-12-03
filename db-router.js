const express = require('express');

const DataBase = require('./data/db');

const router = express.Router();

router.use(express.json());

router.get('/', (req, res) => {
	// console.log(req.query);
	DataBase.find(req.query)
		.then((posts) => {
			res.status(200).json(posts);
		})
		.catch((error) => {
			console.log(error);
			res.status(500).json({
				message : 'The posts information could not be retrieved.',
			});
		});
});

router.get('/:id', (req, res) => {
	DataBase.findById(req.params.id)
		.then((posts) => {
			if (posts) {
				res.status(200).json(posts);
			} else {
				res.status(404).json({ messages: 'essage: "The post with the specified ID does not exist.' });
			}
		})
		.catch((error) => {
			console.log(error);
			res.status(500).json({
				message : 'The post information could not be retrieved.',
			});
		});
});
router.get('/:id/comments', (req, res) => {
	DataBase.findCommentById(req.params.id)
		.then((posts) => {
			if (posts) {
				res.status(200).json(posts);
			} else {
				res.status(404).json({ messages: 'essage: "The post with the specified ID does not exist.' });
			}
		})
		.catch((error) => {
			console.log(error);
			res.status(500).json({
				message : 'The comments information could not be retrieved.',
			});
		});
});

router.post('/', (req, res) => {
	const { title, contents } = req.body;
	if (!title || !contents) {
		res.status(400).json({ error: 'Please provide title and contents for the post.' });
	} else {
		DataBase.insert({ title, contents })
			.then(({ id }) => {
				DataBase.findById(id).then((posts) => {
					res.status(201).json(posts);
				});
			})
			.catch((error) => {
				console.log('error on the POST for posting a new title and content', error);
				res.status(500).json({
					errorMessage : 'There was an error while saving the post to the database',
				});
			});
	}
});

module.exports = router;
