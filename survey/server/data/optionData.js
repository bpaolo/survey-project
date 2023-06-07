const database = require('../infra/database');

exports.getOptions =  function () {
    return database.query('select * from option');
};

exports.getOption = function (id) {
	return database.oneOrNone('select * from option where id_option = $1', [id]);
};

exports.getPostByOption = function (option) {
	return database.oneOrNone('select * from option where option = $1', [option]);
};

exports.saveOption = async function (option) {
    const resultado = await database.one('insert into option (option, id_question) values ($1, $2) returning *', [option.option, option.id_question]);
	return resultado;
};

exports.updateOption = function (id, option) {
	return database.none('update option set option = $1 where id_option = $2', [option.option, id]);
};

exports.deleteOption = async function (id_question) {
    return await database.none('delete from option where id_question = $1', [id_question]);
};