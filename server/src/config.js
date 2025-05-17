const mongoose = require('mongoose')

async function connectMongo() {
  await mongoose
    .connect("mongodb://localhost:27017/ruralFin")
    // .connect("mongodb+srv://harshpatadia4114:harshp%40%40%40%404114@symptocure.criql.mongodb.net/?retryWrites=true&w=majority&appName=Symptocure&replicaSet=Cluster0-shard-0")
    .then(() => {
      console.log("srever connected to mongo successfully");
    })
    .catch((error) => {
      console.log("error connecting to mongo", error);
    });
}
module.exports = connectMongo;
