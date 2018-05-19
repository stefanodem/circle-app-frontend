import axios from 'axios';
import { ROOT_URL } from '../../config/constants';
import { normalize } from 'normalizr';
import { postListSchema, replyListSchema } from '../../store/schema';

//TODO: delete:
import { tasks } from '../../testData/testData';

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
export const fetchUserTasks = () => {
  return new Promise(resolve => setTimeout(() => resolve(tasks), 100));
}

export const fetchUserPosts2 = (uid, circleId) => {
  const feedz = typeof circleId === 'number' ? feed[circleId] : posts;

  return new Promise(resolve => setTimeout(() => resolve(feedz), 100));
}
