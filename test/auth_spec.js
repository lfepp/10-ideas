'use strict';

import {fromJS} from 'immutable';
import {expect} from 'chai';
import jwt from 'jsonwebtoken';

import {generateJWT} from '../app/src/auth';

describe('authentication logic', () => {

  describe('generateJWT', () => {

    it('generates a new JSON web token', () => {
      process.env['JWT_SECRET'] = 'NOT_THE_REAL_SECRET';
      const state = fromJS({
        name: 'Bruce Wayne',
        email: 'iambatman@waynecorp.com',
        _id: 1234
      });
      const nextState = generateJWT(state);
      expect(nextState).to.be.a('string');
      expect(jwt.verify(nextState, process.env.JWT_SECRET)).to.equal.true;
    });
  });
});
