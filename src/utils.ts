import { stringify } from "querystring";
import { Questions } from "./index";
import * as fs from "fs/promises";

type FilterTypes = "difficulty" | "category" | "favourited";
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

export function deleteQuestion(questionsArr: Questions, id: number) {
  let removedQuestionArr = questionsArr.filter(
    (question) => question.id !== id
  );
  let jsonFormatQuestions = { questions: removedQuestionArr };
  let jsonFormatted = JSON.stringify(jsonFormatQuestions);
  fs.writeFile("data.json", jsonFormatted);
}
