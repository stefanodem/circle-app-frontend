import {
  FETCHING_TASKS,
  FETCHING_TASKS_SUCCESS,
  FETCHING_TASKS_FAILURE,
  REMOVE_FETCHING_TASKS,
  UPDATE_NEWTASK_TEXT,
} from './types';

import {
  fetchUserTasks,
} from '../services/api/tasks';

function fetchingTasks() {
  return {
    type: FETCHING_TASKS,
  }
}

function fetchingTasksSuccess (tasks, timestamp) {
  return {
    type: FETCHING_TASKS_SUCCESS,
    tasks,
    timestamp,
  }
}

function fetchingTasksFailure (error) {
  console.warn(error);
  return {
    type: FETCHING_TASKS_FAILURE,
    error: 'Error fetching tasks',
  }
}

export function removeFetchingUser () {
  return {
    type: REMOVE_FETCHING_TASKS,
  }
}

export function fetchAndHandleTasks (uid) {
  return function (dispatch) {
    dispatch(fetchingTasks())
    return fetchUserTasks(uid)
      .then((tasks) => dispatch(fetchingTasksSuccess(tasks, Date.now())))
      .catch((error) => dispatch(fetchingTasksFailure(error)))
  }
}

export const updateNewTaskText = (fieldName, text) => {
  return {
    type: UPDATE_NEWTASK_TEXT,
    fieldName,
    text,
  }
}
