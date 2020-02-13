const express = require('express');
const answerTextController = require('./../controllers/answerTextController');
const authController = require('./../controllers/authController');

const router = express.Router();

router
  .route('/')
  .get(answerTextController.getAllAnswerTexts)
  .post(
    authController.protect,
    authController.restrictTo('admin', 'user'),
    answerTextController.createAnswerText
  );

router
  .route('/:id')
  .get(answerTextController.getAnswerText)
  .patch(answerTextController.updateAnswerText)
  .delete(answerTextController.deleteAnswerText);

module.exports = router;
