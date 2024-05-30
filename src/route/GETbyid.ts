import { Express } from "express";
import { loadData } from "../index";
import { filterById } from "../utils";

export function GETbyid(app: Express) {
  app.get("/get-question-by-id/:num", async (req, res) => {
    const filecontent = await loadData();
    let Allquestions = filecontent.questions;
    const questionId: number = parseInt(req.params.num);

    const question = filterById(Allquestions, questionId);

    if (Object.keys(question).length > 0) {
      res.status(200).json(question);
    } else {
      res.status(404).send("Id doesn't exist.");
    }
  });
}
