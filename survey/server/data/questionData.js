const database = require('../infra/database');

exports.getQuestions =  function () {
	return database.query('select * from question');
};

exports.getQuestion = function (id) {
	return database.oneOrNone('select * from question where id_question = $1', [id]);
};

exports.getQuestionByTitle = function (title) {
	return database.oneOrNone('select * from question where title = $1', [title]);
};

exports.saveQuestion = async function (post) {
    const resultado = await database.one('insert into question (title) values ($1) returning *', [post.title]);
	return resultado;
};

exports.updateQuestion = function (id, post) {
	return database.none('update question set title = $1 where id_question = $2', [post.title, id]);
};

exports.deleteQuestion = async function (id) {
    return await database.none('delete from question where id_question = $1', [id]);
};