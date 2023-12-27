/* * */

import { auth } from '@/authentication/config';
// import MONGOOSE from '@/services/MONGOOSE';
// import { UserModel } from '@/schemas/User/model';

/* * */

export async function GET(request) {
  //

  //
  // 1. Check authentication

  const session = await auth(request);
  if (!session) throw new Error('Authentication required.');

  return Response.json({ status: 'success' });

  //
  // 2. Connect to MongoDB

  //   await MONGOOSE.connect();

  //
  // 3. Retrieve user details

  //   const userData = await UserModel.findOne({ _id: { $eq: session.user?._id } });
  //   if (!userData) throw new Error('User not found.');
  //   else return Response.json(userData);

  //
}
