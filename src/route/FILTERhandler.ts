import { loadData } from '../index';
import * as fs from 'fs/promises';
import { Express } from 'express';
import { determineFilter } from '../utils';
import { FilterTypes, Question } from '../types';


export function FILTERhandler(app: Express) {
	app.get('/filter/:filterType/:subFilterType', async (req, res) => {
		const fileContent = await loadData();
		let Allquestions = fileContent.questions;

		const filterType = req.params.filterType as FilterTypes;
		const subFilterType = req.params.subFilterType;

		let result = determineFilter(Allquestions, filterType, subFilterType);

		try {
			res.json(result);
			// res.status(200).send('Filter successfully applied!');
		} catch (error) {
			console.log(error);
			res.status(500).send('Error in applying filter');
		}
	});
}
