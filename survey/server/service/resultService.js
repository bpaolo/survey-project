const resultData = require('../data/resultData');

exports.getResults = function () {
	return resultData.getResults();
};

exports.getResultVote =  async function (id) {
	const result = await resultData.getResultVote(id);
	if (!result) throw new Error('Data not found');
	return result;
};

exports.getResult = async function (id) {
	const result = await resultData.getResultById(id);
	if (!result) throw new Error('Data not found');
	return result;
};



exports.saveResult = async function (result) {
	
	const res = await resultData.getResultByQuestionAndOption(result);
	if(!res) {
		return resultData.saveResult(result);
	}
	voteComputer = res.vote + 1;
	const vote = { id_result: res.id_result, vote: voteComputer }
	return resultData.updateResult(vote);
	
};
