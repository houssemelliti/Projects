require('dotenv').config();

const users = require('./users');
const contacts = require('./contacts');
const assert = require('assert');
const bcrypt = require('bcrypt');

const MongoClient = require('mongodb').MongoClient;

const dbName = "houssemDB";
const dbURL = process.env.DB_CONN;

function seedCollection(collectionName, initialRecords) {

  MongoClient.connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
    assert.equal(null, err);
    const db = client.db(dbName);
    console.log(`Mongo database ${ dbName } at ${ dbURL }`);

    const collection = db.collection(collectionName);
    collection.deleteMany();

    initialRecords.forEach(item => {
      if(item.password) {
        item.password = bcrypt.hashSync(item.password, 10);
      }
    });

    collection.insertMany(initialRecords, (err, result) => {
      console.log(`${result.insertedCount} records inserted`);
      console.log("closing connection...");
      client.close();
      console.log("done.");
    });

  });
}

seedCollection('users', users);
seedCollection('contacts', contacts);
