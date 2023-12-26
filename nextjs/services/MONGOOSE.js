/* * */

import mongoose from 'mongoose';

/* * */

async function connect() {
  await mongoose
    .set('strictQuery', false)
    .connect(process.env.MONGODB_URI)
    // .then(() => console.log('Connected to MongoDB...'))
    .catch((error) => {
      console.log('Connection to MongoDB failed.');
      console.log('At database.js > mongoose.connect()');
      console.log(error);
      process.exit();
    });
}

/* * */

async function disconnect() {
  await mongoose
    .disconnect()
    // .then(() => console.log('Disconnected from MongoDB...'))
    .catch((error) => {
      console.log('Failed closing connection to MongoDB.');
      console.log('At database.js > mongoose.disconnect()');
      console.log(error);
    });
}

/* * */

const mongodb = {
  connect,
  disconnect,
};

/* * */

export default mongodb;
