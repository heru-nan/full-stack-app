import {connectDB} from './connect-db';
import {ObjectID}  from 'mongodb';



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
        await collection.updateOne({_id: new ObjectID(id)}, {$set:{group}});
    }
     
    if(name){
        await collection.updateOne({_id: new ObjectID(id)}, {$set:{name}});
    }
     
    if(isComplete !== undefined){
        await collection.updateOne({_id: new ObjectID(id)}, {$set:{isComplete}});
    }
}

export const deleteTask = async id => {
    const db = await connectDB();

    const collection = db.collection(`tasks`);

    await collection.deleteOne({_id : new ObjectID(id)});
}
export const taskRoute = app => {
    app.post('/task/new', async (req, res) => {
        let task = req.body.task;
    
        const newTask = await addNewTask(task);
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
