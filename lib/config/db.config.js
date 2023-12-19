import mongoose from 'mongoose'

export const ConnectDB = async()=>{
    try {
        
        await mongoose.connect(process.env.MONGO_URI);
        console.log(`the db is connect with ${mongoose.connection.host}`);
    } catch (error) {
        mongoose.disconnect();
        process.exit(1);
    }
}