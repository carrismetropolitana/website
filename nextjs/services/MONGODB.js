/* * */

const { MongoClient, ObjectId } = require('mongodb');

/* * */

// This is due to a bug in NextJs, AuthJs, or this repo,
// where the authentication config part of [...nextauth] API route is being
// run as if it was live during build time. This causes fatal errors. Use this dummy
// connection string to satisfy the execution and allow builds.
const WORKAROUND_DUMMMY_MONGODB_URI = 'mongodb://localhost:27017';

/* * */

class MONGODB {
  //

  constructor() {
    if (process.env.MONGODB_URI) {
      this.client = new MongoClient(process.env.MONGODB_URI || WORKAROUND_DUMMMY_MONGODB_URI, { minPoolSize: 2, maxPoolSize: 200, serverSelectionTimeoutMS: 5000 }).connect();
      this.database = this.client.db('production');
      this.User = this.database.collection('users');
    }
  }

  toObjectId(string) {
    return new ObjectId(string);
  }

  //
}

/* * */

module.exports = new MONGODB();
