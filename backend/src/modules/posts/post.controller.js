const service = require('./post.service');
const catchAsync = require('../../utils/catchAsync');
const multer = require('multer');
const cloudinaryStorage = require('../../utils/cloudinary-custom-storage');

module.exports = {
	list() {
		return catchAsync(async (req, res, next) => {
			const { err, response } = await service.list(req.query);

			if (err) return next(err);
			res.status(response.statusCode).json(response);
		});
	},

	getById() {
		return catchAsync(async (req, res, next) => {
			const id = req.params.id;
			const { err, response } = await service.getById(id);

			if (err) return next(err);
			res.status(response.statusCode).json(response);
		});
	},

	createPost() {
		return catchAsync(async (req, res, next) => {
			const { err, response } = await service.createPost(req.body, req.file);

			if (err) return next(err);
			res.status(response.statusCode).json(response);
		});
	},
};
