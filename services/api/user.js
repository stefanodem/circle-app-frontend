import axios from 'axios';
import { ROOT_URL } from '../../config/constants';
import { normalize } from 'normalizr';
import { postListSchema, replyListSchema } from '../../store/schema';

//TODO: delete:
import { patients, inbox } from '../../testData/testData';

// export const fetchUserPosts = async (uid, circleId) => {
//   try {
//     const url = ROOT_URL + `/users/${uid}/circles/${circleId}/posts`;
//     let response = await axios.get(url);
//     const normalized_response = normalize(response.data.posts, postListSchema);
//     return normalized_response.entities.posts;
//   } catch(e) {
//     return e;
//   }
// }

//TODO: Hook up to backend
export const fetchPatients = () => {
  return new Promise(resolve => setTimeout(() => resolve(patients), 100));
}

export const fetchInbox = () => {
  return new Promise(resolve => setTimeout(() => resolve(inbox), 100));
}

export const sendMessage = (uid, chatId, message) => {
  return new Promise(resolve => setTimeout(() => resolve(message[0]), 100));
}
