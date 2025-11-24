import express from 'express';
import cors from 'cors'
import 'dotenv/config'

// app config
const app = express();
const PORT = process.env.PORT || 4000;

// middlewares
app.use(express.json());
app.use(cors());

// api endpoint (routes)
app.get('/', (req, res) => {
  res.status(200).send('VaidyaLink Backend is running');
});

app.listen(PORT, () => {
    console.log(`VaidyaLink Backend is running on port ${PORT}`);
})