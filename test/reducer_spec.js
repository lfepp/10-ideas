'use strict';

import {fromJS} from 'immutable';
import {expect} from 'chai';

import {getCurrentDate} from '../src/core';
import reducer from '../src/reducer';

describe('reducer', () => {

  describe('INITIAL_STATE', () => {

    it('ensures there is an initial state', () => {
      const action = { type: 'ADD_DATE' };
      const nextState = reducer(undefined, action);
      expect(JSON.stringify(nextState)).to.equal(JSON.stringify(fromJS({
        dates: [
          {
            date: getCurrentDate(),
            ideas: []
          }
        ]
      })));
    });
  });

  describe('ADD_DATE', () => {

    it('handles the ADD_DATE action', () => {
      const state = fromJS({});
      const action = { type: 'ADD_DATE' };
      const nextState = reducer(state, action);
      expect(JSON.stringify(nextState)).to.equal(JSON.stringify(fromJS({
        dates: [
          {
            date: getCurrentDate(),
            ideas: []
          }
        ]
      })));
    });
  });

  describe('ADD_IDEA', () => {

    it('handles the ADD_IDEA action', () => {
      const state = fromJS({
        dates: [
          {
            date: '01-21-2016',
            ideas: ['Test idea','Test idea']
          },
          {
            date: '03-18-2016',
            ideas: []
          }
        ]
      });
      const action = { type: 'ADD_IDEA', date: '03-18-2016', idea: 'Added Idea' };
      const nextState = reducer(state, action);
      expect(JSON.stringify(nextState)).to.equal(JSON.stringify(fromJS({
        dates: [
          {
            date: '01-21-2016',
            ideas: ['Test idea','Test idea']
          },
          {
            date: '03-18-2016',
            ideas: ['Added Idea']
          }
        ]
      })));
    });
  });

  describe('REMOVE_IDEA', () => {

    it('handles the REMOVE_IDEA action', () => {
      const state = fromJS({
        dates: [
          {
            date: '01-21-2016',
            ideas: ['Test idea','Test idea']
          },
          {
            date: '03-18-2016',
            ideas: ['Test idea 1','Test idea 2','Test idea 3']
          }
        ]
      });
      const action = { type: 'REMOVE_IDEA', date: '03-18-2016', indexOfIdea: 1 };
      const nextState = reducer(state, action);
      expect(JSON.stringify(nextState)).to.equal(JSON.stringify(fromJS({
        dates: [
          {
            date: '01-21-2016',
            ideas: ['Test idea','Test idea']
          },
          {
            date: '03-18-2016',
            ideas: ['Test idea 1','Test idea 3']
          }
        ]
      })));
    });
  });

  describe('UPDATE_IDEA', () => {

    it('handles the UPDATE_IDEA action', () => {
      const state = fromJS({
        dates: [
          {
            date: '01-21-2016',
            ideas: ['Test idea','Test idea']
          },
          {
            date: '03-18-2016',
            ideas: ['Test idea 1','Test idea 2','Test idea 3']
          }
        ]
      });
      const action = { type: 'UPDATE_IDEA', date: '03-18-2016', indexOfIdea: 1, newIdea: 'Test idea 4' };
      const nextState = reducer(state, action);
      expect(JSON.stringify(nextState)).to.equal(JSON.stringify(fromJS({
        dates: [
          {
            date: '01-21-2016',
            ideas: ['Test idea','Test idea']
          },
          {
            date: '03-18-2016',
            ideas: ['Test idea 1','Test idea 4','Test idea 3']
          }
        ]
      })));
    });
  });

  describe('reduce', () => {

    it('ensures the reducer can be used with reduce', () => {
      const actions = [
        { type: 'ADD_DATE' },
        { type: 'ADD_IDEA', date: getCurrentDate(), idea: 'Test idea 1' },
        { type: 'ADD_IDEA', date: getCurrentDate(), idea: 'Test idea 2' },
        { type: 'ADD_IDEA', date: getCurrentDate(), idea: 'Test idea 3' },
        { type: 'ADD_IDEA', date: getCurrentDate(), idea: 'Test idea 4' },
        { type: 'ADD_IDEA', date: getCurrentDate(), idea: 'Test idea 5' },
        { type: 'ADD_IDEA', date: getCurrentDate(), idea: 'Test idea 6' },
        { type: 'ADD_IDEA', date: getCurrentDate(), idea: 'Test idea 7' },
        { type: 'ADD_IDEA', date: getCurrentDate(), idea: 'Test idea 8' },
        { type: 'ADD_IDEA', date: getCurrentDate(), idea: 'Test idea 9' },
        { type: 'ADD_IDEA', date: getCurrentDate(), idea: 'Test idea 10' },
        { type: 'REMOVE_IDEA', date: '03-18-2016', indexOfIdea: 3 },
        { type: 'ADD_IDEA', date: getCurrentDate(), idea: 'Test idea 11' },
        { type: 'UPDATE_IDEA', date: '03-18-2016', indexOfIdea: 6, newIdea: 'Updated idea' }
      ];
      const finalState = actions.reduce(reducer, fromJS({}));
      expect(JSON.stringify(finalState)).to.equal(JSON.stringify(fromJS({
        dates: [
          {
            date: getCurrentDate(),
            ideas: ['Test idea 1','Test idea 2','Test idea 3','Test idea 5','Test idea 6','Test idea 7','Updated idea','Test idea 9','Test idea 10','Test idea 11']
          }
        ]
      })));
    });
  });
});
