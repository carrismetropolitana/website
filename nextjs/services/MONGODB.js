/* * */

const { MongoClient, ObjectId } = require('mongodb');

/* * */

class MONGODB {
  //

  constructor() {
    if (process.env.MONGODB_URI) {
      this.client = new MongoClient(process.env.MONGODB_URI, { minPoolSize: 2, maxPoolSize: 200, serverSelectionTimeoutMS: 5000 });
      this.connection = this.client.connect();
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
