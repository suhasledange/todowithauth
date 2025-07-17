import mongoose from "mongoose";

const MONGOURI=`${process.env.MONGODB_URI}/${process.env.MONGO_DB}`;

let connection = {}

async function dbConnect(){

    if(connection.isConnected){
        console.log("Already connected to databse")
        return;
    }

    try {
        const db = await mongoose.connect(MONGOURI || "")
        connection.isConnected = db.connections[0].readyState;
        console.log("db connected sunccessfully",connection.isConnected);

    } catch (error) {
        console.log("db connection failed",error);
        process.exit(1)
    }

}
export default dbConnect