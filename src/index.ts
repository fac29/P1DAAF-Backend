import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import * as fs from "fs/promises";
import { create } from 'domain'
import { determineFilter } from "./utils";

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

export type Questions = Array<Question>;
type OuterQuestion = { questions: Questions }; // Adjusted to match the JSON structure

const app: Express = express()
const port = process.env.PORT || 3001

async function loadData(): Promise<OuterQuestion> {
	const fileContent: string = await fs.readFile('data.json', 'utf8')
	return JSON.parse(fileContent)
}

app.listen(port, () => {
	console.log(`[server]: Server is running at http://localhost:${port}`)
})

function createUniqueRandomSet(n: number): Set<number> {
    const valueSet = new Set<number>();
    while (valueSet.size < n) {
        valueSet.add(Math.floor(Math.random() * (n + 1)));
    }
    return valueSet;
}
createUniqueRandomSet(5)

loadData()
	.then((loadedData) => {
		const questionsArray: Questions = loadedData.questions

		app.get('/', (req: Request, res: Response) => {
			res.json(questionsArray) // Use res.json to send data as a JSON object
		})

		app.get('/first', (req: Request, res: Response) => {
			res.json(questionsArray[0]) // Use res.json to send data as a JSON object
		})

		app.get('/random/:num', (req: Request, res: Response) => {
			const num = parseInt(req.params.num)
			let questionsDisplay: Questions = []
			const indexesSet: Set<number> = createUniqueRandomSet(num)
			const indexesArray: Array<number> = Array.from(indexesSet)

			for (let i = 0; i < Math.min(num,questionsArray.length); i++){
				questionsDisplay.push(questionsArray[indexesArray[i]])
			}
	
			res.json(questionsDisplay) // Use res.json to send data as a JSON object
		})
	})
	.catch((err) => {
		console.error('Error loading data:', err)
	})
