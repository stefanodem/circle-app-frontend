import axios from 'axios';
import { ROOT_URL } from '../../config/constants';
import { normalize } from 'normalizr';
import { postListSchema, replyListSchema } from '../../store/schema';

//TODO: delete:
import { assessment_cha } from '../../testData/testData';

export const fetchAssessment = () => {
  return new Promise(resolve => setTimeout(() => resolve(assessment_cha), 100));
}
