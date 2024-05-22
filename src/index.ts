import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import * as fs from "fs/promises";
import { POSThandler } from "./route/POSThandler";

dotenv.config();

// Type definition for question
type Difficulty = "easy" | "medium" | "hard";

export type Question = {
  id: number;
  category: string;
  difficulty: Difficulty;
  question: string;
  options: Array<string>;
  answer: string;
  favourited: boolean; // This should be boolean instead of true
  timestamp: Date;
};

export type Questions = Array<Question>;
type OuterQuestion = { questions: Questions }; // Adjusted to match the JSON structure

export const app: Express = express();

const port = process.env.PORT || 3001;

export async function loadData(): Promise<OuterQuestion> {
  const fileContent: string = await fs.readFile("data.json", "utf8");
  return JSON.parse(fileContent);
}

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});

// export let questionsArray: Questions = [];

// loadData()
//   .then((loadedData) => {
//     questionsArray = loadedData.questions;
//     //console.log(questionsArray);

//     app.get("/first", (req: Request, res: Response) => {
//       res.json(questionsArray[0]); // Use res.json to send data as a JSON object
//     });
//   })
//   .catch((err) => {
//     console.error("Error loading data:", err);
//   });

app.get("/", async (req: Request, res: Response) => {
  const fileContent = await loadData();
  let Allquestions = fileContent.questions;
  res.json(Allquestions); // Use res.json to send data as a JSON object
});

// enable middleware to parse body of Content-type: application/json
app.use(express.json());

POSThandler(app);
