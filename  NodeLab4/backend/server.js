const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');


require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.COMPASS_URI;

mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true }
);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

const shipsRouter = require('./routes/ships');
const portRouter = require('./routes/port');
const pierRouter = require('./routes/pier');

app.use('/ships', shipsRouter);
app.use('/port', portRouter);
app.use('/pier', pierRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});