import dotenv from 'dotenv';
import mongoose from 'mongoose';
import express from 'express';
import cors from 'cors';
import route from './routes/route.js';


dotenv.config();

const app= express();
app.use(cors({ origin:[
    "http://localhost:5173",
     "https://real-estate-iul2.vercel.app/" 

    ]
    }));
app.use(express.json());


mongoose.connect(process.env.MONGO_URL)
.then(()=>console.log("MongoDB connected"))
.catch((err)=>console.log(err));

app.use("/api/properties",route);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  