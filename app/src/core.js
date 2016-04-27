'use strict';

import {fromJS} from 'immutable';

export const INITIAL_STATE = fromJS({});

// TODO update addDate to receive the date - currently not a pure function
export function addDate(state, date) {
  // Create a variable for the new date
  const newDay = fromJS([
    {
      date: date,
      ideas: []
    }
  ]);
  // Add new date to the current state
  if(state.has('dates')) {
    if(state.get('dates').includes(date)) {
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
