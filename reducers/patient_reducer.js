import {
  FETCHING_PATIENT,
  FETCHING_PATIENT_SUCCESS,
  FETCHING_PATIENT_FAILURE,
  REMOVE_FETCHING_PATIENT,
} from '../actions/types';

const initialState = {
  isFetching: true,
  error: '',
  patients: '',
}

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCHING_PATIENT:
      return {
        ...state,
        isFetching: true,
      };
    case FETCHING_PATIENT_SUCCESS:
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
    case FETCHING_PATIENT_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.error,
      };
    case REMOVE_FETCHING_PATIENT:
      return {
        ...state,
        isFetching: false,
      };
    default:
      return state;
  }
}