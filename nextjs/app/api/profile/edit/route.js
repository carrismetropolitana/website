/* * */

// import MONGOOSE from '@/services/MONGOOSE';
// import { auth } from '@/authentication/config';
// import { UserModel } from '@/schemas/User/model';

/* * */

export async function POST(request) {
  //

  return Response.json({ status: 'not implemented' });

  //
  // 1. Check authentication
  //   const session = await auth();
  //   if (!session) throw new Error('Authentication required.');
  //
  // 2. Connect to MongoDB
  //   await MONGOOSE.connect();
  //
  // 3. Retrieve user details
  //   const userData = await UserModel.findOne({ _id: { $eq: session.user?._id } });
  //   if (!userData) throw new Error('User not found.');
  //   else return Response.json(userData);
  //   return Response.json({ status: 'not implemented' });
  //
}
