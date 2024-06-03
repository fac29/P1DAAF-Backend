import { Express } from 'express'
import { loadData } from '../index'
require('dotenv').config()

export function ALLhandler(app: Express) {
	app.get('/', async (req, res) => {
		try {
			const filecontent = await loadData()
			let Allquestions = filecontent.questions

			res.json(Allquestions) // Use res.json to send data as a JSON object
		} catch (error) {
			console.log(error)
			res.status(500).send('Error in getting all questions')
		}
	})
}

export default ALLhandler
