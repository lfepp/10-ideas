'use strict';

import {INITIAL_STATE, addDate, addIdea, removeIdea, updateIdea} from './core';

export default function reducer(state = INITIAL_STATE, action) {
  // Get index of the date
  var indexOfDate;
  if(action.date !== undefined) {
    indexOfDate = state.get('dates').findIndex((obj) => { return obj.get('date') === action.date });
  }
  // Use action to determine proper function and call function
  switch(action.type) {
    case 'ADD_DATE':
      return addDate(state);
    case 'ADD_IDEA':
      return state.updateIn(
        ['dates', indexOfDate],
        dateState => addIdea(dateState, action.idea)
      );
    case 'REMOVE_IDEA':
      return state.updateIn(
        ['dates', indexOfDate, 'ideas'],
        ideaState => removeIdea(ideaState, action.indexOfIdea)
      );
    case 'UPDATE_IDEA':
      return updateIdea(state, action.date, action.indexOfIdea, action.newIdea);
  }
  return state;
}
