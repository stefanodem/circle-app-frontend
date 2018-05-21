import { combineReducers } from 'redux';
import task from './task_reducer';
import assessment from './assessment_reducer';

export default combineReducers({
  task, assessment,
})