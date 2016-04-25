'use strict';

import {fromJS} from 'immutable';

export const INITIAL_STATE = fromJS({});

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

export function addIdea(dateState, idea) {
  return dateState.update('ideas',
    ideas => ideas.concat(idea)
  );
}

export function removeIdea(ideaState, indexOfIdea) {
  return ideaState.delete(indexOfIdea);
}

export function updateIdea(ideaState, indexOfIdea, newIdea) {
  return ideaState.set(indexOfIdea, newIdea);
}
