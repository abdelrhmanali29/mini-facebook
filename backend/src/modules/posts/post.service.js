const repository = require('./post.repository');
const AppError = require('../../utils/appError');
const validator = require('../../utils/validation');
const config = require('../../config/config');
const { validation } = require('./post.validation');

module.exports = {
	async createPost(post, file) {
		let err = false,
			response = {};
		if (file) post.image = file.filename;

		const { valid, errors } = validation(post);

		if (!valid) {
			err = new AppError('validation failed', 400, errors);
			return { err, response };
		}

		const newPost = await repository.save(post);
		response = {
			status: 'success',
			statusCode: 200,
			data: newPost,
		};

		return { err, response };
	},

	async list(query) {
		let err = false,
			response = {};

		const queryPages = {
			skip: parseInt(query.skip) || parseInt(config.skip),
			limit: parseInt(query.limit) || parseInt(config.limit),
		};

		if (!validator.pagination(queryPages)) {
			err = new AppError('pagination failed', 400);

			return { err, response };
		}

		const pages = {
			limit: queryPages.limit,
			skip: queryPages.skip,
		};

		Reflect.deleteProperty(query, 'limit');
		Reflect.deleteProperty(query, 'skip');

		const users = await repository.find({
			filter: {},
			limit: pages.limit,
			skip: pages.skip,
		});

		response = {
			data: users,
			status: 'success',
			statusCode: 200,
		};

		return { err, response };
	},

	async getById(id) {
		let err = false,
			response = {};

		const isMongoId = validator.isMongoId(id);

		if (!isMongoId) {
			err = new AppError('Id not valid', 400);
			return { err, response };
		}

		const post = await repository.findById({
			id,
			lean: true,
		});

		if (!post) {
			err = new AppError('Post not found', 404);
			return { err, response };
		}

		response = {
			status: 'success',
			statusCode: 200,
			data: post,
		};

		return { err, response };
	},
};
