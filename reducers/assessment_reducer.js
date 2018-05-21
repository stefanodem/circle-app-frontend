import {
  FETCHING_ASSESSMENT,
  FETCHING_ASSESSMENT_SUCCESS,
  FETCHING_ASSESSMENT_FAILURE,
  REMOVE_FETCHING_ASSESSMENT,
} from '../actions/types';

const initialState = {
  isFetching: true,
  error: '',
  assessment: '',
  currentQuestion: '',
}

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCHING_ASSESSMENT:
      return {
        ...state,
        isFetching: true,
      };
    case FETCHING_ASSESSMENT_SUCCESS:
      return {
        ...state,
        isFetching: false,
        assessment: action.assessment,
        currentQuestion: 1,
      };
    case FETCHING_ASSESSMENT_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.error,
      };
    case REMOVE_FETCHING_ASSESSMENT:
      return {
        ...state,
        isFetching: false,
      };
    default:
      return state;
  }
}