const crypto = require('crypto');
const axios = require('axios');
const questionService = require('../service/questionService');
const optionService = require('../service/optionService');
const resultService = require('../service/resultService');

const generate = function () {
	return crypto.randomBytes(10).toString('hex');
};

const request = function (url, method, data) {
	return axios({ url, method, data, validateStatus: false });
};

// test.only('Should get all result', async function () {
// 	const dataQuestion = await questionService.saveQuestion({ title: generate()});
// 	const dataOption = await optionService.saveOption({ option: generate(), id_question: dataQuestion.id_question});
	
// 	await resultService.saveResult({ id_question: dataQuestion.id_question, id_option: dataOption.id_option});
// 	const response = await request('http://localhost:3001/result', 'get');
//     expect(response.status).toBe(200);
// 	const option = response.data;
// 	await optionService.deleteOption(dataQuestion.id_question);
// 	await questionService.deleteQuestion(dataQuestion.id_question);
	
// });

test('Should save a result', async function () {
	const dataQuestion = await questionService.saveQuestion({ title: generate()});
	const dataOption = await optionService.saveOption({ option: generate(), id_question: dataQuestion.id_question});
	const result = { id_question: dataQuestion.id_question, id_option: dataOption.id_option}
	const responseResult = await resultService.saveResult(result);
	
	expect(dataQuestion.id_question).toBe(responseResult.id_question);
	expect(dataOption.id_option).toBe(responseResult.id_option);
	
    // expect(responseResult.data.status).toBe(200);
	// await optionService.deleteOption(dataQuestion.id_question);
	// await questionService.deleteQuestion(dataQuestion.id_question);
});

test.only('Should save vote a result', async function () {
	const result = { id_question: 25, id_option: 25}
	const responseResult = await resultService.saveResult(result);
	console.log("TESTE - VOTE",responseResult)
	expect(responseResult.id_result).toBe(9);
	// expect(dataOption.id_option).toBe(responseResult.id_option);
	
    // expect(responseResult.data.status).toBe(200);
	// await optionService.deleteOption(dataQuestion.id_question);
	// await questionService.deleteQuestion(dataQuestion.id_question);
});


// test('Should update a option', async function () {
// 	const dataQuestion = await questionService.saveQuestion({ title: generate()});
// 	const dataOption = await optionService.saveOption({ option: generate(), id_question: dataQuestion.id_question});
// 	const response = await request(`http://localhost:3001/option/${dataOption.id_option}`, 'put', dataOption);
// 	expect(response.status).toBe(204);
// 	const updatedOption = await optionService.getOption(dataOption.id_option);
// 	expect(updatedOption.option).toBe(dataOption.option);
// 	await optionService.deleteOption(dataQuestion.id_question);
// 	await questionService.deleteQuestion(dataQuestion.id_question);
// });

// test('Should delete all option by question', async function () {
// 	const dataQuestion = await questionService.saveQuestion({ title: generate()});
// 	const dataOption = await optionService.saveOption({ option: generate(), id_question: dataQuestion.id_question});
// 	const response = await request(`http://localhost:3001/option/${dataQuestion.id_question}`, 'delete');
//     expect(response.status).toBe(204);
// 	const options = await optionService.getOptions();
// 	expect(options).toHaveLength(0);
// 	await optionService.deleteOption(dataQuestion.id_question);
// 	await questionService.deleteQuestion(dataQuestion.id_question);
// });