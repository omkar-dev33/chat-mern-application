import { v2 as cloudinary } from "cloudinary"
import { config } from 'dotenv'

config();

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    cloud_api_key: process.env.CLOUD_API_KEY,
    cloud_secret: process.env.CLOUD_APT_SECRET,
})

export default cloudinary


