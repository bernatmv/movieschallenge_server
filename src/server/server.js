// load the express package and create our app
import express from 'express';
import path from 'path';

var app = express(),
	router = express.Router();

// test
app.get('/', (req, res) => {
	res.send('at last 4!');
});

// router middleware
router.use((req, res, next) => {
	// log action
	console.log('IN!');
	// continue with the routing
	next();
});

// creates routes for the app
router.get('/user', (req, res) => {
	res.send('retrieve a user data');
});

router.get('/match', (req, res) => {
	res.send('retrieve a match data');
});

router.get('/question', (req, res) => {
	res.send('retrieve a question data');
});

app.use('/', router);

// start the server
app.listen(1337);
console.log('Listening to port: 1337');
