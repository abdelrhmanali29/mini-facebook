const User = require('./post.model');

module.exports = {
	async find(query) {
		return await User.find(query.filter)
			.sort(query.sort)
			.limit(query.limit)
			.skip(query.skip)
			.populate(query.populate)
			.select(query.select)
			.lean(query.lean);
	},

	async findOne(query) {
		return await User.findOne(query.filter)
			.sort(query.sort)
			.limit(query.limit)
			.skip(query.skip)
			.populate(query.populate)
			.select(query.select)
			.lean(query.lean);
	},

	async findById(query) {
		return await User.findById(query.id)
			.populate(query.populate)
			.select(query.select)
			.lean(query.lean);
	},

	async count(filter) {
		return await User.countDocuments(filter);
	},

	async save(user) {
		const userSaved = new User(user);
		await userSaved.save();
		return userSaved;
	},
};
