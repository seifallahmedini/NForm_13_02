const mongoose = require('mongoose');

const options = { discriminatorKey: 'kind' };

const AnswerSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    questionSet: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'QuestionSet'
    },
    question: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Question'
    },
    totalScore: {
      type: Number
    },
    isPassed: {
      type: Boolean,
      default: false
    }
  },
  options
);

const Answer = mongoose.model('Answer', AnswerSchema);

const AnswerChoiceSchema = new mongoose.Schema(
  {
    questionAnswers: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ChoiceQuestion.answerOptions'
    }
  },
  options
);

const AnswerChoice = Answer.discriminator('AnswerChoice', AnswerChoiceSchema);

const AnswerTextSchema = new mongoose.Schema(
  {
    questionAnswerBody: {
      type: String
    }
  },
  options
);

const AnswerText = Answer.discriminator('AnswerText', AnswerTextSchema);

module.exports = {
  Answer,
  AnswerChoice,
  AnswerText
};
