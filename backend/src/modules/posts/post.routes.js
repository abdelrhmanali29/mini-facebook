const express = require('express');
const authController = require('../users/auth.controller');
const controller = require('./post.controller');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'public/posts' });

const { uploadPostImage } = require('./post.utils');

// Protect all routes after this middleware
router.use(authController.protect());

router.post('/create', uploadPostImage, controller.createPost());

router.get('/', controller.list());

router.get('/:id', controller.getById());

module.exports = router;
