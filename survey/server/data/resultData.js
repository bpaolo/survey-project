const database = require('../infra/database');

exports.getResults =  async function () {
    return await database.query('select * from result');
};

exports.getResultVote =  async function (id) {
    return await database.query('select r.id_result, r.id_question, q.title, r.id_option, r.vote ,op.option from result as r join question as q on q.id_question = r.id_question join option as op on op.id_option = r.id_option where q.id_question = 30',[id]);
};

exports.getResultById = function (id) {
	return database.oneOrNone('select * from question where id_result = $1', [id]);
};

exports.getResultByQuestionAndOption = function (result) {
	return database.oneOrNone('select * from result where id_question = $1 and id_option = $2', [result.id_question, result.id_option]);
};

exports.saveResult = async function (result) {
    const resultado = await database.one('insert into result (id_question, id_option) values ($1, $2) returning *', [result.id_question, result.id_option]);
	return resultado;
};
exports.updateResult = function (result) {
	console.log("BASE", result);
	return database.none('update result set vote = $1 where id_result = $2', [result.vote, result.id_result]);
};
