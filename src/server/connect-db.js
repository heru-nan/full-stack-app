import {MongoClient} from 'mongodb';

import dotenv from 'dotenv';

dotenv.config();

const url = process.env.MONGODB_URI

let db = null;

export async function connectDB(){
    if(db) return db;
    let client = await MongoClient.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    db = client.db();
    console.info("Got DB", db.s.namespace);
    return db;
}
