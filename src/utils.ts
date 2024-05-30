import { Questions, Question, CategoryFilterTypes, Difficulty } from "./types";
import * as fs from "fs/promises";

function filterByDifficulty(questionsArr: Questions, difficulty: string) {
  if (difficulty === "all") {
    return questionsArr;
  } else {
    return questionsArr.filter(
      (question) => question.difficulty === difficulty
    );
  }
}

function filterByCategory(
  questionsArr: Questions,
  category: CategoryFilterTypes
) {
  return questionsArr.filter((question) => question.category === category);
}

function filterByFavourited(questionsArr: Questions, Favourited: boolean) {
  return questionsArr.filter((question) => question.favourited === Favourited);
}

export function filterById(questionsArr: Questions, id: number) {
  return questionsArr.filter((question) => question.id === id);
}

export function createUniqueRandomSet(n: number, indexn: number): Set<number> {
  const valueSet = new Set<number>();
  while (valueSet.size < n) {
    valueSet.add(Math.floor(Math.random() * indexn));
  }
  return valueSet;
}

//determine category filter
export function determineFilter(
  questionsArr: Questions,
  categoryFilter: CategoryFilterTypes,
  difficulty: Difficulty
) {
  let result1: Question[] = [];
  let result2: Question[] = [];

  if (categoryFilter === "Favourited") {
    result1 = filterByFavourited(questionsArr, true);
    console.log(result1);
    result2 = filterByDifficulty(result1, difficulty);
  } else {
    result1 = filterByCategory(questionsArr, categoryFilter);
    //console.log(result);
    result2 = filterByDifficulty(result1, difficulty);
  }

  return result2;
}

export function editQuestion(questionsArr: Questions, question: Question) {
  const questionId = parseInt(question.id as unknown as string, 10);

  let questionToEditIndex = questionsArr.findIndex(
    (ques) => ques.id === questionId
  );
  questionsArr[questionToEditIndex] = question;

  const jsonFormatQuestions = { questions: questionsArr };
  const jsonFormatted = JSON.stringify(jsonFormatQuestions, null, " ");
  fs.writeFile("data.json", jsonFormatted);
}

export function deleteQuestion(questionsArr: Questions, id: number) {
  let removedQuestionArr = questionsArr.filter(
    (question) => question.id !== id
  );
  let jsonFormatQuestions = { questions: removedQuestionArr };
  let jsonFormatted = JSON.stringify(jsonFormatQuestions, null, " ");
  fs.writeFile("data.json", jsonFormatted);
}
