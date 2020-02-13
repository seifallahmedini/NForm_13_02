const express = require('express');
const questionSetController = require('./../controllers/questionSetController');
const authController = require('./../controllers/authController');

const router = express.Router();

router
  .route('/')
  .get(questionSetController.getAllQuestionSets)
  .post(
    authController.protect,
    authController.restrictTo('admin', 'user'),
    questionSetController.createQuestionSet
  );

router
  .route('/:id')
  .get(questionSetController.getQuestionSet)
  .patch(questionSetController.updateQuestionSet)
  .delete(questionSetController.deleteQuestionSet);

module.exports = router;
