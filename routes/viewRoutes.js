const express = require('express');
const viewsController = require('../controllers/viewsController');
const authController = require('../controllers/authController');

const router = express.Router();

router.use(viewsController.alerts);

router.get('/', authController.isLoggedIn, viewsController.getOverview);

router.get('/login', authController.isLoggedIn, viewsController.getLoginForm);
router.get('/signup', authController.isLoggedIn, viewsController.getSignupForm);
router.get('/me', authController.protect, viewsController.getAccount);
router.get(
  '/newquestionset',
  authController.protect,
  viewsController.getNewQuestionSet
);
router.get(
  '/questionsetDetail',
  authController.protect,
  viewsController.getQuestionSetDetail
);
router.get(
  '/newQuestion',
  authController.protect,
  viewsController.getNewQuestion
);
router.get(
  '/newChoiceQuestion',
  authController.protect,
  viewsController.getNewChoiceQuestion
);
router.get(
  '/newTextQuestion',
  authController.protect,
  viewsController.getNewTextQuestion
);

router.get(
  '/questionDetail',
  authController.protect,
  viewsController.getQuestionDetail
);

router.get('/answers', authController.protect, viewsController.getAnswers);

router.post(
  '/submit-user-data',
  authController.protect,
  viewsController.updateUserData
);

module.exports = router;
