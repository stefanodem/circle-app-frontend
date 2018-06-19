import {
  //AUTH_USER,
  //UNAUTH_USER,
  FETCHING_USER,
  FETCHING_USER_SUCCESS,
  FETCHING_USER_FAILURE,
  REMOVE_FETCHING_USER,
  FETCHING_PATIENT,
  FETCHING_PATIENT_SUCCESS,
  FETCHING_PATIENT_FAILURE,
  REMOVE_FETCHING_PATIENT,
} from './types';

import {
  fetchPatients,
} from '../services/api/patient';

// export function authUser (uid) {
//   return {
//     type: AUTH_USER,
//     uid,
//   }
// }

// export function unauthUser () {
//   return {
//     type: UNAUTH_USER,
//   }
// }

function fetchingUser() {
  return {
    type: FETCHING_USER,
  }
}

function fetchingUserSuccess (uid, user, timestamp) {
  return {
    type: FETCHING_USER_SUCCESS,
    uid,
    user,
    timestamp,
  }
}

function fetchingUserFailure (error) {
  console.warn(error);
  return {
    type: FETCHING_USER_FAILURE,
    error: 'Error fetching user',
  }
}

export function removeFetchingUser () {
  return {
    type: REMOVE_FETCHING_USER,
  }
}

export function fetchAndHandleUser (uid) {
  return function (dispatch) {
    dispatch(fetchingUser())

    return fetchUser(uid)
      .then((user) => dispatch(fetchingUserSuccess(uid, user, Date.now())))
      .catch((error) => dispatch(fetchingUserFailure(error)))
  }
}

function fetchingUserPatients() {
  return {
    type: FETCHING_PATIENT,
  }
}

function fetchingUserPatientsSuccess(uid, patients, timestamp) {
  return {
    type: FETCHING_PATIENT_SUCCESS,
    uid,
    patients,
    timestamp,
  }
}

function fetchingUserPatientsFailure(uid, error) {
  console.warn(error);
  return {
    type: FETCHING_PATIENT_FAILURE,
    error: `Error fetching user: ${action.uid}`,
  }
}

export function removeFetchingUserPatients() {
  return {
    type: REMOVE_FETCHING_PATIENT,
  }
}

export function fetchAndHandleUserPatients(uid) {
  return function (dispatch) {
    dispatch(fetchingPatients())

    return fetchPatients(uid)
      .then((patients) => dispatch(fetchingPatientsSuccess(uid, patients, Date.now())))
      .catch((error) => dispatch(fetchingUserFailure(uid, error)))
  }
}

