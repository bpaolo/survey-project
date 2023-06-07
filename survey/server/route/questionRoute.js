const express = require('express');
const router = express.Router();
const questionService = require('../service/questionService');

router.get('/question', async function (req, res, next) {
	try {
		const question = await questionService.getQuestions();
		res.json(question);
	} catch (e) {
		next(e);
	}
});

router.post('/question', async function (req, res, next) {
	const question = req.body;
	try {
		const newQuestion = await questionService.saveQuestion(question);
		res.status(201).json(newQuestion);
	} catch (e) {
		next(e);
	}
});

router.put('/question/:id', async function (req, res, next) {
	const question = req.body;
	try {
		await questionService.updateQuestion(req.params.id, question);
		res.status(204).end();
	} catch (e) {
		next(e);
	}
});

router.delete('/question/:id', async function (req, res, next) {
	try {
		await questionService.deleteQuestion(req.params.id);
		res.status(204).end();
	} catch (e) {
		next(e);
	}
});

module.exports = router;