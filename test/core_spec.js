'use strict';

import {fromJS} from 'immutable';
import {expect} from 'chai';

import {addDate} from '../src/core';

describe('core application logic', () => {

  describe('addDate', () => {

    it('adds a new date into a blank state tree', () => {
      const state = fromJS({});
      const nextState = addDate(state);
      expect(JSON.stringify(nextState)).to.equal(JSON.stringify(fromJS({
        dates: [
          {
            date: getDate(),
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
      })
      const nextState = addDate(state);
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
            date: getDate(),
            ideas: []
          }
        ]
      })));
    });
  });
});

function getDate() {
  var currentDate = new Date();
  var day = currentDate.getDate();
  var month = currentDate.getMonth() + 1;
  var year = currentDate.getFullYear();
  if(day < 10) {
    day = '0' + day;
  }
  if(month < 10) {
    month = '0' + month;
  }
  return month + '-' + day + '-' + year;
}
