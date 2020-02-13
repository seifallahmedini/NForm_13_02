/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';

export const createSetAnswer = async (answerOptions, answerBodys) => {
  try {
    // console.log(answerOptions, answerBodys);
    if (answerOptions) {
      answerOptions.forEach(async element => {
        const user = element.user;
        const question = element.question;
        const questionSet = element.questionSet_id;
        // const questionAnswers = element.option;

        const question_res = await axios({
          method: 'GET',
          url: `api/v1/questions/${question}`
        });

        console.log(question_res);

        console.log(
          question_res.data.data.data.answerOptions[element.option - 1]
        );
        const questionAnswers =
          question_res.data.data.data.answerOptions[element.option - 1];

        const res = await axios({
          method: 'POST',
          url: '/api/v1/answersChoice',
          data: {
            user,
            question,
            questionSet,
            questionAnswers
          }
        });
        if (res.data.status === 'success') {
          showAlert('success', 'Answer Choice was successfully created!');
          window.setTimeout(() => {
            // location.assign(`/newChoiceQuestion?_id=${questionSet_id}`);
          }, 1100);
        }
      });
    }
    if (answerBodys) {
      answerBodys.forEach(async element => {
        const user = element.user;
        const question = element.question;
        const questionSet = element.questionSet_id;
        const questionAnswerBody = element.answerBody;
        const res = await axios({
          method: 'POST',
          url: '/api/v1/answersText',
          data: {
            user,
            question,
            questionSet,
            questionAnswerBody
          }
        });
        if (res.data.status === 'success') {
          showAlert('success', 'Answer Text was successfully created!');
          window.setTimeout(() => {
            // location.assign(`/newChoiceQuestion?_id=${questionSet_id}`);
          }, 1500);
        }
      });
    }

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
    //   showAlert('success', 'Answer Choice was successfully created!');
    //   window.setTimeout(() => {
    //     // location.assign(`/newChoiceQuestion?_id=${questionSet_id}`);
    //   }, 1500);
    // }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};
