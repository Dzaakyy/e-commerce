import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
const app = express();
import apiRoutes from './routes/apiRoutes.js';
import dotenv from 'dotenv';
dotenv.config();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

// Routes
app.use(apiRoutes);

// Test
app.get('/', (req, res) => {
    res.send('E-commerce API is running!');
});

app.use((err, res, req, next) => {
    console.error(err.stack);
    res.status(500).send('Internal Server Error');
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})
