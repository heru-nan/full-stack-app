import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import path from 'path';
import './initialize-db';
import {authenticationRoute, authenticationTokens} from './authenticate';
import {createUserRoute} from './create-user';
import { taskRoute } from './tasks';
import { groupRoute } from './groups';
import {connectDB} from './connect-db';


const port = process.env.PORT || 7777;
const app = express();

app.listen(port, console.log("server listening on port ", port));

app.use(
    cors(), bodyParser.urlencoded({extended: true}), bodyParser.json()
);

authenticationRoute(app);
createUserRoute(app);

app.use((req, res, next) =>{
    console.log(authenticationTokens);
    if(!req.body.session === false){
        const {token, id} = req.body.session;

        const ttoken = authenticationTokens.find(e => e.userID === id);
        if(
            token === ttoken.token && id === ttoken.userID
        ) {
            taskRoute(app);
            groupRoute(app);

            const addNewComment = async comment => {
                let db = await connectDB();
                let collection = db.collection("comments");
                await collection.insertOne(comment);
            }
            
            app.post('/comment/new', async (req, res) => {
                let comment = req.body.comment;
                await addNewComment(comment);
                res.status(200).send();
            })

        }
        else{
            res.status(403).send({message: "required token"})
        }
    }
    next();
})


if(process.env.NODE_ENV == `production`){
    app.use(express.static(path.resolve(__dirname, '../../dist')));
    app.get('/*', (req, res) => {
        res.sendFile(path.resolve('index.html'))
    })
}



