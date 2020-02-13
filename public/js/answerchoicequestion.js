/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';

export const createChoiceAnswer = async (
  user,
  question,
  questionAnswers,
  questionSet_id
) => {
  try {
    console.log(user, question, questionAnswers, questionSet_id);

    // const res = await axios({
    //   method: 'POST',
    //   url: '/api/v1/questionChoices',
    //   data: {
    //     user,
    //     question
    //   }
    // });

    // const questionId = res.data.data.data._id;
    // const resquestionSet = await axios({
    //   method: 'PATCH',
    //   url: `/api/v1/questionSets/${questionSet_id}`,
    //   data: {
    //     questions: [questionId]
    //   }
    // });

    // if (res.data.status === 'success') {
    //   showAlert('success', 'Choice Question was successfully created!');
    //   window.setTimeout(() => {
    //     location.assign(`/newChoiceQuestion?_id=${questionSet_id}`);
    //   }, 1500);
    // }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};
