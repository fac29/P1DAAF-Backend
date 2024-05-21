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
console.log(data)
const questionsArray:questions = data.questions

// console.log(questionsArray[0])

app.get('/', (req: Request, res: Response) => {
	res.send(data)
})

app.listen(port, () => {
	console.log(`[server]: Server is running at http://localhost:${port}`)
})
