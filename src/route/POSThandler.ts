import { loadData } from '../index';
import { Question } from '../types';
import * as fs from 'fs/promises';
import { Express } from 'express';

export function POSThandler(app: Express) {
	app.post('/create-question', async (req, res) => {
		const fileContent = await loadData();
		// console.log(fileContent);
		let Allquestions = fileContent.questions;
		// console.log(Allquestions);
		let newQuestion: Question = req.body;

		const question = req.body.question;
		const options = req.body.options;
		const answer = req.body.answer;
		const errors: {
			question?: string;
			options?: string;
			answer?: string;
		} = {};

		if (!question) {
			errors.question = 'Please enter a question';
		}
		//I didn't know how to make it an array, becuase the req.body is a string
		if (!options) {
			errors.options = 'Please enter 4 options';
		}

		if (!answer) {
			errors.answer = 'Please select an answer';
		}

		if (Object.keys(errors).length > 0) {
			res.status(400).send(errors);
			return;
		}

		Allquestions.push(newQuestion);

		let newQuestionsArray = { questions: Allquestions };
		let JSONstring = JSON.stringify(newQuestionsArray, null, ' ');

		//write data to the files
		try {
			await fs.writeFile('./data.json', JSONstring);
			res.status(200).send('Question successfully added!');
		} catch (error) {
			console.log(error);
			res.status(500).send('Error in adding data to the file');
		}
	});
}
