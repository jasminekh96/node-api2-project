const express = require('express');

const dbRouter = require('../db-router');

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
	res.send(`<h2>She works </h2>`);
});

server.use('/api/posts', dbRouter);

module.exports = server;
