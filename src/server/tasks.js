import {connectDB} from './connect-db';
import {ObjectID}  from 'mongodb';
import {v4 as uuidv4} from 'uuid';



export const addNewTask = async task => {
    let db = await connectDB();
    let collection = db.collection("tasks");
    const res= await collection.insertOne(task);
    return res.ops[0];
}

export const updateTask = async task => {
    let {id, group, isComplete, name} = task;
    let db = await connectDB();
    let collection = db.collection("tasks");
    
    if(group){
        await collection.updateOne({_id: id}, {$set:{group}});
    }
     
    if(name){
        await collection.updateOne({_id: id}, {$set:{name}});
    }
     
    if(isComplete !== undefined){
        await collection.updateOne({_id: id}, {$set:{isComplete}});
    }
}

export const deleteTask = async id => {
    const db = await connectDB();

    const collection = db.collection(`tasks`);

    await collection.deleteOne({_id : id});
}
export const taskRoute = app => {
    app.post('/task/new', async (req, res) => {
        let task = req.body.task;
        const _id = uuidv4();
        const newTask = await addNewTask({...task, _id});
        res.status(200).send(newTask);
    });
    
    app.post ('/task/update', async (req, res) => {
        let task = req.body.task;
        
        await updateTask(task);
        res.status(200).send();
    })
    
    app.post('/task/delete', async (req, res) => {
        let id = req.body.id;
        await deleteTask(id);
        res.status(200).send();
    })
}
