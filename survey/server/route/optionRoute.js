const express = require('express');
const router = express.Router();
const optionService = require('../service/optionService');

router.get('/option', async function (req, res, next) {
	try {
		const option = await optionService.getOptions();
		res.json(option);
	} catch (e) {
		next(e);
	}
});

router.post('/option', async function (req, res, next) {
	const option = req.body;
	try {
		const newOption = await optionService.saveOption(option);
		res.status(201).json(newOption);
	} catch (e) {
		next(e);
	}
});

router.put('/option/:id', async function (req, res, next) {
	const option = req.body;
	try {
		await optionService.updateOption(req.params.id, option);
		res.status(204).end();
	} catch (e) {
		next(e);
	}
});

router.delete('/option/:id', async function (req, res, next) {
	try {
		await optionService.deleteOption(req.params.id);
		res.status(204).end();
	} catch (e) {
		next(e);
	}
});

module.exports = router;