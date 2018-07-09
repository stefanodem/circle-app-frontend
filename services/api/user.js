import axios from 'axios';
import { ROOT_URL } from '../../config/constants';
import { normalize } from 'normalizr';
import { postListSchema, replyListSchema } from '../../store/schema';

//TODO: delete:
import { patients, inbox, userCircle } from '../../testData/testData';

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

export const fetchCircle = (uid) => {
  return new Promise(resolve => setTimeout(() => resolve(userCircle), 100));
}

export const sendMessage = (uid, chatId, message) => {
  return new Promise(resolve => setTimeout(() => resolve(message[0]), 100));
}

export const postChat = (uid, members, groupSettings) => {
  const title = members.length > 1 ? groupSettings.name : null;
  const avatar = members.length === 1 ? members[0].avatar : null;
  const highestUserId = 4;

  const chat = {
    ...inbox,
    3: {
      id: 3,
      title: title,
      avatar: avatar,
      createdAt: Date.now(),
      lastUpdated: Date.now(),
      users: {},
      messages: [],
    }
  }

  for (let i = 0; i < members.length; i++) {
    const id = highestUserId+i
    chat[3].users[id] = {
        _id: id,
        name: members[i].name,
        avatar: members[i].avatar,
    }
  }
  return new Promise(resolve => setTimeout(() => resolve(chat), 100));
}