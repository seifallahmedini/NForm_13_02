const { AnswerText } = require('./../models/answerModel');
const factory = require('./handlerFactory');

exports.getAllAnswerTexts = factory.getAll(AnswerText);
exports.getAnswerText = factory.getOne(AnswerText);
exports.createAnswerText = factory.createOne(AnswerText);
exports.updateAnswerText = factory.updateOne(AnswerText);
exports.deleteAnswerText = factory.deleteOne(AnswerText);
