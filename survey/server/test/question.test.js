const crypto = require('crypto');
const axios = require('axios');
const questionService = require('../service/questionService');

const generate = function () {
	return crypto.randomBytes(10).toString('hex');
};

const request = function (url, method, data) {
	return axios({ url, method, data, validateStatus: false });
};

test('Should get question', async function () {
	const post1 = await questionService.saveQuestion({ title: generate()});
	const response = await request('http://localhost:3001/question', 'get');
    expect(response.status).toBe(200);
	const question = response.data;
	expect(question).toHaveLength(1);
	await questionService.deleteQuestion(post1.id_question);
});

test('Should save a post', async function () {
	const data = { title: generate() };
	const response = await request('http://localhost:3001/question', 'post', data);
	const post = response.data;
	expect(post.title).toBe(data.title);
	await questionService.deleteQuestion(post.id_question);
});

test('Should not save a post', async function () {
	const data = { title: generate()};
	const response1 = await request('http://localhost:3001/question', 'post', data);
	const response2 = await request('http://localhost:3001/question', 'post', data);
    
	expect(response2.status).toBe(409);
	const post = response1.data;
	await questionService.deleteQuestion(post.id_question);
});

test('Should update a post', async function () {
	const post = await questionService.saveQuestion({ title: generate()});
	post.title = generate();
	const response =await request(`http://localhost:3001/question/${post.id_question}`, 'put', post);
    expect(response.status).toBe(204);
	const updatedQuestion = await questionService.getQuestion(post.id_question);
	expect(updatedQuestion.title).toBe(post.title);
	await questionService.deleteQuestion(post.id_question);
});

test('Should not update a post', async function () {
	const post = {
		id_question: 1
	};
	const response = await request(`http://localhost:3001/question/${post.id_question}`, 'put', post);
	expect(response.status).toBe(404);
});

test('Should delete a post', async function () {
	const post  = await questionService.saveQuestion({ title: generate() });
	const response = await request(`http://localhost:3001/question/${post.id_question}`, 'delete');
    expect(response.status).toBe(204);
	const question = await questionService.getQuestions();
	expect(question).toHaveLength(0);
});