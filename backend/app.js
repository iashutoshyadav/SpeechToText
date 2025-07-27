require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const transcriptionRoutes = require('./routes/transcription');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
    origin: [
    'http://localhost:5173',
    'https://speech-to-text-v892.vercel.app'
  ],
  methods: ['GET', 'POST'],
  credentials: true
  
}));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/transcription', transcriptionRoutes);

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log(' MongoDB Connected Successfully'))
.catch((err) => console.error(' MongoDB Connection Failed:', err));

app.listen(PORT, () => console.log(` Server running on port ${PORT}`));
