import {
  //AUTH_USER,
  //UNAUTH_USER,
  FETCHING_USER,
  FETCHING_USER_SUCCESS,
  FETCHING_USER_FAILURE,
  REMOVE_FETCHING_USER,
  FETCHING_USER_PATIENT,
  FETCHING_USER_PATIENT_SUCCESS,
  FETCHING_USER_PATIENT_FAILURE,
  REMOVE_FETCHING_USER_PATIENT,
} from './types';

import {
  fetchPatients,
} from '../services/api/user';

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

// function fetchingUser() {
//   return {
//     type: FETCHING_USER,
//   }
// }

// function fetchingUserSuccess (uid, user, timestamp) {
//   return {
//     type: FETCHING_USER_SUCCESS,
//     uid,
//     user,
//     timestamp,
//   }
// }

// function fetchingUserFailure (error) {
//   console.warn(error);
//   return {
//     type: FETCHING_USER_FAILURE,
//     error: 'Error fetching user',
//   }
// }

// export function removeFetchingUser () {
//   return {
//     type: REMOVE_FETCHING_USER,
//   }
// }

// export function fetchAndHandleUser (uid) {
//   return function (dispatch) {
//     dispatch(fetchingUser())

//     return fetchUser(uid)
//       .then((user) => dispatch(fetchingUserSuccess(uid, user, Date.now())))
//       .catch((error) => dispatch(fetchingUserFailure(error)))
//   }
// }

function fetchingUserPatients() {
  return {
    type: FETCHING_USER_PATIENT,
  }
}

function fetchingUserPatientsSuccess(uid, patients, timestamp) {
  return {
    type: FETCHING_USER_PATIENT_SUCCESS,
    uid,
    patients,
    timestamp,
  }
}

function fetchingUserPatientsFailure(uid, error) {
  console.warn(error);
  return {
    type: FETCHING_USER_PATIENT_FAILURE,
    error: `Error fetching user: ${uid}`,
  }
}

export function removeFetchingUserPatients() {
  return {
    type: REMOVE_FETCHING_USER_PATIENT,
  }
}

export function fetchAndHandleUserPatients(uid) {
  return function (dispatch) {
    dispatch(fetchingUserPatients())

    return fetchPatients(uid)
      .then((patients) => dispatch(fetchingUserPatientsSuccess(uid, patients, Date.now())))
      .catch((error) => dispatch(fetchingUserPatientsFailure(uid, error)))
  }
}

