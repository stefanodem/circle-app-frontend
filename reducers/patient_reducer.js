import {
  FETCHING_PATIENT,
  FETCHING_PATIENT_SUCCESS,
  FETCHING_PATIENT_FAILURE,
  REMOVE_FETCHING_PATIENT,
} from '../actions/types';

const initialState = {
  isFetching: true,
  error: '',
  patientId: '',
  vitals: null,
  symptoms: null,
  conditions: null,
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
        patientId: action.patient.Id,
        vitals: action.patient.vitals,
        symptoms: action.patient.symptoms,
        conditions: action.patient.conditions,
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