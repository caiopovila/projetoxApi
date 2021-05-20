import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as helmet from 'helmet';

import * as controller from './controller';


export const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.json({ 
        name: 'Projeto X API',
        version: 1.0
    });
});

app.post('/auth', controller.user.authUser);