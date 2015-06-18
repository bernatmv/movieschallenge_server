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

router.param('username', (req, res, next, username) => {
	// actions
	console.log(`Param: ${username}`);
	// save the param in the request
	req.username = username;
	// proceed with the routing
	next();
});

// creates routes for the app
router.get('/user/:username', (req, res) => {
	res.send(`retrieve ${req.params.username} data`);
});

router.get('/match/:matchid', (req, res) => {
	res.send(`retrieve match ${req.params.matchid} data`);
});

router.get('/question/:questionid', (req, res) => {
	res.send(`retrieve question ${req.params.questionid} data`);
});

app.use('/', router);

// start the server
app.listen(1337);
console.log('Listening to port: 1337');
