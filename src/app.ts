import * as express from 'express';


export const app = express();

app.get('/', (req, res) => {
    res.json({ 
        name: 'Projeto X API',
        version: 1.0
    });
});
