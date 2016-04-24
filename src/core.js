'use strict';

import {fromJS} from 'immutable';

export function addDate(state) {
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
  const newDay = fromJS([
    {
      date: today,
      ideas: []
    }
  ]);
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
