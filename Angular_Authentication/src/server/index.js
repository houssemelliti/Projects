const express = require('express');
const app = express();
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const path = require('path');
const createExpressApp = require('./create-express-app');

require('dotenv').config();

const dbName = "houssemDB";
const dbURL = process.env.DB_CONN;

MongoClient.connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
  const db = client.db(dbName);
  console.log('connected to mongodb...');

  createExpressApp(db).listen(3000, () => {
    console.log('listening on port 3000...');
  });
});


