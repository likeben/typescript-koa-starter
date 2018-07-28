import jwt, { SignOptions } from 'jsonwebtoken';
import User, { UserEntity } from '../models/User';
import { getEnvItem } from './utils';

enum userOrigin {
  admin = 'ADMIN',
  app = 'APP',
  weChat = 'WE_CHAT',
}

interface JWTPayload {
  id: string;
  username: string;
  type: userOrigin;
}

const secret = getEnvItem('TOKEN_SECRET');

export const authenticate = (
  user: UserEntity,
  type: userOrigin = userOrigin.app
): string => {
  const payload: JWTPayload = {
    id: user.id,
    username: user.username,
    type,
  };
  const option: SignOptions = {
    expiresIn: '7 days',
  };
  return jwt.sign(payload, secret, option);
};

export const validate = async (token: string): Promise<UserEntity | null> => {
  const decoded = jwt.verify(token, secret) as JWTPayload;
  const user = await User.findById(decoded.id).select('-password');
  return user;
};
