const express = require('express');
const questionChoiceController = require('./../controllers/questionChoiceController');
// const authController = require('./../controllers/authController');

const router = express.Router();

router
  .route('/')
  .get(questionChoiceController.getAllQuestionChoices)
  .post(
    // authController.protect,
    // authController.restrictTo('admin', 'user'),
    questionChoiceController.createQuestionChoice
  );

router
  .route('/:id')
  .get(questionChoiceController.getQuestionChoice)
  .patch(questionChoiceController.updateQuestionChoice)
  .delete(questionChoiceController.deleteQuestionChoice);

module.exports = router;
