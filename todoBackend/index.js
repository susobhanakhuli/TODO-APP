const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const PORT = process.env.PORT || 8000;
const todoRoutes = require('./ROUTES/TodoRoutes');
require('dotenv').config();
require('./db');

app.use(cors());
// app.use(cors({
//     // Add the url of the frontend app to allow access
//     // which is running on port 3000
//     origin: 'http://localhost:3000'
// }));
app.use(bodyParser.json());
app.use('/todoroutes', todoRoutes);

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});