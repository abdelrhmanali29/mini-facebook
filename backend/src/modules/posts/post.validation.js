const schema = require('./post.schema');
const validator = require('validator');
const Ajv = require('ajv').default;
const AjvFormats = require('ajv-formats');
const ajv = new Ajv({ allErrors: true });
AjvFormats(ajv, ['date', 'time', 'date-time', 'email', 'url']);

const validation = (post) => {
	let validate = ajv.compile(schema);

	let valid = validate(post);
	let errors = validate.errors;

	if (!errors) errors = [];

	errors.forEach((error) => {
		error.dataPath = error.dataPath.split('/')[1];
	});

	return { valid, errors };
};

module.exports = { validation };
