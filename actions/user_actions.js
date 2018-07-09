import {
  //AUTH_USER,
  //UNAUTH_USER,
  POSTING,
  FETCHING_USER,
  FETCHING_USER_SUCCESS,
  FETCHING_USER_FAILURE,
  REMOVE_FETCHING_USER,
  FETCHING_USER_PATIENT,
  FETCHING_USER_PATIENT_SUCCESS,
  FETCHING_USER_PATIENT_FAILURE,
  REMOVE_FETCHING_USER_PATIENT,
  FETCHING_USER_INBOX,
  FETCHING_USER_INBOX_SUCCESS,
  FETCHING_USER_INBOX_FAILURE,
  REMOVE_FETCHING_USER_INBOX,
  POSTING_MESSAGE,
  POSTING_MESSAGE_SUCCESS,
  POSTING_MESSAGE_FAILURE,
  FETCHING_USER_CIRCLE_SUCCESS,
  FETCHING_USER_CIRCLE_FAILURE,
  SELECT_CIRCLE_MEMBER,
  UPDATE_NEW_CHAT_GROUP_NAME,
  POSTING_CHAT_SUCCESS,
  POSTING_CHAT_FAILURE,
} from './types';

import {
  fetchPatients, fetchInbox, sendMessage, fetchCircle, postChat,
} from '../services/api/user';
import {NavigationActions} from 'react-navigation';

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
function fetchingUser() {
  return {
    type: FETCHING_USER,
  }
}

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
    error: `Error fetching user\'s patients: ${uid}`,
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

function fetchingUserInbox() {
  return {
    type: FETCHING_USER_INBOX,
  }
}

function fetchingUserInboxSuccess(uid, inbox, timestamp) {
  return {
    type: FETCHING_USER_INBOX_SUCCESS,
    uid,
    inbox,
    timestamp,
  }
}

function fetchingUserInboxFailure(uid, error) {
  console.warn(error);
  return {
    type: FETCHING_USER_INBOX_FAILURE,
    error: `Error fetching user\'s inbox: ${uid}`,
  }
}

export function removeFetchingUserInbox() {
  return {
    type: REMOVE_FETCHING_USER_INBOX,
  }
}

export function fetchAndHandleUserInbox(uid) {
  return function (dispatch) {
    dispatch(fetchingUserInbox())

    return fetchInbox(uid)
      .then((inbox) => dispatch(fetchingUserInboxSuccess(uid, inbox, Date.now())))
      .catch((error) => dispatch(fetchingUserInboxFailure(uid, error)))
  }
}

function postingMessage() {
  return {
    type: POSTING,
  }
}

function postingMessageSuccess(chatId, message, timestamp) {
  return {
    type: POSTING_MESSAGE_SUCCESS,
    chatId,
    message,
  }
}

function postingMessageFailure(chatId, error) {
  console.warn(error);
  return {
    type: POSTING_MESSAGE_FAILURE,
    error: `Error posting message: ${chatId}`,
  }
}

export function sendingMessage(uid, chatId, message) {
  return function (dispatch) {
    dispatch(postingMessage())

    return sendMessage(uid, chatId, message)
      .then((message) => dispatch(postingMessageSuccess(chatId, message, Date.now())))
      .catch((error) => dispatch(postingMessageFailure(uid, error)))
  }
}

const fetchingUserCircleSuccess = (uid, circle) => {
  return {
    type: FETCHING_USER_CIRCLE_SUCCESS,
    uid,
    circle,
  }
}

function fetchingUserCircleFailure(uid, error) {
  console.warn(error);
  return {
    type: FETCHING_USER_CIRCLE_FAILURE,
    error: `Error fetching circle for user: ${uid}`,
  }
}

export const fetchAndHandleUserCircle = (uid) => {
  return function (dispatch) {
    dispatch(fetchingUser())

    return fetchCircle(uid)
      .then((circle) => dispatch(fetchingUserCircleSuccess(uid, circle)))
      .catch((error) => dispatch(fetchingUserCircleFailure(uid, error)))
  }
}

export const selectCircleMember = (memberType, id) => {
  return {
    type: SELECT_CIRCLE_MEMBER,
    memberType,
    id,
  }
}

export const updateNewChatGroupName = (name, rest) => {
  return {
    type: UPDATE_NEW_CHAT_GROUP_NAME,
    name,
    rest,
  }
}

const postingChat = () => {
  return {
    type: POSTING,
  }
}

const postingChatSuccess = (uid, inbox, timestamp) => {
  return {
    type: POSTING_CHAT_SUCCESS,
    uid,
    inbox,
    timestamp,
  }
}

const postingChatFailure = (uid, error) => {
  console.warn(error);
  return {
    type: POSTING_CHAT_FAILURE,
    error: `Error posting chat for user: ${uid}`,
  }
}

export const createNewChat = (uid, members, groupSettings, navigation) => {
  return function (dispatch) {
    dispatch(postingChat())

    return postChat(uid, members, groupSettings)
      .then((inbox) => dispatch(postingChatSuccess(uid, inbox, Date.now())))
      //reset the navigation route to initial route
      .then(() => navigation.dispatch(
          NavigationActions.reset({
            index: 0,
            actions: [
              NavigationActions.navigate({
                routeName: 'Inbox',
              }),
            ],
          }),
        )
      )
      .catch((error) => dispatch(postingChatFailure(uid, error)))
  }
}

