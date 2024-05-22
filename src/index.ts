import express, { Express, Request, Response } from 'express'
import dotenv from 'dotenv'
import * as fs from 'fs/promises'
import { create } from 'domain'
import { determineFilter } from './utils'
import { deleteQuestion } from './utils'
import { createUniqueRandomSet } from './utils'

dotenv.config()

// Type definition for question
type Difficulty = 'easy' | 'medium' | 'hard'

type Question = {
	id: number
	category: string
	difficulty: Difficulty
	question: string
	options: Array<string>
	answer: string
	favourited: boolean // This should be boolean instead of true
	timestamp: Date
}

export type Questions = Array<Question>
type OuterQuestion = { questions: Questions } // Adjusted to match the JSON structure

const app: Express = express()
const port = process.env.PORT || 3001

export async function loadData(): Promise<OuterQuestion> {
	const fileContent: string = await fs.readFile('data.json', 'utf8')
	return JSON.parse(fileContent)
}

app.listen(port, () => {
	console.log(`[server]: Server is running at http://localhost:${port}`)
})


app.get('/', async (req: Request, res: Response) => {
	const filecontent = await loadData()
	let Allquestions = filecontent.questions
	res.json(Allquestions) // Use res.json to send data as a JSON object
})

app.get('/first', async (req: Request, res: Response) => {
	const filecontent = await loadData()
	let Allquestions = filecontent.questions
	res.json(Allquestions[0]) // Use res.json to send data as a JSON object
})

app.get('/random/:num', async (req: Request, res: Response) => {

	const num = parseInt(req.params.num)
	const filecontent = await loadData()
	let Allquestions = filecontent.questions

	let questionsDisplay: Questions = []

	const indexesSet: Set<number> = createUniqueRandomSet(num,Allquestions.length)////ERROR
	const indexesArray: Array<number> = Array.from(indexesSet)
	console.log(indexesArray)
	
	for (let i = 0; i < Math.min(num, indexesArray.length); i++) {
		questionsDisplay.push(Allquestions[indexesArray[i]])
	}

	res.json(questionsDisplay) // Use res.json to send data as a JSON object
})

app.get('/togglefav/:id', async (req: Request, res: Response) => {
	const id = parseInt(req.params.id)
	const filecontent = await loadData()
	let Allquestions = filecontent.questions

	console.log("Previous "+Allquestions[id].favourited )
	Allquestions[id].favourited = true
	console.log("Post "+Allquestions[id].favourited )

	res.json(Allquestions) // Use res.json to send data as a JSON object

	//write the JSON file

})
