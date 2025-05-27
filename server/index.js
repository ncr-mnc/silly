require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const router = require('./routes/users');

app.use(cors());
app.use(express.json());

app.use('/api', router);

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

