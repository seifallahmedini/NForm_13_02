const QuestionSet = require('./../models/questionSetModel');
const factory = require('./handlerFactory');

exports.getAllQuestionSets = factory.getAll(QuestionSet);
exports.getQuestionSet = factory.getOne(QuestionSet, ['questions']);
exports.createQuestionSet = factory.createOne(QuestionSet);
exports.updateQuestionSet = factory.updateOne(QuestionSet);
exports.deleteQuestionSet = factory.deleteOne(QuestionSet);
