const { ChoiceQuestion } = require('./../models/questionModel');
const factory = require('./handlerFactory');

exports.getAllQuestionChoices = factory.getAll(ChoiceQuestion);
exports.getQuestionChoice = factory.getOne(ChoiceQuestion);
exports.createQuestionChoice = factory.createOne(ChoiceQuestion);
exports.updateQuestionChoice = factory.updateOne(ChoiceQuestion);
exports.deleteQuestionChoice = factory.deleteOne(ChoiceQuestion);
