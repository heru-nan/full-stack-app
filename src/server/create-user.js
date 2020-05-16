import {v4 as uuidv4} from 'uuid';
import md5 from 'md5';
import {ObjectID, ObjectId}  from 'mongodb';
import {connectDB} from './connect-db'; 

export const createUserRoute = app => {
    app.post('/createUser', async (req, res) => {
        let flag = true;
        let error = "no problem :)";
        const {username, password} = req.body;

        const db = await connectDB();
        const collection = db.collection("users");
        const users = await collection.find({}).toArray();

        for(let user of users){
            if(user.name === username){
                flag = false;
                error = "ocuppied name";
                return res.send({flag, error});
            }
        }

        const _id = `${username}$` + uuidv4()
        const passwordHash = md5(password);

        await db.collection("users").insertOne({
            _id,
            name: username,
            passwordHash,
            friends: [],
        });


        return res.status(200).send({flag, error})

    })

}