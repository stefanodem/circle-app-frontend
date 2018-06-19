import {
} from './types';

const fetchingPatient = () => {
  return {
    type: FETCHING_PATIENT,
  }
}

const fetchingPatientSuccess = (uid, patients, timestamp) => {
  return {
    type: FETCHING_PATIENT_SUCCESS,
    uid,
    patients,
    timestamp,
  }
}

const fetchingPatientFailure = (uid, error) => {
  console.warn(error);
  return {
    type: FETCHING_PATIENT_FAILURE,
    error: `Error fetching user: ${action.uid}`,
  }
}

export const removeFetchingPatient = () => {
  return {
    type: REMOVE_FETCHING_PATIENT,
  }
}

export const fetchAndHandlePatient = (uid) => {
  return function (dispatch) {
    dispatch(fetchingUserPatients())

    return fetchPatients(uid)
      .then((patients) => dispatch(fetchingUserPatientsSuccess(uid, patients, Date.now())))
      .catch((error) => dispatch(fetchingUserPatientsFailure(uid, error)))
  }
}
