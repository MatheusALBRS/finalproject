const { MongoClient } = require("mongodb");

// Connection URL
const url = "mongodb://localhost:27017";
const client = new MongoClient(url);

// Database Name
const dbName = "badbank";

client.connect();
console.log("Connected successfully to database server");

const db = client.db(dbName);

//create user
function create(name, email, password) {
  return new Promise((resolve, reject) => {
    const collection = db.collection("users");
    const doc = { name, email, password, balance: 100 };
    collection.insertOne(doc, (err, result) => {
      err ? reject(err) : resolve(doc);
    });
  });
}

//Balance operations
function balanceOperation(user, amount) {
  return new Promise((resolve, reject) => {
    db.collection("users").updateOne(
      { name: user },
      {
        $set: { balance: amount },
        $currentDate: { lastModified: true },
      }
    );
  });
}

//find all users
function all() {
  return new Promise((resolve, reject) => {
    const customers = db
      .collection("users")
      .find({})
      .toArray((err, docs) => {
        err ? reject(err) : resolve(docs);
      });
  });
}

module.exports = { create, all, balanceOperation };
