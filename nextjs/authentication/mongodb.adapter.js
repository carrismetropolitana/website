/* * */

import { MongoClient, ObjectId } from 'mongodb';

/* * */

if (!process.env.MONGODB_URI) throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');

/* * */

function toObjectId(string) {
  return new ObjectId(string);
}

/* * */

const MONGODB = {
  toObjectId,
  client: null,
  connection: null,
  database: null,
  collections: {
    User: null,
    Account: null,
  },
};

/* * */

if (process.env.NODE_ENV === 'development') {
  // In development mode, use a global variable so that the value
  // is preserved across module reloads caused by HMR (Hot Module Replacement).
  if (!global._MONGODB_CONNECTION) {
    MONGODB.client = new MongoClient(process.env.MONGODB_URI);
    console.log('here');
    global._MONGODB_CONNECTION = await MONGODB.client.connect();
  }
  MONGODB.connection = global._MONGODB_CONNECTION;
  MONGODB.database = MONGODB.connection.db();
  MONGODB.collections.User = MONGODB.database.collection('User');
  MONGODB.collections.Account = MONGODB.database.collection('Account');

  //
} else {
  // In production mode, it's best to not use a global variable.
  MONGODB.client = new MongoClient(process.env.MONGODB_URI);
  MONGODB.connection = await MONGODB.client.connect();
  MONGODB.database = MONGODB.connection.db();
  MONGODB.collections.User = MONGODB.database.collection('User');
  MONGODB.collections.Account = MONGODB.database.collection('Account');
}

/* * */

export default MONGODB;
