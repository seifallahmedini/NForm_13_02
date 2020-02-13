const express = require('express');
const answerController = require('./../controllers/answerController');
const authController = require('./../controllers/authController');

const router = express.Router();

router
  .route('/')
  .get(answerController.getAllAnswers)
  .post(
    authController.protect,
    authController.restrictTo('admin', 'user'),
    answerController.createAnswer
  );

router
  .route('/:id')
  .get(answerController.getAnswer)
  .patch(answerController.updateAnswer)
  .delete(answerController.deleteAnswer);

module.exports = router;
