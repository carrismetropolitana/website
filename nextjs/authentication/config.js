/* * */

import NextAuth from 'next-auth';
import GitHub from 'next-auth/providers/github';
import { MongoDBAdapter } from '@auth/mongodb-adapter';
import mongoDbConnection from './mongodb.connection';

/* * */

const authjs = NextAuth({
  providers: [GitHub],
  adapter: MongoDBAdapter(mongoDbConnection),
});

/* * */

export const {
  handlers: { GET, POST },
  auth,
} = authjs;
