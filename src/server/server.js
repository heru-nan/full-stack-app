import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import path from 'path';
import {connectDB} from './connect-db';
import './initialize-db';
import {authenticationRoute} from './authenticate';

const port = process.env.PORT || 7777;
const app = express();

app.listen(port, console.log("server listening on port ", port));

app.use(
    cors(), bodyParser.urlencoded({extended: true}), bodyParser.json()
);

authenticationRoute(app);

if(process.env.NODE_ENV == `production`){
    app.use(express.static(path.resolve(__dirname, '../../dist')));
    app.get('/*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'index.html'))
    })
}


export const addNewTask = async task => {
    let db = await connectDB();
    let collection = db.collection("tasks");
    await collection.insertOne(task);
}

export const updateTask = async task => {
    let {id, group, isComplete, name} = task;
    let db = await connectDB();
    let collection = db.collection("tasks");
    
    if(group){
        await collection.updateOne({id}, {$set:{group}});
    }
     
    if(name){
        await collection.updateOne({id}, {$set:{name}});
    }
     
    if(isComplete !== undefined){
        await collection.updateOne({id}, {$set:{isComplete}});
    }
}

app.post('/task/new', async (req, res) => {
    let task = req.body.task;

    await addNewTask(task);
    res.status(200).send();
});

app.post ('/task/update', async (req, res) => {
    let task = req.body.task;
    
    await updateTask(task);
    res.status(200).send();
})