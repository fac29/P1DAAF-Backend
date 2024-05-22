import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import * as fs from "fs/promises";
import { determineFilter } from "./utils";
//import { addQuestion } from "./POSTquestion";

dotenv.config();

// Type definition for question
type Difficulty = "easy" | "medium" | "hard";

type Question = {
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

// enable middleware to parse body of Content-type: application/json
app.use(express.json());

export async function loadData(): Promise<OuterQuestion> {
  const fileContent: string = await fs.readFile("data.json", "utf8");
  return JSON.parse(fileContent);
}

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});

export let questionsArray: Questions = [];

loadData()
  .then((loadedData) => {
    questionsArray = loadedData.questions;
    //console.log(questionsArray);

    app.get("/", (req: Request, res: Response) => {
      res.json(questionsArray); // Use res.json to send data as a JSON object
    });

    app.get("/first", (req: Request, res: Response) => {
      res.json(questionsArray[0]); // Use res.json to send data as a JSON object
    });
  })
  .catch((err) => {
    console.error("Error loading data:", err);
  });

// let testQuestion: Question = {
//   id: 201,
//   category: "History",
//   difficulty: "hard",
//   question: "When was Princess Fergal born?",
//   options: ["01/07/1998", "07/07/1998", "02/02/1961", "09/09/1990"],
//   answer: "07/07/1998",
//   favourited: true,
//   timestamp: new Date(),
// };

app.post("/create-question", async (req, res) => {
  let newQuestion: Question = req.body;

  if (!newQuestion) {
    res.status(400).send("Request Body is missing");
    return;
  }
  //console.log(`BEFORE: ${questionsArray}`);
  questionsArray.push(newQuestion);
  //console.log(`AFTER: ${questionsArray}`);
  let newQuestionsArray = { questions: questionsArray };
  let JSONstring = JSON.stringify(newQuestionsArray, null, " ");

  //write data to the file
  try {
    await fs.writeFile("./data.json", JSONstring);
    res.status(200).send("Question successfully added!");
  } catch (error) {
    console.log(error);
    res.status(500).send("Error in adding data to the file");
  }
});
