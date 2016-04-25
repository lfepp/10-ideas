'use strict';

import {fromJS} from 'immutable';

export const INITIAL_STATE = fromJS({ dates: [] });

export function getCurrentDate() {
  // Find current date in mm-dd-yyyy format
  const currentDate = new Date();
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

export function addDate(state) {
  const today = getCurrentDate();
  // Create a variable for the new date
  const newDay = fromJS([
    {
      date: today,
      ideas: []
    }
  ]);
  // Add new date to the current state
  if(state.has('dates')) {
    if(state.get('dates').includes(today)) {
      throw new Error('This date already exists');
    }
    else {
      return state.set(
        'dates',
        state.get('dates').concat(newDay)
      );
    }
  }
  else {
    return state.merge({
      dates: newDay
    });
  }
}

export function addIdea(state, date, idea) {
  // Get index of chosen date
  const indexOfDate = state.get('dates').findIndex((obj) => { return obj.get('date') === date });
  // Add idea to chosen date
  return state.updateIn(
    ['dates', indexOfDate, 'ideas'],
    ideas => ideas.concat(idea)
  );
}

export function removeIdea(state, date, indexOfIdea) {
  // Get index of chosen date
  const indexOfDate = state.get('dates').findIndex((obj) => { return obj.get('date') === date });
  // Remove idea from chosen date
  return state.deleteIn(
    ['dates', indexOfDate, 'ideas', indexOfIdea]
  );
}

export function updateIdea(state, date, indexOfIdea, newIdea) {
  // Get index of chosen date
  const indexOfDate = state.get('dates').findIndex((obj) => { return obj.get('date') === date });
  // Update idea on chosen date to newIdea
  return state.setIn(
    ['dates', indexOfDate, 'ideas', indexOfIdea],
    newIdea
  )
}
