const questionData = require('../data/questionData');

exports.getQuestions = function () {
	return questionData.getQuestions();
};

exports.getQuestion = async function (id) {
	const question = await questionData.getQuestion(id);
	if (!question) throw new Error('Data not found');
	return question;
};

exports.saveQuestion = async function (question) {
	const existingQuestion = await questionData.getQuestionByTitle(question.title);
	if (existingQuestion) throw new Error('Data already exists');
	return questionData.saveQuestion(question);
};

exports.deleteQuestion = function (id) {
	return questionData.deleteQuestion(id);
};

exports.updateQuestion = async function (id, post) {
	await exports.getQuestion(id);
	return questionData.updateQuestion(id, post);
};