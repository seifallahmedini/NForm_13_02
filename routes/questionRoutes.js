const express = require('express');
const questionController = require('./../controllers/questionController');
const authController = require('./../controllers/authController');

const router = express.Router();

router
  .route('/')
  .get(questionController.getAllQuestions)
  .post(
    authController.protect,
    authController.restrictTo('admin', 'user'),
    questionController.createQuestion
  );

router
  .route('/:id')
  .get(questionController.getQuestion)
  .patch(questionController.updateQuestion)
  .delete(questionController.deleteQuestion);

module.exports = router;
