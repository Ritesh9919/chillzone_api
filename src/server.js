import dotenv from 'dotenv';
dotenv.config();
import connectDB from './config/database.js';
import {app} from './app.js'
const PORT = 8000;


// Use cloudinary
import {v2 as cloudinary} from 'cloudinary';

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET
  });


connectDB()
.then(()=> {
    app.listen(PORT, ()=> {
        console.log(`Server is running on port:${PORT}`);
    })
})
.catch((err)=> {
    console.error("MongoDB connection failed", err);
})


