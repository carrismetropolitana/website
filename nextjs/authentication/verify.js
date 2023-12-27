/* * */

import { auth } from '@/authentication/config';
import jwt from 'jsonwebtoken';

/* * */

export async function verifyAuthentication(request) {
  //

  //
  // 1. Verify next-auth session

  const session = await auth();
  if (session?.user?.id) return session.user.id;

  //
  // 2. Verify JWT token

  const authorizationHeader = request.headers?.get('Authorization');
  if (!authorizationHeader?.length) return false;

  const rawJwtToken = authorizationHeader?.split(' ')[1];
  if (!rawJwtToken) return false;

  const decodedJwtToken = jwt.verify(rawJwtToken, process.env.JWT_SIGN_SECRET);
  if (decodedJwtToken?.user_id) return decodedJwtToken.user_id;

  return false;

  //
}
