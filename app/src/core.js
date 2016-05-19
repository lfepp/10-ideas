'use strict';

import {fromJS} from 'immutable';

export const INITIAL_STATE = fromJS({});

// TODO update addDate to receive the date - currently not a pure function
export function addDate(state, date) {
  // Create a variable for the new date
  const newDate = fromJS([
    {
      date: date,
      ideas: []
    }
  ]);
  // Add new date to the current state
  if(state.has('dates')) {
    return state.set(
      'dates',
      state.get('dates').concat(newDate)
    );
  }
  else {
    return state.merge({
      dates: newDate
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
