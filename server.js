const express = require('express');
const connectDB = require('./db');
const apiRoutes = require('./api');
const app = express();
app.use(express.json());

connectDB()

app.use("/api", apiRoutes)

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
