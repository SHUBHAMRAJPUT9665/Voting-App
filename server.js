const express = require("express");
const app = express();
require('dotenv').config();

// Remove the explicit import of body-parser

// body-parser is now bundled with Express, so you can directly use it like this:
app.use(express.json()); // This line replaces bodyParser.json()

const PORT = process.env.PORT || 8000;

const userRoutes = require('./Routes/userRoutes');
const candiateRoutes = require('./Routes/candidateRoutes')

app.use('/user', userRoutes);
app.use('/candidate',candiateRoutes)

app.listen(PORT, () => {
    console.log(`server is running on PORT ${PORT}`);
});
