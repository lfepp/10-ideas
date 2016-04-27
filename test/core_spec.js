'use strict';

import {fromJS} from 'immutable';
import {expect} from 'chai';

import {addDate, addIdea, removeIdea, updateIdea} from '../app/src/core';

describe('core application logic', () => {

  describe('addDate', () => {

    it('adds a new date into a blank state tree', () => {
      const state = fromJS({});
      const nextState = addDate(state, '04-26-2016');
      expect(JSON.stringify(nextState)).to.equal(JSON.stringify(fromJS({
        dates: [
          {
            date: '04-26-2016',
            ideas: []
          }
        ]
      })));
    });

    it('add a new date into a populated state tree', () => {
      const state = fromJS({
        dates: [
          {
            date: '01-21-2016',
            ideas: ['Test idea','Test idea']
          },
          {
            date: '03-18-2016',
            ideas: ['Test idea','Test idea','Test idea']
          }
        ]
      });
      const nextState = addDate(state, '04-26-2016');
      expect(JSON.stringify(nextState)).to.equal(JSON.stringify(fromJS({
        dates: [
          {
            date: '01-21-2016',
            ideas: ['Test idea','Test idea']
          },
          {
            date: '03-18-2016',
            ideas: ['Test idea','Test idea','Test idea']
          },
          {
            date: '04-26-2016',
            ideas: []
          }
        ]
      })));
    });
  });

  describe('addIdea', () => {

    it('adds an idea to a blank list', () => {
      const state = fromJS({
        date: '03-18-2016',
        ideas: []
      });
      const nextState = addIdea(state, 'Added Idea');
      expect(JSON.stringify(nextState)).to.equal(JSON.stringify(fromJS({
        date: '03-18-2016',
        ideas: ['Added Idea']
      })));
    });

    it('adds an idea to a populated list', () => {
      const state = fromJS({
        date: '03-18-2016',
        ideas: ['Test idea','Test idea','Test idea']
      });
      const nextState = addIdea(state, 'Added Idea');
      expect(JSON.stringify(nextState)).to.equal(JSON.stringify(fromJS({
        date: '03-18-2016',
        ideas: ['Test idea','Test idea','Test idea','Added Idea']
      })));
    });
  });

  describe('removeIdea', () => {

    it('removes idea from state', () => {
      const state = fromJS(['Test idea 1','Test idea 2','Test idea 3']);
      const nextState = removeIdea(state, 1);
      expect(JSON.stringify(nextState)).to.equal(JSON.stringify(fromJS(['Test idea 1','Test idea 3'])));
    });
  });

  describe('updateIdea', () => {

    it('updates an idea within state', () => {
      const state = fromJS(['Test idea 1','Test idea 2','Test idea 3']);
      const nextState = updateIdea(state, 1, 'Test idea 4');
      expect(JSON.stringify(nextState)).to.equal(JSON.stringify(fromJS(['Test idea 1','Test idea 4','Test idea 3'])));
    });
  });
});
