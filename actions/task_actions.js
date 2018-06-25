import {
  FETCHING_TASKS,
  FETCHING_TASKS_SUCCESS,
  FETCHING_TASKS_FAILURE,
  REMOVE_FETCHING_TASKS,
  UPDATE_NEWTASK_TEXT,
  REMOVE_NEWTASK_TEXT,
  SUBMIT_COMMENT,
} from './types';

import {
  fetchUserTasks,
} from '../services/api/tasks';

const fetchingTasks = () => {
  return {
    type: FETCHING_TASKS,
  }
}

const fetchingTasksSuccess = (tasks, timestamp) => {
  return {
    type: FETCHING_TASKS_SUCCESS,
    tasks,
    timestamp,
  }
}

const fetchingTasksFailure = (error) => {
  console.warn(error);
  return {
    type: FETCHING_TASKS_FAILURE,
    error: 'Error fetching tasks',
  }
}

export const removeFetchingUser = () => {
  return {
    type: REMOVE_FETCHING_TASKS,
  }
}

export const fetchAndHandleTasks = (uid) => (dispatch) => {
  dispatch(fetchingTasks())
  return fetchUserTasks(uid)
    .then((tasks) => dispatch(fetchingTasksSuccess(tasks, Date.now())))
    .catch((error) => dispatch(fetchingTasksFailure(error)))
}

export const updateNewTaskText = (fieldName, text) => {
  return {
    type: UPDATE_NEWTASK_TEXT,
    fieldName,
    text,
  }
}

export const removeNewTaskText = () => {
  return {
    type: REMOVE_NEWTASK_TEXT,
  }
}

//TODO: hook up with API
export const submitComment = (uid, taskId, text) => {
  return {
    type: SUBMIT_COMMENT,
    uid,
    text,
    taskId,
    timestamp: Date.now(),
  }
}