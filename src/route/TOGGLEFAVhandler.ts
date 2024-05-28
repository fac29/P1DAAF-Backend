import { Express } from 'express'
import { loadData } from '../index'
import { OuterQuestion } from '../types'
import * as fs from 'fs/promises'

export function TOGGLEFAVhandler(app: Express) {
	app.put('/togglefav/:id', async (req, res) => {
        const id = parseInt(req.params.id)
    
        //Load existing data
        const filecontent = await loadData()
        let Allquestions = filecontent.questions
    
        // Validate the id
        if (isNaN(id) || id < 0) {
            return res.status(400).send('Invalid question id')
        } else {
            const index: number = Allquestions.findIndex((ques) => ques.id === id)
            if (index === -1) {
                return res.status(500).send('Index incorrect')
            }
    
            Allquestions[index].favourited = !Allquestions[index].favourited
    
            try {
                const formattedAllQuestions: OuterQuestion = { questions: Allquestions }
                let JSONstring = JSON.stringify(formattedAllQuestions, null, ' ')
                await fs.writeFile('./data.json', JSONstring)
                res.json(Allquestions)
            } catch (error) {
                console.log(error)
            }
        }
    })
}

export default TOGGLEFAVhandler
