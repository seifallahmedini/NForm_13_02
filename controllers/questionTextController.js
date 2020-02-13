const { TextQuestion } = require('./../models/questionModel');
const factory = require('./handlerFactory');

exports.getAllQuestionTexts = factory.getAll(TextQuestion);
exports.getQuestionText = factory.getOne(TextQuestion);
exports.createQuestionText = factory.createOne(TextQuestion);
exports.updateQuestionText = factory.updateOne(TextQuestion);
exports.deleteQuestionText = factory.deleteOne(TextQuestion);
