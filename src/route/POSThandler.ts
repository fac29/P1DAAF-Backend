import { loadData } from "../index";
import { Question } from "../types";
import * as fs from "fs/promises";
import { Express } from "express";

export function POSThandler(app: Express) {
  app.post("/create-question", async (req, res) => {
    const fileContent = await loadData();
    console.log(fileContent);
    let Allquestions = fileContent.questions;
    console.log(Allquestions);
    let newQuestion: Question = req.body;

    if (!newQuestion) {
      res.status(400).send("Request Body is missing");
      return;
    }

    Allquestions.push(newQuestion);

    let newQuestionsArray = { questions: Allquestions };
    let JSONstring = JSON.stringify(newQuestionsArray, null, " ");

    //write data to the files
    try {
      await fs.writeFile("./data.json", JSONstring);
      res.status(200).send("Question successfully added!");
    } catch (error) {
      console.log(error);
      res.status(500).send("Error in adding data to the file");
    }
  });
}
