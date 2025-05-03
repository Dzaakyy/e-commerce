import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
const app = express();
import apiRoutes from './routes/apiRoutes.js';
import dotenv from 'dotenv';
dotenv.config();
import { requestLogger, errorLogger } from './middleware/loggerMiddleware.js';

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(requestLogger);

// Routes
app.use(apiRoutes);

// Test
app.get('/', (req, res) => {
    res.send('E-commerce API is running!');
});

app.use(errorLogger);
app.use((err, res, req, next) => {
    console.error(err.stack);

    if (err.name === 'SequelizeValidationError') {
        return res.status(400).json({
            message: 'Validation error',
            errors: err.errors.map(e => e.message)
        });
    }

    if (err.name === 'JsonWebTokenError') {
        return res.status(401).json({
            message: 'Invalid token'
        });
    }
    res.status(500).send('Internal Server Error');
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})
