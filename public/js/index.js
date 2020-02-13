/* eslint-disable */
import '@babel/polyfill';
import { displayMap } from './mapbox';
import { login, signup, logout } from './login';
import { createQuestionSet } from './questionSet';
import { createChoiceQuestion } from './choicequestion';
import { createTextQuestion } from './textquestion';
import { createChoiceAnswer } from './answerchoicequestion';
import { createSetAnswer } from './answersetquestion';
import { deleteQuestion } from './deletequestion';
import { updateSettings } from './updateSettings';
import { showAlert } from './alerts';
import { Chart } from 'chart.js';

// DOM ELEMENTS
const mapBox = document.getElementById('map');
const answers = document.getElementById('answers');
const answer_question = document.getElementById('answer_question');
const myChart = document.getElementById('myChart');
const cardQuestionContainer = document.getElementById(
  'card-question-container'
);
const loginForm = document.querySelector('.form--login');
const signupForm = document.querySelector('.form--signup');
const logOutBtn = document.querySelector('.nav__el--logout');
const userDataForm = document.querySelector('.form-user-data');
const userPasswordForm = document.querySelector('.form-user-password');

const questionSetForm = document.querySelector('.form--questionSet');
const choiceQuestionForm = document.querySelector('.form--choicequestion');
const textQuestionForm = document.querySelector('.form--textquestion');
const responseChoiceQuestionForm = document.querySelector(
  '.form--responsechoicequestion'
);
const responseSetAnswerForm = document.querySelector(
  '.form--responseSetQuestion'
);
const deleteQuestionForm = document.querySelector('.form--deleteQuestion');

const elemTruncate = document.querySelector('.truncate');

// DELEGATION
if (cardQuestionContainer) {
  const answer_question_res = JSON.parse(
    answer_question.dataset.answer_question
  );
  console.log(answer_question_res);

  const answers_res = JSON.parse(answers.dataset.answers);
  // console.log(answers_res);

  // Initializing the chart Colors
  window.chartColors = {
    red: 'rgb(255, 99, 132)',
    orange: 'rgb(255, 159, 64)',
    yellow: 'rgb(255, 205, 86)',
    green: 'rgb(75, 192, 192)',
    blue: 'rgb(54, 162, 235)',
    purple: 'rgb(153, 102, 255)',
    grey: 'rgb(201, 203, 207)'
  };

  // Initializing the color Names
  var colorNames = Object.keys(window.chartColors);

  // answers_res.forEach(answer => {
  //   console.log(answer);
  // });

  var index = 0;
  answer_question_res.forEach(answer => {
    // Initialize the configuartion
    var config = null;

    // Creating an div element
    var newElement = document.createElement('div');
    newElement.className = 'card-question-container';
    newElement.innerHTML = `
      <div class="card-question">
        <div class="card__details">
          <h1 class="question_centered">${answer.question}</h1>
          <div id="canvas-holder" style='width:70%'>
            <canvas id="chart-area${index}" width='200' height='200'/>
          </div>
        </div>
      </div>  
      `;
    document.getElementById('card-question-container').appendChild(newElement);

    // Create a new configuration for every question
    config = {
      type: 'doughnut',
      data: {
        datasets: [
          {
            data: [],
            backgroundColor: [],
            label: 'Dataset 1'
          }
        ],
        labels: []
      },
      options: {
        responsive: true,
        legend: {
          position: 'top'
        },
        title: {
          display: true,
          text: 'Chart.js Doughnut Chart'
        },
        animation: {
          animateScale: true,
          animateRotate: true
        }
      }
    };

    var occurrence = function(array) {
      'use strict';
      var result = [];
      if (array instanceof Array) {
        // Check if input is array.
        array.forEach(function(v, i) {
          console.log(v.optionNumber);

          if (!result[v.optionNumber]) {
            // Initial object property creation.
            result[v.optionNumber] = [v.optionNumber]; // Create an array for that property.
            console.log(result[v.optionNumber]);
          } else {
            // Same occurrences found.
            result[v.optionNumber].push(v.optionNumber); // Fill the array.
          }
        });
      }
      return result;
    };

    const occurrence_res = occurrence(answer.answers);
    console.log('dfhsjdfh', occurrence_res);

    occurrence_res.forEach((element, i) => {
      if (element) {
        config.data.datasets[0].data.push(element.length);
        var colorName = colorNames[i % colorNames.length];
        var newColor = window.chartColors[colorName];
        config.data.datasets[0].backgroundColor.push(newColor);
        answer.answers.forEach(el => {
          if (
            el.optionNumber == i &&
            !config.data.labels.includes(el.answerBody)
          ) {
            config.data.labels.push(el.answerBody);
          }
        });
        console.log(config.data.labels);
      }
    });

    var ctx = document.getElementById(`chart-area${index}`).getContext('2d');
    window.myDoughnut = new Chart(ctx, config);
    index++;
  });
}

if (mapBox) {
  const locations = JSON.parse(mapBox.dataset.locations);
  displayMap(locations);
}

if (deleteQuestionForm) {
  deleteQuestionForm.addEventListener('submit', e => {
    e.preventDefault();
    const question = document.getElementById('question').value;
    const questionSet_id = document.getElementById('questionSet_id').value;
    deleteQuestion(question, questionSet_id);
  });
}

if (loginForm)
  loginForm.addEventListener('submit', e => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    login(email, password);
  });

if (signupForm)
  signupForm.addEventListener('submit', e => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const passwordConfirm = document.getElementById('passwordConfirm').value;
    signup(name, email, password, passwordConfirm);
  });

if (logOutBtn) logOutBtn.addEventListener('click', logout);

