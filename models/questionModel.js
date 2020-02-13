const mongoose = require('mongoose');

const options = { discriminatorKey: 'kind' };

const QuestionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    question: {
      type: String,
      minlength: 10,
      maxlength: 1000
    }
  },
  options
);

const Question = mongoose.model('Question', QuestionSchema);

const ChoiceQuestionSchema = new mongoose.Schema(
  {
    answerOptions: {
      type: [
        {
          optionNumber: { type: Number },
          answerBody: {
            type: String,
            minlength: 1,
            maxlength: 200
          },
          isCorrectAnswer: {
            type: Boolean,
            default: false
          }
        }
      ],
      default: undefined
    }
  },
  options
);

const ChoiceQuestion = Question.discriminator(
  'ChoiceQuestion',
  ChoiceQuestionSchema
);

const TextQuestionSchema = new mongoose.Schema(
  {
    answerBody: {
      type: String,
      minlength: 1
    }
  },
  options
);

const TextQuestion = Question.discriminator('TextQuestion', TextQuestionSchema);

module.exports = {
  Question,
  ChoiceQuestion,
  TextQuestion
};
