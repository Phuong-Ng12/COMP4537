const express = require('express');
const fetch = require('node-fetch');
const fs = require('fs');
const app = express();
const bodyParser = require('body-parser');
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

require("dotenv").config();
var PUBLIC_URL = process.env.PUBLIC_URL;

app.get('/', (req, res) => {
    let doc = fs.readFileSync('index.html', 'utf8');
    res.send(doc);
});

app.post('`${PUBLIC_URL}`/chatbot', (req, res) => {
	const message = req.body.message;
	const number = message.match(/\d+/);
	if (number) {
		fetch(`http://numbersapi.com/${number}?type=trivia`).then(response => response.text()).then(data => {
			res.json({
				text: data
			});
		}).catch(error => {
			res.json({
				text: "Sorry, I couldn't find any information about that number."
			});
		});
	} else {
		res.json({
			text: "I'm sorry, I didn't understand your question. Please provide a number for me to give you information about."
		});
	}
});


app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
})