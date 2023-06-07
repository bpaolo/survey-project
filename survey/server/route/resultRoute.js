const express = require('express');
const router = express.Router();
const resultService = require('../service/resultService');



router.get('/result', async function (req, res, next) {
	try {
		const result = await resultService.getResults();
		res.json(result);
	} catch (e) {
		next(e);
	}
});

router.post('/result', async function (req, res, next) {
	const requisicao = req.body;
	const result = { id_question:requisicao.id_question, id_option:requisicao.id_option }
	
	try {
		const newResult = await resultService.saveResult(result);
		res.status(201).json(newResult);
	} catch (e) {
		next(e);
	}
});

router.get('/result/:id', async function (req, res, next) {
	try {
		const result = await resultService.getResult(id);
		res.json(result);
	} catch (e) {
		next(e);
	}
});

router.get('/result/vote/:id', async function (req, res, next) {
	try {
		const id = req.params.id;
		const result = await resultService.getResultVote(id);
		res.json(result);
	} catch (e) {
		next(e);
	}
});





module.exports = router;