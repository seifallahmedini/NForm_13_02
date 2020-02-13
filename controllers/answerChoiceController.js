const { AnswerChoice } = require('./../models/answerModel');
const factory = require('./handlerFactory');

exports.getAllAnswerChoices = factory.getAll(AnswerChoice);
exports.getAnswerChoice = factory.getOne(AnswerChoice);
exports.createAnswerChoice = factory.createOne(AnswerChoice);
exports.updateAnswerChoice = factory.updateOne(AnswerChoice);
exports.deleteAnswerChoice = factory.deleteOne(AnswerChoice);
