import mongoose from "mongoose";

type ConnectionObject = {
    isConnected?:number
}

const connection:ConnectionObject = {}

async function dbConnect():Promise<void>{
    if(connection.isConnected){
        console.log('Already connected to databases')
        return
    }

    try {
        const db = await mongoose.connect(process.env.MONGODB_URI || '')

        connection.isConnected = db.connections[0].readyState

        console.log('DB is connected successfully...')

    } catch (error) {
        console.log('Database connection failed..', error)
        process.exit(1)
    }
}

export default dbConnect

/* 
   1. void → Matlab function koi value return nahi karega. Sirf kaam karega. 
   2. readyState → Ye number return karta hai (0,1,2,3). Isliye humne isConnected ko number type diya hai.
 */