require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
const cors = require("cors")
const mongoString = process.env.DATABASE_URL
const frontentUrl = process.env.FRONTEND_URL

mongoose.connect(mongoString);
const database = mongoose.connection;

database.on('error', (error) => {
	console.log(error)
})

database.once('connected', () => {
	console.log('Database Connected');
})
const app = express();

app.use(cors({
	origin: frontentUrl,
	credentials: true
}));

app.use(express.json());

app.use('/api', authRoutes)

app.listen(process.env.PORT, () => {
	console.log(`Server Started at ${process.env.PORT}`)
})
