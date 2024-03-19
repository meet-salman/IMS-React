import express from "express";
import cors from 'cors';
import { PORT } from "./config/env.js";
import mongoDB from './config/mongoDB.js'
import router from './routes/router.js'
const app = express();


// MiddleWare
app.use(cors())
app.use(express.json())


// Database Connection
mongoDB.connection
    .once('open', () => {
        app.listen(PORT);
        console.log("Database Connected");
    })
    .on("error", (err) => {
        console.log("Error Connecting DB -->", err)
    })


app.use('/', router)


