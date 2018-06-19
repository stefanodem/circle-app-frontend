import { combineReducers } from 'redux';
import task from './task_reducer';
import assessment from './assessment_reducer';
import patient from './patient_reducer';
import user from './user_reducer';

export default combineReducers({
  user, task, assessment, patient,
})