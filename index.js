import express, { json } from 'express';
const app = express();
import  connectDB  from './db.js';

import dotenv from  'dotenv';

app.use(json());

// routes for pitches
app.use('/api/pitches', require('./routes/pitchRoutes'));

// setup express server
const port = process.env.PORT || 8081;
(  () => {
     connectDB();
    app.listen(port, () => {
        console.log(`Server listening on ${port}`);
    })
})();