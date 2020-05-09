import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import path from 'path';
import {connectDB} from './connect-db';
import './initialize-db';
import {authenticationRoute} from './authenticate';
import {createUserRoute} from './create-user';
import { taskRoute } from './tasks';

const port = process.env.PORT || 7777;
const app = express();

app.listen(port, console.log("server listening on port ", port));

app.use(
    cors(), bodyParser.urlencoded({extended: true}), bodyParser.json()
);

authenticationRoute(app);
createUserRoute(app);
taskRoute(app);

if(process.env.NODE_ENV == `production`){
    app.use(express.static(path.resolve(__dirname, '../../dist')));
    app.get('/*', (req, res) => {
        res.sendFile(path.resolve('index.html'))
    })
}



export const addNewComment = async comment => {
    let db = await connectDB();
    let collection = db.collection("comments");
    await collection.insertOne(comment);
}



app.post('/comment/new', async (req, res) => {
    let comment = req.body.comment;
    await addNewComment(comment);
    res.status(200).send();
})