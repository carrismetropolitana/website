/* * */

import { MongoClient, ObjectId } from 'mongodb';

/* * */

if (!process.env.MONGODB_URI) throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');

/* * */

function toObjectId(string) {
  return new ObjectId(string);
}

/* * */

let MONGODB_CLIENT;
let MONGODB_CONNECTION;

/* * */

if (process.env.NODE_ENV === 'development') {
  // In development mode, use a global variable so that the value
  // is preserved across module reloads caused by HMR (Hot Module Replacement).
  if (!global._MONGODB_CONNECTION) {
    MONGODB_CLIENT = new MongoClient(process.env.MONGODB_URI);
    global._MONGODB_CONNECTION = MONGODB_CLIENT.connect();
  }
  MONGODB_CONNECTION = global._MONGODB_CONNECTION;
  //   MONGODB.database = MONGODB_CONNECTION.db();
  //   MONGODB.collections.User = MONGODB.database.collection('User');
  //   MONGODB.collections.Account = MONGODB.database.collection('Account');

  //
} else {
  // In production mode, it's best to not use a global variable.
  MONGODB_CLIENT = new MongoClient(process.env.MONGODB_URI || '');
  MONGODB_CONNECTION = MONGODB_CLIENT.connect();
  //   MONGODB.database = MONGODB_CONNECTION.db();
  //   MONGODB.collections.User = MONGODB.database.collection('User');
  //   MONGODB.collections.Account = MONGODB.database.collection('Account');
}

/* * */

const MONGODB = {
  toObjectId,
  client: MONGODB_CLIENT,
  connection: MONGODB_CONNECTION,
  database: null,
  collections: {
    User: null,
    Account: null,
  },
};

/* * */

export default MONGODB;
