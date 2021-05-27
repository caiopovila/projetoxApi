import * as mongoose from 'mongoose';
import { config } from 'dotenv';


config();

mongoose.connect(process.env.CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection.on('error', console.error.bind(console, 'connection error:'))
.once('open', () => {
    console.log('Connected!');
});

export { mongoose as db };
