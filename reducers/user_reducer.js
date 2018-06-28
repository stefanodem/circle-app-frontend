import {
  //AUTH_USER,
  //UNAUTH_USER,
  FETCHING_USER,
  FETCHING_USER_SUCCESS,
  FETCHING_USER_FAILURE,
  REMOVE_FETCHING_USER,
  FETCHING_USER_PATIENT,
  FETCHING_USER_PATIENT_SUCCESS,
  FETCHING_USER_PATIENT_FAILURE,
  REMOVE_FETCHING_USER_PATIENT,
  FETCHING_USER_INBOX,
  FETCHING_USER_INBOX_SUCCESS,
  FETCHING_USER_INBOX_FAILURE,
  REMOVE_FETCHING_USER_INBOX,
  POSTING_MESSAGE,
  POSTING_MESSAGE_SUCCESS,
  POSTING_MESSAGE_FAILURE,
} from '../actions/types';

const initialState = {
  isFetching: true,
  isPosting: false,
  error: '',
  //isAuthed: false,
  //authedId: '',
  info: {
    name: 'Sarah Miller',
    uid: '1',
    avatar: 'https://d30y9cdsu7xlg0.cloudfront.net/png/381743-200.png',
  },
  patients: null,
  inbox: null,
}

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCHING_USER:
      return {
        ...state,
        isFetching: true,
      };
    case FETCHING_USER_SUCCESS:
      return action.user === null
      ? {
        ...state,
        isFetching: false,
        error: `Error while fetching user id: ${action.uid}`
      }
      : {
        ...state,
        isFetching: false,
        info: action.user,
      }
    case FETCHING_USER_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.error,
      };
    case REMOVE_FETCHING_USER:
      return {
        ...state,
        isFetching: false,
      };
    case FETCHING_USER_PATIENT:
      return {
        ...state,
        isFetching: true,
      };
    case FETCHING_USER_PATIENT_SUCCESS:
      return action.patients === null
      ? {
        ...state,
        isFetching: false,
        error: `Error while fetching patients for user id: ${action.uid}`,
      }
      : {
        ...state,
        isFetching: false,
        patients: action.patients,
      }
    case FETCHING_USER_PATIENT_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.error,
      };
    case REMOVE_FETCHING_USER_PATIENT:
      return {
        ...state,
        isFetching: false,
      };
    case FETCHING_USER_INBOX:
      return {
        ...state,
        isFetching: true,
      };
    case FETCHING_USER_INBOX_SUCCESS:
      return action.inbox === null
      ? {
        ...state,
        isFetching: false,
        error: `Error while fetching inbox for user id: ${action.uid}`,
      }
      : {
        ...state,
        isFetching: false,
        inbox: action.inbox,
      }
    case FETCHING_USER_INBOX_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.error,
      };
    case REMOVE_FETCHING_USER_INBOX:
      return {
        ...state,
        isFetching: false,
      };
    case POSTING_MESSAGE:
      return {
        ...state,
        isPosting: true,
      };
    case POSTING_MESSAGE_SUCCESS:
      return action.message === null
      ? {
        ...state,
        isPosting: false,
        error: `Error while posting message id: ${action.chatId}`,
      }
      : {
        ...state,
        isPosting: false,
        inbox: {
          ...state.inbox,
          [action.chatId]: {
            ...state.inbox[action.chatId],
            messages: [
              action.message,
              ...state.inbox[action.chatId].messages,
            ],
          }
        }
      }
    case POSTING_MESSAGE_FAILURE:
      return {
        ...state,
        isPosting: false,
        error: action.error,
      };
    default:
      return state;
  }
}