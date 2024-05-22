import { stringify } from "querystring";
import { Questions } from "./index";
import * as fs from "fs/promises";

type FilterTypes =
  | "difficulty"
  | "category"
  | "favourited"
  | "question"
  | "options"
  | "answer";
type Favourited = true | false;

function filterByDifficulty(questionsArr: Questions, difficulty: string) {
  return questionsArr.filter((question) => question.difficulty === difficulty);
}

function filterByCategory(questionsArr: Questions, category: string) {
  return questionsArr.filter((question) => question.category === category);
}

function filterByFavourited(questionsArr: Questions, Favourited: boolean) {
  return questionsArr.filter((question) => question.favourited === Favourited);
}

export function determineFilter(
  questionsArr: Questions,
  filter: FilterTypes,
  whatToFilterBy: string | Favourited
) {
  if (filter === "difficulty") {
    if (typeof whatToFilterBy === "string") {
      return filterByDifficulty(questionsArr, whatToFilterBy);
    } else {
      throw new Error("Expected a string for difficulty filter");
    }
  } else if (filter === "category") {
    if (typeof whatToFilterBy === "string") {
      return filterByCategory(questionsArr, whatToFilterBy);
    } else {
      throw new Error("Expected a string for category filter");
    }
  } else if (filter === "favourited") {
    if (typeof whatToFilterBy === "boolean") {
      return filterByFavourited(questionsArr, whatToFilterBy);
    } else {
      throw new Error("Expected a boolean for favourited filter");
    }
  }
}
export function editQuestion(
  questionsArr: Questions,
  question: Question,
  fieldToChange: FilterTypes
) {
  const questionId = parseInt(question.id as unknown as string, 10);

  let questionToEditIndex = questionsArr.findIndex(
    (ques) => ques.id === questionId
  );
  if (fieldToChange === "category") {
    questionsArr[questionToEditIndex].category = "Geography";
  } else if (fieldToChange === "difficulty") {
    questionsArr[questionToEditIndex].difficulty = "easy";
  } else if (fieldToChange === "question") {
    questionsArr[questionToEditIndex].question =
      "What is the capital of Argentina?";
  } else if (fieldToChange === "options") {
    questionsArr[questionToEditIndex].options = [
      "London",
      "Paris",
      "Santiago",
      "Buenos Aires",
    ];
  } else if (fieldToChange === "answer") {
    questionsArr[questionToEditIndex].answer = "Buenos Aires";
  }

  const jsonFormatQuestions = { questions: questionsArr };
  const jsonFormatted = JSON.stringify(jsonFormatQuestions);
  fs.writeFile("data.json", jsonFormatted);
}

export function deleteQuestion(questionsArr: Questions, id: number) {
  let removedQuestionArr = questionsArr.filter(
    (question) => question.id !== id
  );
  let jsonFormatQuestions = { questions: removedQuestionArr };
  let jsonFormatted = JSON.stringify(jsonFormatQuestions);
  fs.writeFile("data.json", jsonFormatted);
}
