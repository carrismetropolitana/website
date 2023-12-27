/* * */

import MONGODB from '@/services/MONGODB';
import { verifyAuthentication } from '@/authentication/verify';

/* * */

export async function POST(request) {
  //

  //
  // 1. Check authentication

  const userId = await verifyAuthentication(request);
  if (!userId) return new Response('Authorization required.', { status: 401 });

  //
  // 2. Fetch user data

  const parsedRequestBody = await request.json();

  //
  // 2. Update user data

  await MONGODB.User.findOneAndUpdate({ _id: MONGODB.toObjectId(userId) }, { $set: { favorite_stops: parsedRequestBody.favorite_stops, favorite_patterns: parsedRequestBody.favorite_patterns } });

  //
  // 2. Fetch updated user data

  const userProfileData = await MONGODB.User.findOne({ _id: MONGODB.toObjectId(userId) });
  if (!userProfileData) return new Response('User not found.', { status: 404 });

  //
  // 3. Return result

  return Response.json(userProfileData);

  //
}
