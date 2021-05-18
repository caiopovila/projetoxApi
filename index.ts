import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as helmet from 'helmet';

import { app } from './src/app';


const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.listen(port, () => console.log('App listado na porta ' + port));
