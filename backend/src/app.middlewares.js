const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../authentication-swagger-api.json');
const basicAuth = require('express-basic-auth');
const config = require('./config/config');
const rateLimit = require('express-rate-limit');
const compression = require('compression');
const app = express();

// inside middleware handler
const limiter = rateLimit({
	windowMs: 60, // 1 second
	max: 12, // limit each IP to 12 requests per second
});

//  apply to all requests
app.use(limiter);

// Middle wares
app.use(
	cors({
		origin: '*',
	}),
	express.json()
);

app.use(compression());
app.use(morgan('dev'));

app.get(
	'/api/v1/docs',
	basicAuth({
		users: { [config.user]: config.password },
		challenge: true,
	}),
	swaggerUi.setup(swaggerDocument)
);

app.use('/api/v1/', swaggerUi.serve);

module.exports = app;
