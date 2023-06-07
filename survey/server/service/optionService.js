const optionData = require('../data/optionData');

exports.getOptions = function () {
	return optionData.getOptions();
};

exports.getOption = async function (id) {
	const post = await optionData.getOption(id);
	if (!post) throw new Error('Data not found');
	return post;
};

exports.saveOption = async function (post) {
	return optionData.saveOption(post);
};

exports.deleteOption = function (id_question) {
	return optionData.deleteOption(id_question);
};

exports.updateOption = async function (id, post) {
	await exports.getOption(id);
	return optionData.updateOption(id, post);
};