import { loadData } from '../index';

import * as fs from 'fs/promises';
import { Express } from 'express';
import { determineFilter } from '../utils';
import { Difficulty, CategoryFilterTypes } from '../types';

export function FILTERhandler(app: Express) {
	app.get('/filter/:category/:difficulty', async (req, res) => {
		const fileContent = await loadData();
		let Allquestions = fileContent.questions;

		const category = req.params.category as CategoryFilterTypes;
		const difficulty = req.params.difficulty as Difficulty;

		let result = determineFilter(Allquestions, category, difficulty);

		try {
			res.json(result);
			// res.status(200).send('Filter successfully applied!');
		} catch (error) {
			console.log(error);
			res.status(500).send('Error in applying filter');
		}
	});
}
