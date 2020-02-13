/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';

export const createTextQuestion = async (
  user,
  question,
  answerBody,
  questionSet_id
) => {
  try {
    const res = await axios({
      method: 'POST',
      url: '/api/v1/questionTexts',
      data: {
        user,
        question,
        answerBody
      }
    });

    const questionId = res.data.data.data._id;
    const resquestionSet = await axios({
      method: 'PATCH',
      url: `/api/v1/questionSets/${questionSet_id}`,
      data: {
        questions: [questionId]
      }
    });

    if (res.data.status === 'success') {
      showAlert('success', 'Text Question was successfully created!');
      window.setTimeout(() => {
        location.assign(`/questionsetDetail?_id=${questionSet_id}`);
      }, 1500);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};
