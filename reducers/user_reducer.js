import {
  //AUTH_USER,
  //UNAUTH_USER,
  POSTING,
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
  FETCHING_USER_CIRCLE_SUCCESS,
  FETCHING_USER_CIRCLE_FAILURE,
  SELECT_CIRCLE_MEMBER,
  UPDATE_NEW_CHAT_GROUP_NAME,
  POSTING_CHAT_SUCCESS,
  POSTING_CHAT_FAILURE,
  FETCHING_USER_PROGRESS_SUCCESS,
  FETCHING_USER_PROGRESS_FAILURE,
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
  circle: {
    patients: null,
    caregiver: null,
    doctors: null,
  },
  patients: null,
  chat: {
    inbox: null,
    newGroupSettings: {
      name: '',
    },
  },
  progress: null,
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
        chat: {
          ...state.chat,
          inbox: action.inbox,
        }
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
    case POSTING:
      return {
        ...state,
        isPosting: true,
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
        chat: {
          ...state.chat,
          inbox: {
            ...state.chat.inbox,
            [action.chatId]: {
              ...state.chat.inbox[action.chatId],
              messages: [
                action.message,
                ...state.chat.inbox[action.chatId].messages,
              ],
            }
          }
        },
      }
    case POSTING_MESSAGE_FAILURE:
      return {
        ...state,
        isPosting: false,
        error: action.error,
      };
    case FETCHING_USER_CIRCLE_SUCCESS:
      return action.circle === null
      ? {
        ...state,
        isFetching: false,
        error: `Error while fetching circle for user: ${action.uid}`,
      }
      : {
        ...state,
        isFetching: false,
        circle: action.circle,
      }
    case FETCHING_USER_CIRCLE_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.error,
      };
    case SELECT_CIRCLE_MEMBER:
      return {
        ...state,
        circle: {
          ...state.circle,
          [action.memberType]: {
            ...state.circle[action.memberType],
            [action.id]: {
              ...state.circle[action.memberType][action.id],
              selected: !state.circle[action.memberType][action.id].selected,
            }
          }
        }
      };
    case UPDATE_NEW_CHAT_GROUP_NAME:
      return {
        ...state,
        chat: {
          ...state.chat,
          newGroupSettings: {
            ...state.chat.newGroupSettings,
            name: action.name,
          }
        }
      }
    case POSTING_CHAT_SUCCESS:
      return {
        ...state,
        isPosting: false,
        chat: {
          ...state.chat,
          inbox: action.inbox,
        }
      }
    case POSTING_CHAT_FAILURE:
      return {
        ...state,
        isPosting: false,
        error: action.error,
      }
    case FETCHING_USER_PROGRESS_SUCCESS:
      return action.progress === null
      ? {
        ...state,
        isFetching: false,
        error: `Error while fetching progress for user: ${action.uid}`,
      }
      : {
        ...state,
        isFetching: false,
        progress: action.progress,
      }
    case FETCHING_USER_PROGRESS_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.error,
      };
    default:
      return state;
  }
}