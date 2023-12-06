const { userRegister, userDetails, userLogin } = require('../controller/userController');
const { verifyUser } = require('../middleware/verifyToken');

const router = require('express').Router()


router.post("/user_signup", userRegister)

router.get("/user-details", verifyUser, userDetails)

router.post("/user-login", userLogin)


module.exports = router;