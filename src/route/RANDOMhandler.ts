import { Express } from 'express'
import { loadData } from '../index'
import { Questions } from '../types';
import { createUniqueRandomSet } from '../utils';

export function RANDOMhandler(app: Express) {
	app.get('/random/:num', async (req, res) => {

        const num = parseInt(req.params.num);
        const filecontent = await loadData();
        let Allquestions = filecontent.questions;
    
        let questionsDisplay: Questions = [];
    
        const indexesSet: Set<number> = createUniqueRandomSet(
            num,
            Allquestions.length
        );
        const indexesArray: Array<number> = Array.from(indexesSet);
        console.log(indexesArray);
    
        for (let i = 0; i < Math.min(num, indexesArray.length); i++) {
            questionsDisplay.push(Allquestions[indexesArray[i]]);
        }
    
        res.json(questionsDisplay); // Use res.json to send data as a JSON object
    });
}

export default RANDOMhandler
