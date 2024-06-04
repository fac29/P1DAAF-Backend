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
const porthttps = process.env.PORTHTTPS || 8443

// Function to check if SSL files exist
const sslFilesExist = (keyPath: string, certPath: string): boolean => {
    return fs.existsSync(keyPath) && fs.existsSync(certPath);
};

const keyPath = path.resolve(__dirname, '../keys/selfsigned.key');
const certPath = path.resolve(__dirname, '../keys/certs/selfsigned.crt');

if (sslFilesExist(keyPath, certPath)) {
    // Read SSL certificate and key files
    const options = {
        key: fs.readFileSync(keyPath),
        cert: fs.readFileSync(certPath),
    };

    // Create HTTPS server
    const serverHTTPS = https.createServer(options, apphttps);

    serverHTTPS.listen(porthttps, () => {
        console.log(`[server]: HTTPS Server is running at https://localhost:${porthttps}`);
    });

    // Installed to access from frontend
    const cors = require('cors');
    apphttps.use(cors());

    // Middleware
    apphttps.use(morgan('dev'));
    apphttps.use(express.json());

    // Register handlers for HTTPS app
    POSThandler(apphttps);
    FILTERhandler(apphttps);
    ALLhandler(apphttps);
    RANDOMhandler(apphttps);
    TOGGLEFAVhandler(apphttps);
    DELETEhandler(apphttps);
    EDIThandler(apphttps);
    GETbyid(apphttps);
} else {
    console.log('[server]: SSL key or certificate not found. HTTPS server will not be started.');
}



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

app.listen(port, () => {
	console.log(`[server]: Server is running at ${port}`)
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
