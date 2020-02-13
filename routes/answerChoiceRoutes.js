const express = require('express');
const answerChoiceController = require('./../controllers/answerChoiceController');
const authController = require('./../controllers/authController');

const router = express.Router();

router
  .route('/')
  .get(answerChoiceController.getAllAnswerChoices)
  .post(
    authController.protect,
    authController.restrictTo('admin', 'user'),
    answerChoiceController.createAnswerChoice
  );

router
  .route('/:id')
  .get(answerChoiceController.getAnswerChoice)
  .patch(answerChoiceController.updateAnswerChoice)
  .delete(answerChoiceController.deleteAnswerChoice);

module.exports = router;
