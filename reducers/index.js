import { combineReducers } from 'redux';
import template from './template_reducer';
import task from './task_reducer';

export default combineReducers({
  template, task
})