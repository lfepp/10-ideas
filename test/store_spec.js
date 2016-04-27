'use strict';

import {fromJS} from 'immutable';
import {expect} from 'chai';

import {getCurrentDate} from '../app/src/core';
import makeStore from '../app/src/store';

describe('store logic', () => {

  describe('makeStore', () => {

    it('ensures the redux store is configured with the reducer', () => {
      const store = makeStore();
      expect(store.getState()).to.equal(fromJS({}));

      store.dispatch({ type: 'ADD_DATE' });
      store.dispatch({ type: 'ADD_IDEA', date: getCurrentDate(), idea: 'Test idea 1' });
      store.dispatch({ type: 'ADD_IDEA', date: getCurrentDate(), idea: 'Test idea 2' });
      store.dispatch({ type: 'ADD_IDEA', date: getCurrentDate(), idea: 'Test idea 3' });
      store.dispatch({ type: 'ADD_IDEA', date: getCurrentDate(), idea: 'Test idea 4' });
      store.dispatch({ type: 'ADD_IDEA', date: getCurrentDate(), idea: 'Test idea 5' });
      store.dispatch({ type: 'REMOVE_IDEA', date: '03-18-2016', indexOfIdea: 3 });
      store.dispatch({ type: 'UPDATE_IDEA', date: '03-18-2016', indexOfIdea: 1, newIdea: 'Updated idea' });
      expect(store.getState()).to.equal(fromJS({
        dates: [
          {
            date: getCurrentDate(),
            ideas: ['Test idea 1','Updated idea','Test idea 3','Test idea 5']
          }
        ]
      }))
    });
  });
});
