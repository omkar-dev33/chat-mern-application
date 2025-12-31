import express from "express";
import dotenv from "dotenv";
import authService from './routes/auth.route.js'
import messageRoute from './routes/messageRoute.js'
import { connectDB } from "./lib/db.js"
import cookieParser from 'cookie-parser'
import cors from 'cors'

dotenv.config();
const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true,
    })
);

app.use(cookieParser());
app.use('/api/auth', authService);
app.use('/api/messages', messageRoute);
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
    connectDB();
    // console.log(`Server listening on port suceess`,connectDB);
});


