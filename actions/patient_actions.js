import {
  FETCHING_PATIENT,
  FETCHING_PATIENT_SUCCESS,
  FETCHING_PATIENT_FAILURE,
  REMOVE_FETCHING_PATIENT,
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
    error: `Error fetching user: ${action.patientId}`,
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
