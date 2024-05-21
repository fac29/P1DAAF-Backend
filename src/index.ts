import express, { Express, Request, Response } from 'express'
import dotenv from 'dotenv'
import * as fs from 'fs'

dotenv.config()

// Type definition for question
type difficulty = "easy" | "medium" | "hard"
type question = {
		id: number,
		category: string,
		difficulty: difficulty,
		question: string,
		options: Array<string>,
		//Worth having an index instead?
		answer: string,
		favourited: true,
		timestamp: Date
}
type questions = Array<question>

const app: Express = express()
const port = process.env.PORT || 3001

const data = JSON.parse(fs.readFileSync('data.json', 'utf8'))

const questionsArray:questions = data.questions

app.get('/', (req: Request, res: Response) => {
	res.send(data)
})

app.listen(port, () => {
	console.log(`[server]: Server is running at http://localhost:${port}`)
})

function filterByDifficulty(questionArr: questions, difficulty: string) {
	return questionArr.filter(question => (question).difficulty === difficulty);
}

function filterByCategory(questionArr: questions, category: string) {
	return questionArr.filter(question => (question).category === category);
}

function filterByFavourited(questionArr: questions, favourited: true) {
	return questionArr.filter(question => (question).favourited === favourited);
}

