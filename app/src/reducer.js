'use strict';

import {INITIAL_STATE, addDate, addIdea, removeIdea, updateIdea} from './core';

export default function reducer(state = INITIAL_STATE, action) {
  let indexOfDate;
  // Use action to determine proper function and call function
  switch(action.type) {
    case 'ADD_DATE':
      return addDate(state, action.date);
    case 'ADD_IDEA':
      // Get index of the date
      indexOfDate = state.get('dates').findIndex((obj) => { return obj.get('date') === action.date });
      return state.updateIn(
        ['dates', indexOfDate],
        dateState => addIdea(dateState, action.idea)
      );
    case 'REMOVE_IDEA':
      // Get index of the date
      indexOfDate = state.get('dates').findIndex((obj) => { return obj.get('date') === action.date });
      return state.updateIn(
        ['dates', indexOfDate, 'ideas'],
        ideaState => removeIdea(ideaState, action.indexOfIdea)
      );
    case 'UPDATE_IDEA':
      // Get index of the date
      indexOfDate = state.get('dates').findIndex((obj) => { return obj.get('date') === action.date });
      return state.updateIn(
        ['dates', indexOfDate, 'ideas'],
        ideaState => updateIdea(ideaState, action.indexOfIdea, action.newIdea)
      );
  }
  return state;
}
