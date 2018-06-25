import {
  FETCHING_TASKS,
  FETCHING_TASKS_SUCCESS,
  FETCHING_TASKS_FAILURE,
  REMOVE_FETCHING_TASKS,
  UPDATE_NEWTASK_TEXT,
  REMOVE_NEWTASK_TEXT,
  SUBMIT_COMMENT,
} from '../actions/types';

const initialState = {
  isFetching: true,
  error: '',
  tasks: '',
  newTask: {
    name: '',
    description: '',
    diagnosis: '',
    goal: '',
    completeDate: '',
    interval: '',
    assignee: '',
  }
}

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCHING_TASKS:
      return {
        ...state,
        isFetching: true,
      };
    case FETCHING_TASKS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        tasks: action.tasks,
      };
    case FETCHING_TASKS_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.error,
      };
    case REMOVE_FETCHING_TASKS:
      return {
        ...state,
        isFetching: false,
      };
    case UPDATE_NEWTASK_TEXT:
      if (action.fieldName == 'name') {
        return {
          ...state,
          newTask: {
            ...state.newTask,
            name: action.text,
          }
        }
      } else if (action.fieldName == 'description') {
        return {
          ...state,
          newTask: {
            ...state.newTask,
            description: action.text,
          }
        }
      } else if (action.fieldName == 'diagnosis') {
        return {
          ...state,
          newTask: {
            ...state.newTask,
            diagnosis: action.text,
          }
        }
      } else if (action.fieldName == 'goal') {
        return {
          ...state,
          newTask: {
            ...state.newTask,
            goal: action.text,
          }
        }
      } else if (action.fieldName == 'completeDate') {
        return {
          ...state,
          newTask: {
            ...state.newTask,
            completeDate: action.text,
          }
        }
      } else if (action.fieldName == 'interval') {
        return {
          ...state,
          newTask: {
            ...state.newTask,
            interval: action.text,
          }
        }
      } else if (action.fieldName == 'assignee') {
        return {
          ...state,
          newTask: {
            ...state.newTask,
            assignee: action.text,
          }
        }
      };
    case REMOVE_NEWTASK_TEXT:
      return {
        ...state,
        newTask: {
          name: '',
          description: '',
          diagnosis: '',
          goal: '',
          completeDate: '',
          interval: '',
          assignee: '',
        }
      };
    case SUBMIT_COMMENT:
    ///TODO: hook up with API
      return {
        ...state,
        tasks: {
          ...state.tasks,
          [action.taskId]: {
            ...state.tasks[action.taskId],
            comments: {
              ...state.tasks[action.taskId].comments,
              [1234]: {
                id: 1234,
                uid: String(action.uid),
                name: "Pipi Langstrumpf",
                avatar: "https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg",
                createdAt: action.timestamp,
                body: action.text,
                lastUpdated: null,
              }
          }

          }
        }
      }
    default:
      return state;
  }
}