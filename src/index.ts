import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import * as fs from "fs/promises";
import { POSThandler } from "./route/POSThandler";
import { FILTERhandler } from "./route/FILTERhandler";
import { Question, Questions, OuterQuestion } from "./types";
import ALLhandler from "./route/ALLhandler";
import RANDOMhandler from "./route/RANDOMhandler";
import TOGGLEFAVhandler from "./route/TOGGLEFAVhandler";
import DELETEhandler from "./route/DELETEhandler";
import EDIThandler from "./route/EDIThandler";
import { GETbyid } from "./route/GETbyid";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3001;
//middleware to parse body of Content-type: application/json
app.use(express.json());
export async function loadData(): Promise<OuterQuestion> {
  const fileContent: string = await fs.readFile("data.json", "utf8");
  return JSON.parse(fileContent);
}

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});

POSThandler(app);
FILTERhandler(app);
ALLhandler(app);
RANDOMhandler(app);
TOGGLEFAVhandler(app);
DELETEhandler(app);
EDIThandler(app);
GETbyid(app);
