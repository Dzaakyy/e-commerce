const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const apiRoutes = require('./routes/apiRoutes');
require('dotenv').config();

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
    console.log(`Redis connected`);
})
