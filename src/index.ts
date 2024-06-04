import express, { Express, Request, Response } from 'express'
import dotenv from 'dotenv'
//import * as fs from "fs/promises";
import * as fs from 'fs'
import { POSThandler } from './route/POSThandler'
import { FILTERhandler } from './route/FILTERhandler'
import { Question, Questions, OuterQuestion } from './types'
import ALLhandler from './route/ALLhandler'
import RANDOMhandler from './route/RANDOMhandler'
import TOGGLEFAVhandler from './route/TOGGLEFAVhandler'
import DELETEhandler from './route/DELETEhandler'
import EDIThandler from './route/EDIThandler'
import { GETbyid } from './route/GETbyid'
import https from 'https'
import morgan from 'morgan'
import path = require('path')

dotenv.config()

const app: Express = express()

const port = process.env.PORT || 3000

// Read SSL certificate and key files
const options = {
  key: fs.readFileSync("/etc/ssl/private/selfsigned.key"),
  cert: fs.readFileSync("/etc/ssl/certs/selfsigned.crt"),
};

// Create HTTPS server
const server = https.createServer(options, app)

//Installed to access from frontend
const cors = require('cors')
app.use(cors())

// Middleware
app.use(morgan('dev'))

//middleware to parse body of Content-type: application/json
app.use(express.json())
export async function loadData(): Promise<OuterQuestion> {
	const fileContent: string = await fs.promises.readFile('data.json', 'utf8')
	return JSON.parse(fileContent)
}

server.listen(port, () => {
	console.log(`[server]: Server is running at http://localhost:${port}`)
})

POSThandler(app)
FILTERhandler(app)
ALLhandler(app)
RANDOMhandler(app)
TOGGLEFAVhandler(app)
DELETEhandler(app)
EDIThandler(app)
GETbyid(app)
