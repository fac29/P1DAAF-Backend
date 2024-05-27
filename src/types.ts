export type FilterTypes =
	| 'difficulty'
	| 'category'
	| 'favourited'
	| 'question'
	| 'options'
	| 'answer'

export type Favourited = true | false

export type Difficulty = 'easy' | 'medium' | 'hard'

export type Question = {
	id: number
	category: string
	difficulty: Difficulty
	question: string
	options: Array<string>
	answer: string
	favourited: boolean // This should be boolean instead of true
	timestamp: Date
}
export type Questions = Array<Question>
export type OuterQuestion = { questions: Questions }
