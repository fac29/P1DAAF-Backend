import { Express } from 'express'
import { loadData } from '../index'
import { Question } from '../types'
import { editQuestion } from '../utils'

export function EDIThandler(app: Express) {
	app.post('/edit-question', async (req, res) => {
        const filecontent = await loadData()
        let Allquestions = filecontent.questions
        const questionObj: Question = req.body
        if (!questionObj) {
            res.status(400).send('Missing Request body')
            console.log('no body')
        } else {
            try {
                editQuestion(Allquestions, questionObj)
                res.status(200).send('Question edited successfully!')
            } catch (error) {
                console.log(error)
                res.status(500).send('Error editing question.')
            }
        }
    })
}

export default EDIThandler
