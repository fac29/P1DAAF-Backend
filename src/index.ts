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
const apphttps: Express = express()

const port = process.env.PORT || 3000
const porthttps = process.env.PORTHTTPS || 443

// Read SSL certificate and key files
const options = {
	key: fs.readFileSync(path.resolve(__dirname, '../keys/selfsigned.key')),
	cert: fs.readFileSync(path.resolve(__dirname, '../keys/certs/selfsigned.crt')),
  };

// Create HTTPS server
const serverHTTPS = https.createServer(options, apphttps)


//Installed to access from frontend
const cors = require('cors')
app.use(cors())
apphttps.use(cors())

// Middleware
app.use(morgan('dev'))
apphttps.use(morgan('dev'))

//middleware to parse body of Content-type: application/json
app.use(express.json())
apphttps.use(express.json())

export async function loadData(): Promise<OuterQuestion> {
	const fileContent: string = await fs.promises.readFile('data.json', 'utf8')
	return JSON.parse(fileContent)
}

app.listen(port, () => {
	console.log(`[server]: Server is running at ${port}`)
})

serverHTTPS.listen(porthttps, () => {
	console.log(`[server]: HTTPS Server is running at ${porthttps}`)
})

POSThandler(app)
FILTERhandler(app)
ALLhandler(app)
RANDOMhandler(app)
TOGGLEFAVhandler(app)
DELETEhandler(app)
EDIThandler(app)
GETbyid(app)

POSThandler(apphttps)
FILTERhandler(apphttps)
ALLhandler(apphttps)
RANDOMhandler(apphttps)
TOGGLEFAVhandler(apphttps)
DELETEhandler(apphttps)
EDIThandler(apphttps)
GETbyid(apphttps)
