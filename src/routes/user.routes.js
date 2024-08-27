import express from 'express'
import {signUp,login,logout,getCurrentUser, isLoggedIn } from '../controllers/user.controller.js'
import authentication from '../middlewares/auth.middleware.js'

const router = express.Router()

router.get("/",authentication,getCurrentUser)
router.post("/signup",signUp)
router.post("/signin",login)
router.post("/logout",logout)

router.get('/isLoggedIn', authentication, isLoggedIn);

export default  router;