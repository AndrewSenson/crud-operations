const { Router } = require('express');
const userControllers = require('../controllers/userControllers');

const router = Router();

router.post('/signup', userControllers.userRegister);


module.exports = router;