const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());

app.use('/', require('./route/questionRoute'));
app.use('/', require('./route/optionRoute'));
app.use('/', require('./route/resultRoute'));
app.use(function (error, req, res, next) {
	
    if (error.message === 'Data already exists') {
        return res.status(409).send(e.message);
	}
	if (error.message === 'Data not found') {
		return res.status(404).send(e.message);
	}
	res.status(500).send(e.message);
});

app.listen(3001);
