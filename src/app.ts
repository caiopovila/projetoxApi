import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as helmet from 'helmet';

import * as controller from './controller';
import { verify } from './jwt';

export const app = express();

app.use(helmet());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.json({ 
        name: 'Projeto X API',
        version: 1.0
    });
});

app.post('/auth', controller.user.authUser);

app.get('/user', verify, controller.user.user);

app.get('/logout', verify, controller.user.logout);

app.get('/cover', verify, controller.cover.covers);

app.get('/quotation', verify, controller.quotation.quotations);

app.post('/quotation', verify, controller.quotation.newQuotation);

app.get('/tender', verify, controller.tender.tenders);

app.post('/tender', verify, controller.tender.newTender);

app.get('/policy', verify, controller.policy.policys);

app.post('/policy', verify, controller.policy.newPolicy);
