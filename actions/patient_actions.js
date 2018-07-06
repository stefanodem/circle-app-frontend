import {
  FETCHING_PATIENT,
  FETCHING_PATIENT_SUCCESS,
  FETCHING_PATIENT_FAILURE,
  REMOVE_FETCHING_PATIENT,
  UPDATE_CONDITION_INPUT,
  UPDATE_ASSESSMENT_INPUT,
  TOGGLE_BADGE,
  FETCHING_ADD_PATIENT_FORM_SUCCESS,
  UPDATE_ADD_PATIENT_FORM_VALUE,
} from './types';

import {
  fetchPatient, fetchAddPatientForm,
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

const fetchingPatientFailure = (message, error) => {
  console.warn(error);
  return {
    type: FETCHING_PATIENT_FAILURE,
    error: `Error fetching ${message}`,
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
      .catch((error) => dispatch(fetchingPatientFailure(`patientId: ${patientId}`, error)))
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

const fetchingAddPatientFormSuccess = (addPatientForm) => {
  return {
    type: FETCHING_ADD_PATIENT_FORM_SUCCESS,
    addPatientForm,
  }
}

export const fetchingAddPatientForm = (uid) => {
  return dispatch => {
    dispatch(fetchingPatient())

    return fetchAddPatientForm(uid)
      .then(addPatientForm => dispatch(fetchingAddPatientFormSuccess(addPatientForm)))
      .catch(error => dispatch(fetchingPatientFailure(`addPatientForm for user ${uid}`, error)))
  }
}

export const updateAddPatientFormValue = (sectionType, inputId, value) => {
  return {
    type: UPDATE_ADD_PATIENT_FORM_VALUE,
    sectionType,
    inputId,
    value,
  }
}
