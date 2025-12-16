import express from "express";
import dotenv from "dotenv";
import authService from './routes/auth.route.js'
import { connectDB } from "./lib/db.js"
const app = express();
dotenv.config();


const PORT = process.env.PORT;

app.use('/api/auth', authService);

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
    connectDB();
    // console.log(`Server listening on port suceess`,connectDB);
});


