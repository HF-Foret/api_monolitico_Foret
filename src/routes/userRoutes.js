const express = require('express');
const { createUser, getAllUsers } = require('../controllers/userController');
const multer = require('multer');

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/create', createUser);
router.get('/getAll', getAllUsers);

module.exports = router;