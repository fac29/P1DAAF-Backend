import express, { Express, Request, Response } from 'express'
import dotenv from 'dotenv'
import * as fs from 'fs/promises'
import { create } from 'domain'
import { determineFilter } from './utils'
import { POSThandler } from './route/POSThandler'
import { deleteQuestion, editQuestion } from './utils'
import { createUniqueRandomSet } from './utils'
import { FILTERhandler } from './route/FILTERhandler'
import { Question, Questions, OuterQuestion } from './types'
import ALLhandler from './route/ALLhandler'
import RANDOMhandler from './route/RANDOMhandler'
import TOGGLEFAVhandler from './route/TOGGLEFAVhandler'
import DELETEhandler from './route/DELETEhandler'
import EDIThandler from './route/EDIThandler'

dotenv.config()

const app: Express = express()
const port = process.env.PORT || 3001
//middleware to parse body of Content-type: application/json
app.use(express.json())
export async function loadData(): Promise<OuterQuestion> {
	const fileContent: string = await fs.readFile('data.json', 'utf8')
	return JSON.parse(fileContent)
}

app.listen(port, () => {
	console.log(`[server]: Server is running at http://localhost:${port}`)
})


// app.post('/edit-question', async (req, res) => {
// 	const filecontent = await loadData()
// 	let Allquestions = filecontent.questions
// 	const questionObj: Question = req.body
// 	if (!questionObj) {
// 		res.status(400).send('Missing Request body')
// 		console.log('no body')
// 	} else {
// 		try {
// 			editQuestion(Allquestions, questionObj)
// 			res.status(200).send('Question edited successfully!')
// 		} catch (error) {
// 			console.log(error)
// 			res.status(500).send('Error editing question.')
// 		}
// 	}
// })



POSThandler(app)
FILTERhandler(app)
ALLhandler(app)
RANDOMhandler(app)
TOGGLEFAVhandler(app)
DELETEhandler(app)
EDIThandler(app)
