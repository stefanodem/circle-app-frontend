import {
  FETCHING_ASSESSMENT,
  FETCHING_ASSESSMENT_SUCCESS,
  FETCHING_ASSESSMENT_FAILURE,
  REMOVE_FETCHING_ASSESSMENT,
  UPDATE_RESPONSE,
  SUBMIT_RESPONSE,
  PROCESSING_RESPONSE_ERROR,
  CHECK_RESPONSE,
  UPDATE_PERSONAL_INFO,
} from '../actions/types';

const initialState = {
  isFetching: true,
  error: '',
  assessment: '',
  assessmentLength: '',
  history: [],
  responses: '',
  currentQuestion: '',
  currentResponse: '',
  progress: '',
  personalInfo: {
    firstName: '',
    secondName: '',
    middleName: '',
    gender: '',
    birthdate: '',
  },
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
        assessmentLength: action.assessmentLength,
        currentQuestion: 1,
        progress: 1 / action.assessmentLength,
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
    case UPDATE_RESPONSE:
      return {
        ...state,
        currentResponse: action.response,
      };
    case UPDATE_PERSONAL_INFO:
      return {
        ...state,
        personalInfo: {
          ...state.personalInfo,
          [action.fieldName]: action.response
        }
      };
    case SUBMIT_RESPONSE:
      return {
        ...state,
        assessment: {
          ...state.assessment,
          [action.questionId]: {
            ...state.assessment[action.questionId],
            responses: state.assessment[action.questionId].responses.map((response) => {
              if (response.id === action.responseId) {
                response.checked = !response.checked;
              }
              return response;
            }),
          },
        },
        history: [action.questionId, ...state.history],
        currentQuestion: action.nextQuestion,
        progress: action.nextQuestion / state.assessmentLength,
      };
    case CHECK_RESPONSE:
      return {
        ...state,
        assessment: {
          ...state.assessment,
          [action.questionId]: {
            ...state.assessment[action.questionId],
            responses: state.assessment[action.questionId].responses.map((response) => {
              if (response.id === action.responseId) {
                response.checked = !response.checked;
              }
              return response;
            }),
          },
        },
      };
    case PROCESSING_RESPONSE_ERROR:
      return {
        ...state,
        error: action.error,
      };
    default:
      return state;
  }
}