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
  RETURN_PREVIOUS_QUESTION,
} from '../actions/types';

const initialState = {
  isFetching: true,
  error: '',
  type: '',
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
        history: [action.firstQuestionId],
        currentQuestion: action.firstQuestionId,
        progress: [action.firstQuestionId] / action.assessmentLength,
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
      if (action.responseId) {
        return {
          ...state,
          //toggle response.check flags
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
          history: [action.nextQuestion, ...state.history],
          currentQuestion: action.nextQuestion,
          progress: ([action.questionId, ...state.history].length) / state.assessmentLength,
        };
      } else {
        return {
          ...state,
          history: [action.nextQuestion, ...state.history],
          currentQuestion: action.nextQuestion,
          progress: ([action.questionId, ...state.history].length) / state.assessmentLength,
        };
      }
    case CHECK_RESPONSE:
      return {
        ...state,
        //toggle response.check flags
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
    case RETURN_PREVIOUS_QUESTION:
      state.history.shift();
      return {
        ...state,
        //Reset all response.check flags to false:
        assessment: {
          ...state.assessment,
          [state.history[0]]: {
            ...state.assessment[state.history[0]],
            responses: state.assessment[state.history[0]].responses.map((response) => {
              response.checked = false;
              return response;
            }),
          },
        },
        currentQuestion: state.history[0],
        progress: (state.history.length) / state.assessmentLength,
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