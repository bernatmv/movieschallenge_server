// load the packages
import express from 'express';
import path from 'path';
import db from 'mongoose';
import parser from 'body-parser';
import morgan from 'morgan';
// load configuration and router
import config from './config/config';
import router from './config/router';

var app = express();

// connect to DB
db.connect(config.mongodb);

// configure app to pull POST information, to log all requests and to handle CORS
app.use(parser.urlencoded({ extended: true }));
app.use(parser.json());

app.use(morgan('dev'));

app.use((req, res, next) => {
	// set headers
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, \Authorization');
	// proceed with the request
	next();
});

// set routes
router(app);

// start the server
app.listen(config.port);

console.log(`Listening to port: ${config.port}`);
