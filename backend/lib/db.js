import  mongoose  from "mongoose"
// const URL = process.env.MONGODB_URL;

export const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URL);
        console.log(`Mongodb connected : ${conn.connection.host}`);

    } catch (err) {
        console.log(`Mongodb not connected : err` , err);
    }
}

