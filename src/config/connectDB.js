import { DB_NAME } from "../constant.js";
import mongooese from 'mongoose'

const connectDB = async ()=>{
    try {
        const connectionInstances = await mongooese.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        console.log(`\n MongoDB Connected || DB Hosts : ${connectionInstances.connection.host}`)
    } catch (error) {
        console.log("Mongodb Connection failed" ,error)
        process.exit(1);
    }
}

export default connectDB;