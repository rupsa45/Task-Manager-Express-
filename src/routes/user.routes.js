import express from 'express'
import {signUp,login,logout,getCurrentUser } from '../controllers/user.controller.js'
import authentication from '../middlewares/auth.middleware.js'

const router = express.Router()

router.get("/",authentication,getCurrentUser)
router.post("/signup",signUp)
router.post("/signin",login)
router.post("/logout",logout)

export default  router;