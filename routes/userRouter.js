const { Router } = require('express');
const userControllers = require('../controllers/userControllers');

const router = Router();

router.post('/signup', userControllers.userRegister);
router.get('/login',userControllers.userLogin )


module.exports = router;