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
} from '../actions/types';

const initialState = {
  isFetching: true,
  error: '',
  //isAuthed: false,
  //authedId: '',
  info: {
    name: 'Sarah Miller',
    uid: '1',
    avatar: 'https://d30y9cdsu7xlg0.cloudfront.net/png/381743-200.png',
  },
  patients: '',
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
        error: `Error while fetching patients for user id: ${action.uid}`
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
    default:
      return state;
  }
}