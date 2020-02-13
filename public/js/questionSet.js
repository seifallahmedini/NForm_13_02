/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';

export const createQuestionSet = async (user, name) => {
  try {
    console.log(user);

    const res = await axios({
      method: 'POST',
      url: '/api/v1/questionSets',
      data: {
        user,
        name
      }
    });

    if (res.data.status === 'success') {
      showAlert('success', 'Question Set was successfully created!');
      window.setTimeout(() => {
        location.assign('/');
      }, 1500);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};
