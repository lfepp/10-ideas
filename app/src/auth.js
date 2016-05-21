'use strict';

import jwt from 'jsonwebtoken';
import {fromJS} from 'immutable';

export function generateJWT(user) {
  // Generate jwt payload from user information
  const payload = fromJS({
    name: user.get('name'),
    email: user.get('email'),
    _id: user.get('_id').toString()
  });
  // Generate token from payload & secret
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: 60 * 60 * 24 // 24 hours
  });
}
