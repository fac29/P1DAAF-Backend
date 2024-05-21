import { questionsArray } from "./index";

function filterByDifficulty(difficulty: string) {
	return questionsArray.filter(question => question.difficulty === difficulty);
}

function filterByCategory(category: string) {
	return questionsArray.filter(question => question.category === category);
}

function filterByFavourited(favourited: boolean) {
	return questionsArray.filter(question => question.favourited === favourited);
}

type FilterTypes = "difficulty" | "category" | "favourited";
type Favourited = true | false;

export function determineFilter(filter: FilterTypes, whatToFilterBy: string | Favourited) {
	if (filter === 'difficulty') {
		if (typeof whatToFilterBy === 'string') {
		  return filterByDifficulty(whatToFilterBy);
		} else {
		  throw new Error('Expected a string for difficulty filter');
		}
	  } else if (filter === 'category') {
		if (typeof whatToFilterBy === 'string') {
		 return filterByCategory(whatToFilterBy);
		} else {
		  throw new Error('Expected a string for category filter');
		}
	  } else if (filter === 'favourited') {
		if (typeof whatToFilterBy === 'boolean') {
		 return filterByFavourited(whatToFilterBy);
		} else {
		  throw new Error('Expected a boolean for favourited filter');
		}
	  }
    }