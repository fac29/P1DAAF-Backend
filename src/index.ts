import express, { Express, Request, Response } from 'express'
import dotenv from 'dotenv'
import * as fs from 'fs'

dotenv.config()

const app: Express = express()
const port = process.env.PORT || 3001

const data = JSON.parse(fs.readFileSync('data.json', 'utf8'));
console.log(data)

app.get('/', (req: Request, res: Response) => {
	res.send(data.questions)
})

app.listen(port, () => {
	console.log(`[server]: Server is running at http://localhost:${port}`)
})
