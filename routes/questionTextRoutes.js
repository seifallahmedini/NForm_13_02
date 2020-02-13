const express = require('express');
const questionTextController = require('./../controllers/questionTextController');
// const authController = require('./../controllers/authController');

const router = express.Router();

router
  .route('/')
  .get(questionTextController.getAllQuestionTexts)
  .post(
    // authController.protect,
    // authController.restrictTo('admin', 'user'),
    questionTextController.createQuestionText
  );

router
  .route('/:id')
  .get(questionTextController.getQuestionText)
  .patch(questionTextController.updateQuestionText)
  .delete(questionTextController.deleteQuestionText);

module.exports = router;
