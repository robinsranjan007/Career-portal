import mongoose from "mongoose"

const mongoDB=async()=>{
    try {

    const res = await mongoose.connect(process.env.MOGODB_URI)
    console.log("mongodb connected successfully");


    } catch (error) {
        console.log('connection failed',error);
        
    }
}

export default mongoDB