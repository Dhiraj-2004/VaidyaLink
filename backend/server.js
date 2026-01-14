import express from 'express';
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import adminRouter from './routes/adminroute.js';

// app config
const app = express();
const PORT = process.env.PORT || 4000;
connectDB()
connectCloudinary()

// middlewares
app.use(express.json());
app.use(cors());

// api endpoint (routes)
app.use('/api/admin', adminRouter)

app.get('/', (req, res) => {
  res.status(200).send('VaidyaLink Backend is running');
});

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
})