import {
  FETCHING_ASSESSMENT,
  FETCHING_ASSESSMENT_SUCCESS,
  FETCHING_ASSESSMENT_FAILURE,
  REMOVE_FETCHING_ASSESSMENT,
  UPDATE_RESPONSE,
} from './types';

import {
  fetchAssessment,
} from '../services/api/assessment';

function fetchingAssessment() {
  return {
    type: FETCHING_ASSESSMENT,
  }
}

function fetchingAssessmentSuccess (assessment) {
  return {
    type: FETCHING_ASSESSMENT_SUCCESS,
    assessment,
  }
}

function fetchingAssessmentFailure (error) {
  console.warn(error);
  return {
    type: FETCHING_ASSESSMENT_FAILURE,
    error: 'Error fetching assessment',
  }
}

export function removeFetchingAssessment() {
  return {
    type: REMOVE_FETCHING_ASSESSMENT,
  }
}

export function fetchAndHandleAssessment(assessmentType) {
  return function (dispatch) {
    dispatch(fetchingAssessment())
    return fetchAssessment(assessmentType)
      .then((assessment) => dispatch(fetchingAssessmentSuccess(assessment)))
      .catch((error) => dispatch(fetchingAssessmentFailure(error)))
  }
}

export const updateResponse = (value) => {
  return {
    type: UPDATE_RESPONSE,
    response: Math.floor(value),
  }
}