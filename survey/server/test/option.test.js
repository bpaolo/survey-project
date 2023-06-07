const crypto = require('crypto');
const axios = require('axios');
const questionService = require('../service/questionService');
const optionService = require('../service/optionService');

const generate = function () {
	return crypto.randomBytes(10).toString('hex');
};

const request = function (url, method, data) {
	return axios({ url, method, data, validateStatus: false });
};

test('Should get option', async function () {
	const dataQuestion = await questionService.saveQuestion({ title: generate()});
	await optionService.saveOption({ option: generate(), id_question: dataQuestion.id_question});
	const response = await request('http://localhost:3001/option', 'get');
    expect(response.status).toBe(200);
	const option = response.data;
	await optionService.deleteOption(dataQuestion.id_question);
	await questionService.deleteQuestion(dataQuestion.id_question);
	
});

test('Should save a option', async function () {
	const dataQuestion = await questionService.saveQuestion({ title: generate()});
	const dataOption = await optionService.saveOption({ option: generate(), id_question: dataQuestion.id_question});
	const response = await request('http://localhost:3001/option', 'get');
    expect(response.status).toBe(200);
	await optionService.deleteOption(dataQuestion.id_question);
	await questionService.deleteQuestion(dataQuestion.id_question);
});


test('Should update a option', async function () {
	const dataQuestion = await questionService.saveQuestion({ title: generate()});
	const dataOption = await optionService.saveOption({ option: generate(), id_question: dataQuestion.id_question});
	const response = await request(`http://localhost:3001/option/${dataOption.id_option}`, 'put', dataOption);
	expect(response.status).toBe(204);
	const updatedOption = await optionService.getOption(dataOption.id_option);
	expect(updatedOption.option).toBe(dataOption.option);
	await optionService.deleteOption(dataQuestion.id_question);
	await questionService.deleteQuestion(dataQuestion.id_question);
});

test('Should delete all option by question', async function () {
	const dataQuestion = await questionService.saveQuestion({ title: generate()});
	const dataOption = await optionService.saveOption({ option: generate(), id_question: dataQuestion.id_question});
	const response = await request(`http://localhost:3001/option/${dataQuestion.id_question}`, 'delete');
    expect(response.status).toBe(204);
	const options = await optionService.getOptions();
	expect(options).toHaveLength(0);
	await optionService.deleteOption(dataQuestion.id_question);
	await questionService.deleteQuestion(dataQuestion.id_question);
});