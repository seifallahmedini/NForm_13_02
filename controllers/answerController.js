const { Answer } = require('./../models/answerModel');
const factory = require('./handlerFactory');

exports.getAllAnswers = factory.getAll(Answer);
exports.getAnswer = factory.getOne(Answer);
exports.createAnswer = factory.createOne(Answer);
exports.updateAnswer = factory.updateOne(Answer);
exports.deleteAnswer = factory.deleteOne(Answer);
