import {
  FETCHING_PATIENT,
  FETCHING_PATIENT_SUCCESS,
  FETCHING_PATIENT_FAILURE,
  REMOVE_FETCHING_PATIENT,
  UPDATE_CONDITION_INPUT,
  UPDATE_ASSESSMENT_INPUT,
  TOGGLE_BADGE,
} from './types';

import {
  fetchPatient,
} from '../services/api/patient';

const fetchingPatient = () => {
  return {
    type: FETCHING_PATIENT,
  }
}

const fetchingPatientSuccess = (patientId, patient, timestamp) => {
  return {
    type: FETCHING_PATIENT_SUCCESS,
    patientId,
    patient,
    timestamp,
  }
}

const fetchingPatientFailure = (patientId, error) => {
  console.warn(error);
  return {
    type: FETCHING_PATIENT_FAILURE,
    error: `Error fetching patient: ${patientId}`,
  }
}

export const removeFetchingPatient = () => {
  return {
    type: REMOVE_FETCHING_PATIENT,
  }
}

export const fetchAndHandlePatient = (patientId) => {
  return function (dispatch) {
    dispatch(fetchingPatient())

    return fetchPatient(patientId)
      .then((patient) => dispatch(fetchingPatientSuccess(patientId, patient, Date.now())))
      .catch((error) => dispatch(fetchingPatientFailure(patientId, error)))
  }
}

export const updateConditionInput = (conditionId, input) => {
  return {
    type: UPDATE_CONDITION_INPUT,
    conditionId,
    input,
  }
}

export const updateAssessmentInput = (assessmentId, assessmentType, input) => {
  return {
    type: UPDATE_ASSESSMENT_INPUT,
    assessmentType,
    assessmentId,
    input,
  }
}

export const toggleBadge = (badgeId, assessmentId, assessmentType) => {
  return {
    type: TOGGLE_BADGE,
    assessmentType,
    assessmentId,
    badgeId,
  }
}