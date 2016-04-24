'use strict';

import {fromJS} from 'immutable';

export function addDate(state) {
  // Find current date in mm-dd-yyyy format
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
  let today = month + '-' + day + '-' + year;
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
  let indexOfDate = state.get('dates').findIndex((obj) => { return obj.get('date') === date } );
  return state.updateIn(
    ['dates', indexOfDate, 'ideas'],
    ideas => ideas.concat(idea)
  )
}
