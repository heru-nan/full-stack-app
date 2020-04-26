import {MongoClient} from 'mongodb';
const url = process.env.MONGO_URI || `mongodb://localhost:27017/myorganizer`;


let db = null;

export async function connectDB(){
    if(db) return db;
    let client = await MongoClient.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    db = client.db();
    console.info("Got DB", db);
    return db;
}