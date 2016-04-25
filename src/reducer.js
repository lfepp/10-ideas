'use strict';

import {INITIAL_STATE, addDate, addIdea, removeIdea, updateIdea} from './core';

export default function reducer(state = INITIAL_STATE, action) {
  // Use action to determine proper function and call function
  switch(action.type) {
    case 'ADD_DATE':
      return addDate(state);
    case 'ADD_IDEA':
      const indexOfDate = state.get('dates').findIndex((obj) => { return obj.get('date') === action.date });
      return state.updateIn(
        ['dates', indexOfDate],
        dateState => addIdea(dateState, action.idea)
      );
        //addIdea(state, action.date, action.idea);
    case 'REMOVE_IDEA':
      return removeIdea(state, action.date, action.indexOfIdea);
    case 'UPDATE_IDEA':
      return updateIdea(state, action.date, action.indexOfIdea, action.newIdea);
  }
  return state;
}
