// load the packages
import express from 'express';
import path from 'path';
import db from 'mongoose';
import parser from 'body-parser';
import morgan from 'morgan';
// load configuration and router
import config from './config/config';
import routes from './config/routes';

var app = express();

// connect to DB
db.connect(config.mongodb);

// configure app to pull POST information 
app.use(parser.urlencoded({ extended: true }));
app.use(parser.json());
// log all requests 
app.use(morgan('dev'));
// handle CORS
app.use((req, res, next) => {
	// set headers
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
	// proceed with the request
	next();
});

// set routes to the API
routes(app);

// static server for the assets and Angular app
app.use(express.static(__dirname + '/../client'));
app.get('*', function(req, res) {
	res.sendFile(path.join(__dirname + '/../client/index.html'));
});

// start the server
app.listen(config.port);

console.log(`Listening to port: ${config.port}`);
