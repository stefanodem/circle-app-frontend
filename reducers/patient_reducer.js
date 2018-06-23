import {
  FETCHING_PATIENT,
  FETCHING_PATIENT_SUCCESS,
  FETCHING_PATIENT_FAILURE,
  REMOVE_FETCHING_PATIENT,
  UPDATE_CONDITION_INPUT,
  UPDATE_ASSESSMENT_INPUT,
  TOGGLE_BADGE,
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
    case UPDATE_CONDITION_INPUT:
      return {
        ...state,
        conditions: {
          ...state.conditions,
          [action.conditionId]: {
            ...state.conditions[action.conditionId],
            input: action.input,
          }
        }
      };
    case UPDATE_ASSESSMENT_INPUT:
      return {
        ...state,
        [action.assessmentType]: {
          ...state[action.assessmentType],
          [action.assessmentId] :{
            ...state[action.assessmentType][action.assessmentId],
            input: action.input,
          }
        }
      };
    case TOGGLE_BADGE:
      return {
        ...state,
        [action.assessmentType]: {
          ...state[action.assessmentType],
          [action.assessmentId]: {
            ...state[action.assessmentType][action.assessmentId],
            dimensions: state[action.assessmentType][action.assessmentId].dimensions.map(dimension => {
            if (dimension.id === action.badgeId) {
              dimension.checked = !dimension.checked;
            }
            return dimension;
          })
          }
        }
      }
    default:
      return state;
  }
}