import { Express } from 'express'
import { loadData } from '../index'
import { deleteQuestion } from '../utils'

export function DELETEhandler(app: Express) {
	app.delete('/delete-post/:id', async (req, res) => {
        const id = parseInt(req.params.id)
    
        const filecontent = await loadData()
        let Allquestions = filecontent.questions
    
        try {
            deleteQuestion(Allquestions, id)
            console.log(`LOOK HERE !!! ${JSON.stringify(Allquestions[id - 1])}`)
            res.status(200).send('Question deleted successfully!')
        } catch (error) {
            console.log(error)
            res.status(500).send('Error deleting question!')
        }
    })
}

export default DELETEhandler
