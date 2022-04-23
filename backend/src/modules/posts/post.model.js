const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');

const postSchema = new Schema(
	{
		text: { type: String, trim: true },

		author: { type: Schema.Types.ObjectId, ref: 'User' },

		image: { type: String },
	},
	{
		versionKey: false,
	}
);

//plugins
postSchema.plugin(uniqueValidator);

const Post = mongoose.model('Post', postSchema);
module.exports = Post;
