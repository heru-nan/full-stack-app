import {v4 as uuidv4} from 'uuid';
import md5 from 'md5';

import {connectDB} from './connect-db';



const authenticationTokens = [];

async function assembleUserState(user){
    let db = await connectDB();
    let tasks = await db.collection("tasks").find({owner: user._id}).toArray();
    let groups = await db.collection("groups").find({owner: user._id}).toArray();
    let comments = await db.collection("comments").find({owner: user._id}).toArray();

    
    return {
        tasks,
        groups,
        comments,
        session: {authenticated: `AUTHENTICATED`, id: user._id, name: user.name}
    }
}

export const authenticationRoute = app => {
    app.post('/authenticate', async (req, res) => {
        let {username, password} = req.body;
      

        const db = await connectDB();
        const users = db.collection("users");
        const groups = db.collection("groups");

        let user = await users.findOne({name: username});

        if(!user){
            return res.status(500).send("User not found");
        }
        
        let group = await groups.findOne({owner: user._id});

        const initialGroups = [{
            _id: uuidv4(),
            name:"To Do",
            owner: user._id
        },{
            _id: uuidv4(),
            name:"Doing",
            owner: user._id
        },{
            _id: uuidv4(),
            name:"Done",
            owner: user._id
        }];

        if(!group){
            await groups.insertMany(initialGroups);
        }

        

        let hash = md5(password);
        let passwordCorrect = hash === user.passwordHash;

        if(!passwordCorrect){
            return res.status(500).send("password incorrect 1");
        }

        let token  = uuidv4();

        authenticationTokens.push({
            token, userID: user.id
        });

        let state = await assembleUserState(user);

        res.send({token, state});
    })
}