if (userDataForm)
  userDataForm.addEventListener('submit', e => {
    e.preventDefault();
    const form = new FormData();
    form.append('name', document.getElementById('name').value);
    form.append('email', document.getElementById('email').value);
    form.append('photo', document.getElementById('photo').files[0]);

    updateSettings(form, 'data');
  });

if (userPasswordForm)
  userPasswordForm.addEventListener('submit', async e => {
    e.preventDefault();
    document.querySelector('.btn--save-password').textContent = 'Updating...';

    const passwordCurrent = document.getElementById('password-current').value;
    const password = document.getElementById('password').value;
    const passwordConfirm = document.getElementById('password-confirm').value;
    await updateSettings(
      { passwordCurrent, password, passwordConfirm },
      'password'
    );

    document.querySelector('.btn--save-password').textContent = 'Save password';
    document.getElementById('password-current').value = '';
    document.getElementById('password').value = '';
    document.getElementById('password-confirm').value = '';
  });

if (questionSetForm)
  questionSetForm.addEventListener('submit', e => {
    e.preventDefault();

    const user = document.getElementById('user').value;
    const name = document.getElementById('name').value;
    console.log(user, name);
    createQuestionSet(user, name);
  });

if (choiceQuestionForm)
  choiceQuestionForm.addEventListener('submit', e => {
    e.preventDefault();

    const user = document.getElementById('user').value;
    const question = document.getElementById('question').value;
    const option1IsCorrectAnswer = document.getElementById(
      'option1IsCorrectAnswer'
    );
    const option1 = document.getElementById('option1').value;
    const option2IsCorrectAnswer = document.getElementById(
      'option2IsCorrectAnswer'
    );
    const option2 = document.getElementById('option2').value;
    const option3IsCorrectAnswer = document.getElementById(
      'option3IsCorrectAnswer'
    );
    const option3 = document.getElementById('option3').value;

    const answerOptions = [
      {
        optionNumber: 1,
        answerBody: option1,
        isCorrectAnswer: option1IsCorrectAnswer.checked ? true : false
      },
      {
        optionNumber: 2,
        answerBody: option2,
        isCorrectAnswer: option2IsCorrectAnswer.checked ? true : false
      },
      {
        optionNumber: 3,
        answerBody: option3,
        isCorrectAnswer: option3IsCorrectAnswer.checked ? true : false
      }
    ];
    const questionSet_id = document.getElementById('questionSet_id').value;
    createChoiceQuestion(user, question, answerOptions, questionSet_id);
  });

if (responseChoiceQuestionForm)
  responseChoiceQuestionForm.addEventListener('submit', e => {
    e.preventDefault();
    const user = document.getElementById('user').value;
    const question = document.getElementById('question').value;
    const option1IsCorrectAnswer = document.getElementById(
      'option1IsCorrectAnswer'
    );
    const option2IsCorrectAnswer = document.getElementById(
      'option2IsCorrectAnswer'
    );
    const option3IsCorrectAnswer = document.getElementById(
      'option3IsCorrectAnswer'
    );
    var questionAnswers;
    if (option1IsCorrectAnswer.checked) questionAnswers = 1;
    else if (option2IsCorrectAnswer.checked) questionAnswers = 2;
    else if (option3IsCorrectAnswer.checked) questionAnswers = 3;

    const questionSet_id = document.getElementById('questionSet_id').value;
    createChoiceAnswer(user, question, questionAnswers, questionSet_id);
  });

if (textQuestionForm)
  textQuestionForm.addEventListener('submit', e => {
    e.preventDefault();

    const user = document.getElementById('user').value;
    const question = document.getElementById('question').value;
    const answerBody = document.getElementById('answerBody').value;
    const questionSet_id = document.getElementById('questionSet_id').value;
    createTextQuestion(user, question, answerBody, questionSet_id);
  });

if (responseSetAnswerForm)
  responseSetAnswerForm.addEventListener('submit', e => {
    e.preventDefault();

    var elements = responseSetAnswerForm.elements;
    const questionSet_id = document.getElementById('questionSet_id').value;
    var answerOptions = [];
    var answerBodys = [];
    for (let i = 0; i < elements.length; i++) {
      if (elements[i].id == 'user' && elements[i + 2].type == 'radio') {
        let user = elements[i].value;
        let question = elements[i + 1].value;
        let option;
        if (elements[i + 2].checked) option = 1;
        else if (elements[i + 3].checked) option = 2;
        else if (elements[i + 4].checked) option = 3;

        let answerOptionQuestion = {
          user,
          question,
          questionSet_id,
          option
        };
        answerOptions.push(answerOptionQuestion);
        // console.log(answerOptionQuestion);
      } else if (elements[i].id == 'user') {
        let user = elements[i].value;
        let question = elements[i + 1].value;
        let answerBody = elements[i + 2].value;

        let answerTextQuestion = {
          user,
          question,
          questionSet_id,
          answerBody
        };
        answerBodys.push(answerTextQuestion);
        // console.log(answerTextQuestion);
      }
    }
    // console.log(answerOptions);
    // console.log(answerBodys);

    createSetAnswer(answerOptions, answerBodys);
  });

const alertMessage = document.querySelector('body').dataset.alert;
if (alertMessage) showAlert('success', alertMessage, 20);

var truncate = function(elem, limit, after) {
  // Make sure an element and number of items to truncate is provided
  if (!elem || !limit) return;

  // Get the inner content of the element
  var content = elem.textContent.trim();

  // Convert the content into an array of words
  // Remove any words above the limit
  content = content.split(' ').slice(0, limit);

  // Convert the array of words back into a string
  // If there's content to add after it, add it
  content = content.join(' ') + (after ? after : '');

  // Inject the content back into the DOM
  elem.textContent = content;
};
if (elemTruncate) truncate(elemTruncate, 5, '...');
