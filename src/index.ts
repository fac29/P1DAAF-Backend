import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import * as fs from "fs/promises";
import { create } from "domain";
import { determineFilter } from "./utils";
import { POSThandler } from "./route/POSThandler";
import { deleteQuestion, editQuestion } from "./utils";
import { createUniqueRandomSet } from "./utils";

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

app.get("/", async (req: Request, res: Response) => {
  const filecontent = await loadData();
  let Allquestions = filecontent.questions;
  res.json(Allquestions); // Use res.json to send data as a JSON object
});

app.get("/first", async (req: Request, res: Response) => {
  const filecontent = await loadData();
  let Allquestions = filecontent.questions;
  res.json(Allquestions[0]); // Use res.json to send data as a JSON object
});

app.get("/random/:num", async (req: Request, res: Response) => {
  const num = parseInt(req.params.num);
  const filecontent = await loadData();
  let Allquestions = filecontent.questions;

  let questionsDisplay: Questions = [];

  const indexesSet: Set<number> = createUniqueRandomSet(
    num,
    Allquestions.length
  );
  const indexesArray: Array<number> = Array.from(indexesSet);
  console.log(indexesArray);

  for (let i = 0; i < Math.min(num, indexesArray.length); i++) {
    questionsDisplay.push(Allquestions[indexesArray[i]]);
  }

  res.json(questionsDisplay); // Use res.json to send data as a JSON object
});

app.get("/togglefav/:id", async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);

  //Load existing data
  const filecontent = await loadData();
  let Allquestions = filecontent.questions;

  // Validate the id
  if (isNaN(id) || id < 0) {
    return res.status(400).send("Invalid question id");
  } else {
    const index: number = Allquestions.findIndex((ques) => ques.id === id);
    if (index === -1) {
      return res.status(500).send("Index incorrect");
    }

    Allquestions[index].favourited = !Allquestions[index].favourited;

    try {
      const formattedAllQuestions: OuterQuestion = { questions: Allquestions };
      let JSONstring = JSON.stringify(formattedAllQuestions, null, " ");
      await fs.writeFile("./data.json", JSONstring);
      res.json(Allquestions);
    } catch (error) {
      console.log(error);
    }
  }
});

app.post("/edit-question", async (req, res) => {
  const filecontent = await loadData();
  let Allquestions = filecontent.questions;
  const questionObj: Question = req.body;
  const fieldToChange = "question";
  if (!questionObj) {
    res.status(400).send("Missing Request body");
    console.log("no body");
  } else {
    try {
      editQuestion(Allquestions, questionObj, fieldToChange);
      res.status(200).send("Question edited successfully!");
    } catch (error) {
      console.log(error);
      res.status(500).send("Error editing question.");
    }
  }
});

app.delete("/delete-post/:id", async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);

  const filecontent = await loadData();
  let Allquestions = filecontent.questions;

  try {
    deleteQuestion(Allquestions, id);
    console.log(`LOOK HERE !!! ${JSON.stringify(Allquestions[id - 1])}`);
    res.status(200).send("Question deleted successfully!");
    res.redirect("/");
  } catch (error) {
    console.log(error);
    res.status(500).send("Error deleting question!");
  }
  //res.redirect('/')
});

POSThandler(app);
