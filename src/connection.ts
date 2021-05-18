import * as mongoose from 'mongoose';

mongoose.connect('mongodb://localhost:27017/projetox', { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection.on('error', console.error.bind(console, 'connection error:'))
.once('open', () => {
    console.log('Connected!');
});

export default mongoose;
