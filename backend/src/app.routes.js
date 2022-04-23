const app = require('./app.middlewares');
const requestIp = require('request-ip');
const AppError = require('./utils/appError');
const timeFormat = require('./utils/timeFormat');
const errorHandler = require('./middlewares/errorHandler');

// Resources Routes
const userRouter = require('./modules/users/user.routes');
const postRouter = require('./modules/posts/post.routes');

app.use('/api/v1/users', userRouter);
app.use('/api/v1/posts', postRouter);

app.get('/api/v1/health', (req, res) => {
	const uptime = timeFormat(process.uptime().toString());
	const { ip, url, hostname: host, headers } = req;

	const memory = process.memoryUsage();
	const memoryGB = (memory.heapUsed / 1024 / 1024 / 1024).toFixed(4) + ' GB';
	const clientIp = requestIp.getClientIp(req); // on localhost > 127.0.0.1

	const healthCheck = {
		ip,
		url,
		host,
		uptime,
		clientIp,
		memoryGB,
		message: 'OK',
		time: new Date(),
		forwardedHost: headers['x-forwarded-host'],
	};

	res.status(200).json(healthCheck);
});

app.all('*', (req, res, next) => {
	next(new AppError(`Can't find ${req.originalUrl}`, 404));
});

app.use(errorHandler);

module.exports = app;
