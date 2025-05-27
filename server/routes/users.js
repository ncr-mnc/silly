const express = require('express');
const router = express.Router();
const {checkId} = require('../controllers/usersController');
const {setId} = require('../controllers/usersController');

router.put('/setid', setId);
router.get('/id/:id', checkId);
module.exports = router;