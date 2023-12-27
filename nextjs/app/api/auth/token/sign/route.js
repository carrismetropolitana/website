/* * */

import { auth } from '@/authentication/config';
import jwt from 'jsonwebtoken';
// import MONGOOSE from '@/services/MONGOOSE';
// import { UserModel } from '@/schemas/User/model';

/* * */

export async function GET(request) {
  //

  //
  // 1. Check authentication

  const session = await auth();
  if (!session) return new Response('Authentication required.', { status: 401 });

  //
  // 2. Sign the token

  const signedToken = jwt.sign({ user_id: session.user.id }, process.env.JWT_SIGN_SECRET, { expiresIn: '1h' });

  return new Response(signedToken);

  //   await MONGOOSE.connect();

  //
  // 3. Retrieve user details

  //   const userData = await UserModel.findOne({ _id: { $eq: session.user?._id } });
  //   if (!userData) throw new Error('User not found.');
  //   else return Response.json(userData);

  //
}
