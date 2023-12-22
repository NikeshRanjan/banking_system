const express = require('express')
const app = express();
require('dotenv').config()

const dbConnect = require('./data/connection/dbConnection');
dbConnect();


app.use(express.json());
app.use('/api/customers',  require('./routes/customerRoutes'))


const port = process.env.PORT || 3002;
app.listen(port, () => console.log(`Listening on port ${port}...`));