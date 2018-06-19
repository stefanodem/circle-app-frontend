import {
  FETCHING_PATIENT,
  FETCHING_PATIENT_SUCCESS,
  FETCHING_PATIENT_FAILURE,
  REMOVE_FETCHING_PATIENT,
} from './types';

import {
  fetchPatients,
} from '../services/api/user';

function fetchingPatients() {
  return {
    type: FETCHING_PATIENT,
  }
}

function fetchingPatientsSuccess(uid, patients, timestamp) {
  return {
    type: FETCHING_PATIENT_SUCCESS,
    uid,
    patients,
    timestamp,
  }
}

function fetchingPatientsFailure(uid, error) {
  console.warn(error);
  return {
    type: FETCHING_PATIENT_FAILURE,
    error: `Error fetching user: ${action.uid}`,
  }
}

export function removeFetchingPatients() {
  return {
    type: REMOVE_FETCHING_PATIENT,
  }
}

export function fetchAndHandlePatients(uid) {
  return function (dispatch) {
    dispatch(fetchingPatients())

    return fetchPatients(uid)
      .then((patients) => dispatch(fetchingPatientsSuccess(uid, patients, Date.now())))
      .catch((error) => dispatch(fetchingUserFailure(uid, error)))
  }
}
