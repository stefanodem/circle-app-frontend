import { schema } from 'normalizr';

export const circleSchema = new schema.Entity('circles', {}, { idAttribute: 'circleId' });
export const circleListSchema = new schema.Array(circleSchema);

export const postSchema = new schema.Entity('posts', {}, { idAttribute: 'postId' });
export const postListSchema = new schema.Array(postSchema);

export const replySchema = new schema.Entity('replies', {}, { idAttribute: 'replyId' });
export const replyListSchema = new schema.Array(replySchema);