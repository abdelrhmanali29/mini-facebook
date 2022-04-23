const schema = {
	type: 'object',
	required: ['username', 'email', 'password', 'mobileNumber'],
	properties: {
		username: {
			type: 'string',
			minLength: 3,
			maxLength: 30,
		},
		email: {
			type: 'string',
			format: 'email',
		},
		password: {
			type: 'string',
			minLength: 8,
			maxLength: 32,
		},
		mobileNumber: {
			type: 'string',
		},
	},
};

module.exports = schema;
