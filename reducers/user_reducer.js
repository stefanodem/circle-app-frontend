import {
  //AUTH_USER,
  //UNAUTH_USER,
  FETCHING_USER,
  FETCHING_USER_SUCCESS,
  FETCHING_USER_FAILURE,
  REMOVE_FETCHING_USER,
} from '../actions/types';

const initialState = {
  isFetching: true,
  error: '',
  //isAuthed: false,
  //authedId: '',
  user: {
    lastUpdated: 0,
    info : {
      name: '',
      uid: '',
      avatar: '',
    },
  }
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
        user.lastUpdated: action.timestamp,
        user.info: action.user,
      }
      : {
        ...state,
        isFetching: false,
        error: `Error while fetching user id: ${action.uid}`
      }
    case FETCHING_USER_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.error,
      };
    case REMOVE_FETCHING_USER :
      return {
        ...state,
        isFetching: false,
      };
    default:
      return state;
  }
}