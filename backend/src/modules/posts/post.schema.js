const schema = {
	type: 'object',
	required: ['text'],
	properties: {
		text: {
			type: 'string',
			minLength: 3,
			maxLength: 300,
		},
		image: {
			type: 'string',
		},
	},
};

module.exports = schema;
