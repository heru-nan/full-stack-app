import {connectDB} from './connect-db';
import {v4 as uuidv4} from 'uuid';



export const addNewGroup = async group => {
    let db = await connectDB();
    let collection = db.collection("groups");
    const res= await collection.insertOne(group);
    return res.ops[0];
}

export const updateGroup = async group => {
    let {id, name} = group;
    let db = await connectDB();
    let collection = db.collection("groups");
    
     
    if(name){
        await collection.updateOne({_id: id}, {$set:{name}});
    }
  
}

export const deleteGroup = async id => {
    const db = await connectDB();

    const collection = db.collection(`groups`);

    await collection.deleteOne({_id : id});
}
export const groupRoute = app => {
    app.post('/group/new', async (req, res) => {
        let group = req.body.group;
        const _id = uuidv4();
        const newGroup = await addNewGroup({...group, _id});
        res.status(200).send(newGroup);
    });
    
    app.post ('/group/update', async (req, res) => {
        let group = req.body.group;
        
        await updateGroup(group);
        res.status(200).send();
    })
    
    app.post('/group/delete', async (req, res) => {
        let id = req.body.id;
        await deleteGroup(id);
        res.status(200).send();
    })
}
