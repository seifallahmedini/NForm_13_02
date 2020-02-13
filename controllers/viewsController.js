const mongoose = require('mongoose');
const QuestionSet = require('../models/questionSetModel');
const { Question } = require('../models/questionModel');
const { AnswerChoice } = require('../models/answerModel');
const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
// const AppError = require('../utils/appError');

exports.alerts = (req, res, next) => {
  const { alert } = req.query;
  if (alert === 'booking')
    res.locals.alert =
      "Your booking was successful! Please check your email for a confirmation. If your booking doesn't show up here immediatly, please come back later.";
  next();
};

exports.getOverview = catchAsync(async (req, res, next) => {
  // 1) Get tour data from collection
  // const tours = await Tour.find();
  const questionSets = await QuestionSet.find({})
    .populate('questions')
    .populate('user');

  // 2) Build template
  // 3) Render that template using tour data from 1)
  res.status(200).render('overview', {
    title: 'All Questions',
    questionSets
  });
});

exports.getLoginForm = (req, res) => {
  res.status(200).render('login', {
    title: 'Log into your account'
  });
};

exports.getSignupForm = (req, res) => {
  res.status(200).render('signup', {
    title: 'Create your account'
  });
};

exports.getAccount = (req, res) => {
  res.status(200).render('account', {
    title: 'Your account'
  });
};

exports.getNewQuestionSet = (req, res) => {
  res.status(200).render('newQuestionSet', {
    title: ''
  });
};

exports.getQuestionSetDetail = catchAsync(async (req, res) => {
  const { _id } = req.query;
  const answers = await AnswerChoice.find({
    questionSet: _id
  });
  console.log(answers);

  const answersExists = answers.length !== 0;
  console.log(answersExists);

  const questionSet = await QuestionSet.findById(_id)
    .populate('user')
    .populate('questions')
    .populate({ path: 'questions', populate: { path: 'user', model: 'User' } });

  res
    .status(200)
    .render('questionSetDetail', { questionSet, answersExists, _id });
});

exports.getQuestionDetail = catchAsync(async (req, res) => {
  const { _id, questionSet_id } = req.query;

  const question = await Question.findById(_id).populate('user');
  res.status(200).render('questionDetail', {
    title: '',
    _id,
    questionSet_id,
    question
  });
});

exports.getAnswers = catchAsync(async (req, res) => {
  const { _id } = req.query;
  const questionSet = await QuestionSet.findById(_id);
  const answers = await AnswerChoice.find({ questionSet: _id }).populate(
    'question',
    'question'
  );

  const questionSetId = mongoose.Types.ObjectId(_id);
  const anss = await AnswerChoice.aggregate([
    {
      $match: { questionSet: { $eq: questionSetId } }
    },
    {
      $group: {
        _id: {
          question: '$question'
        },
        count: { $sum: 1 },
        answers: { $push: '$questionAnswers' }
      }
    }
  ]);

  var answer_questions = [];
  anss.forEach((ans, i) => {
    const promise1 = new Promise(async function(resolve, reject) {
      resolve(
        await Question.findOne({ _id: ans._id.question })
          .select('question')
          .populate('answerOptions')
      );
    });

    promise1.then(question => {
      // console.log(question);

      // question.answerOptions.find(element => {
      //   return element._id == ans.answers;
      // });
      // console.log('----------', question.answerOptions);
      answer_r = [];
      question.answerOptions.forEach(element => {
        // console.log(element);
        ans.answers.forEach((el, index) => {
          if (JSON.stringify(el) == JSON.stringify(element._id)) {
            // console.log(element);
            el[index] = element;
            // console.log(el[index]);
            answer_r.push(element);
          }
        });
      });
      // console.log(ans.answers);
      // console.log(answer_r[0]);
      // FIXME: answer_r.forEach(element => {
      //   console.log(element);
      // });
      // FIXME: console.log(answer_r);

      // question.answerOptions.forEach(el => {
      //   console.log('working');
      //   ans.answers.forEach((element, index) => {
      //     if (el._id === element) {
      //       element[index] = el;
      //     }
      //   });
      // });

      const answer = {
        question: question.question,
        count: ans.count,
        answers: answer_r
      };

      answer_questions.push(answer);
      // FIXME: console.log(answer_questions);
      if (i === anss.length - 1) {
        res.status(200).render('answers', {
          title: '',
          questionSet,
          answers,
          answer_questions
        });
      }
    });
  });
});

exports.getNewQuestion = (req, res) => {
  const { _id } = req.query;
  res.status(200).render('newQuestion', {
    title: '',
    _id
  });
};

exports.getNewChoiceQuestion = (req, res) => {
  const { _id } = req.query;
  res.status(200).render('newChoiceQuestion', {
    title: '',
    _id
  });
};

exports.getNewTextQuestion = (req, res) => {
  const { _id } = req.query;
  res.status(200).render('newTextQuestion', {
    title: '',
    _id
  });
};

exports.updateUserData = catchAsync(async (req, res, next) => {
  const updatedUser = await User.findByIdAndUpdate(
    req.user.id,
    {
      name: req.body.name,
      email: req.body.email
    },
    {
      new: true,
      runValidators: true
    }
  );

  res.status(200).render('account', {
    title: 'Your account',
    user: updatedUser
  });
});
